import LightningMessage, {LightningMessageTypes} from '../src/lightning_message';

describe('Lightning Message Tests', () => {

	it('should parse an open channel message', () => {
		const buffer = Buffer.from('00abcdef1234567801');
		buffer.writeUInt16BE(LightningMessageTypes.OPEN_CHANNEL, 0);

		LightningMessage.parse(buffer);
		console.log('here');
	});

});
