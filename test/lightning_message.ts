import chai = require('chai');
import LightningMessage, {LightningMessageTypes} from '../src/lightning_message';
import {OpenChannelMessage} from '../src/messages/open_channel';
import {AcceptChannelMessage} from '../src/messages/accept_channel';
import {InitMessage} from '../src/messages/init';
import {PingMessage} from '../src/messages/ping';
import {PongMessage} from '../src/messages/pong';

const assert = chai.assert;

describe('Lightning Message Tests', () => {

	it('should parse an open channel message', () => {
		const buffer = Buffer.from('00002e28ecbd234489bd13fca44b375fb53e9eb03fb9384c4bc1bf046ea4139b86c60d39c02e00644c6c7bc8610329767e8185d80c0739a5f5db421cbc159c752b0041b55cadd32231ae48c9af62c0ceca876eb7b3a94a03b793549e9159f89fa43036147263e5647c2d00000000427390b047010e7f33900707021d02f90a74bc300d360636b7e28da600ac0cd8b98638baa133c48147349a3bf40331732ab4699e568fe3f0c27449a9defeed6f03ea29a6f348a50b04b860d852b7023fe4a3759047274d8782c1cad55e61c8348b4926ea777c78fea853f8d647218b034633b1cd138e2efc6a09f9b87381c0c97aa1cd0264fc87aecfc5a41a77c43d090273967a0a006b0232002869f1760ce94eecb8aebddb38c6f2646d59ed731b66510268dde32ab0bf503197befaec8a5c2abf3273ebceb3dc095da795eb453951818746', 'hex');
		buffer.writeUInt16BE(LightningMessageTypes.OPEN_CHANNEL, 0);

		const openChannelMessage = LightningMessage.parse(buffer) as OpenChannelMessage;
		assert.equal(openChannelMessage['values'].funding_pubkey.getEncoded(true).toString('hex'), '021d02f90a74bc300d360636b7e28da600ac0cd8b98638baa133c48147349a3bf4');

		const restoredBuffer = openChannelMessage.toBuffer();
		assert.equal(restoredBuffer.toString('hex'), buffer.toString('hex'));
	});

	it('should parse an accept channel message', () => {
		const buffer = Buffer.from('000046d2ea0f7a8f04b957b2c9996e79127d7cdd8fd6b386941aad1de65fbf7b26fb4fa8f312dbbddcfd31bd3956f6cf21113b8fe9bbbefea2c6000000007cf53ffc38aacf144f61f86c0373921d9ba916c668d0f411b6d628bae7aceb13326d28d5529a083ac9627c7d7203b5a1a166c07e85a1e7f4f47dbc56cbcf273a351b678281e4458016090ffa59e303e65b90a744407c8c467522f5bca1a790f644db93858bc33c89a394621a12482a02eb879b474f5a757ffacb43d90aa4af4414f1aed0fb7ea7dfa40434c0b57304710370790aaa6dc5ae220bb8138599f89aabf693ce7a14b11f56a1bef8e4c0e4daac023335ce5ca9a7e581ddd48c02af34fca3c80a4bb355291f1eb60e70a4f4a3f2a1', 'hex');
		buffer.writeUInt16BE(LightningMessageTypes.ACCEPT_CHANNEL, 0);

		const acceptChannelMessage = LightningMessage.parse(buffer) as AcceptChannelMessage;

		const restoredBuffer = acceptChannelMessage.toBuffer();
		assert.equal(restoredBuffer.toString('hex'), buffer.toString('hex'));
	});

	it('should serialize an init message', () => {
		const initMessage = new InitMessage({
			global_features: Buffer.alloc(9, 9),
			local_features: Buffer.alloc(11, 11)
		});
		const serialization = initMessage.toBuffer();
		const restoredMessage = LightningMessage.parse(serialization) as InitMessage;
		assert.instanceOf(restoredMessage, InitMessage);
		assert.equal(restoredMessage['values'].gflen, 9);
		assert.equal(restoredMessage['values'].lflen, 11);
	});

	it('should serialize ping/pong messages', () => {
		const pingMessage = new PingMessage({
			num_pong_bytes: 7,
			ignored: Buffer.alloc(6, 0)
		});
		const pingData = Buffer.concat([pingMessage.toBuffer(), Buffer.alloc(15, 0)]);
		const receivedPingMessage = LightningMessage.parse(pingData);
		assert.instanceOf(receivedPingMessage, PingMessage);
		const pongMessage = new PongMessage({
			ignored: Buffer.alloc(pingMessage['values'].num_pong_bytes)
		});
		const pongData = pongMessage.toBuffer();
		const expectedPongLength = 2 + 2 + 7; // type length + byteslen + ignored
		assert.equal(pongData.length, expectedPongLength);
	});

});
