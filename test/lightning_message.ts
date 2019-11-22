import chai = require('chai');
import LightningMessage, {LightningMessageTypes} from '../src/lightning_message';
import {OpenChannelMessage} from '../src/messages/open_channel';

const assert = chai.assert;

describe('Lightning Message Tests', () => {

	it('should parse an open channel message', () => {
		// 0000: prefix for the message type tag
		const buffer = Buffer.from('00002e28ecbd234489bd13fca44b375fb53e9eb03fb9384c4bc1bf046ea4139b86c60d39c02e00644c6c7bc8610329767e8185d80c0739a5f5db421cbc159c752b0041b55cadd32231ae48c9af62c0ceca876eb7b3a94a03b793549e9159f89fa43036147263e5647c2d00000000427390b047010e7f33900707021d02f90a74bc300d360636b7e28da600ac0cd8b98638baa133c48147349a3bf40331732ab4699e568fe3f0c27449a9defeed6f03ea29a6f348a50b04b860d852b7023fe4a3759047274d8782c1cad55e61c8348b4926ea777c78fea853f8d647218b034633b1cd138e2efc6a09f9b87381c0c97aa1cd0264fc87aecfc5a41a77c43d090273967a0a006b0232002869f1760ce94eecb8aebddb38c6f2646d59ed731b66510268dde32ab0bf503197befaec8a5c2abf3273ebceb3dc095da795eb453951818746', 'hex');
		buffer.writeUInt16BE(LightningMessageTypes.OPEN_CHANNEL, 0);

		const openChannelMessage = LightningMessage.parse(buffer) as OpenChannelMessage;
		assert.equal(openChannelMessage['values'].funding_pubkey.getEncoded(true).toString('hex'), '021d02f90a74bc300d360636b7e28da600ac0cd8b98638baa133c48147349a3bf4');

		const restoredBuffer = openChannelMessage.toBuffer();
		assert.equal(restoredBuffer.toString('hex'), buffer.toString('hex'));
	});

});
