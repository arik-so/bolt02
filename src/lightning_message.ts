import bigintBuffer = require('bigint-buffer');
import ecurve = require('ecurve');
import {MessageFieldType, MessageFieldTypeHandler} from './types/message_field_type';
import {OpenChannelMessageFields} from './messages/open_channel';

const secp256k1 = ecurve.getCurveByName('secp256k1');

export interface LightningMessageField {
	readonly name: string;
	readonly type: MessageFieldType | string;
}

export enum LightningMessageTypes {
	OPEN_CHANNEL = 32,
	ACCEPT_CHANNEL = 33,
	FUNDING_CREATED = 34,
	FUNDING_SIGNED = 35,
	FUNDING_LOCKED = 36,

	SHUTDOWN = 38,
	CLOSING_SIGNED = 39,

	UPDATE_ADD_HTLC = 128,
	UPDATE_FULFILL_HTLC = 130,
	UPDATE_FAIL_HTLC = 131,
	UPDATE_FAIL_MALFORMED_HTLC = 135
}

export default abstract class LightningMessage {

	abstract toBuffer(): Buffer;

	public get length(): number {
		const buffer = this.toBuffer();
		return buffer.length;
	}

	public static parse(undelimitedBuffer: Buffer): LightningMessage {
		// dynamic imports to avoid circular dependency
		const {OpenChannelMessage} = require('./messages/open_channel');
		const {AcceptChannelMessage} = require('./messages/accept_channel');

		const type = undelimitedBuffer.readUInt16BE(0);
		const undelimitedData = undelimitedBuffer.slice(2);
		let message: LightningMessage;
		switch (type) {
			case LightningMessageTypes.OPEN_CHANNEL:
				message = new OpenChannelMessage();
				break;
			case LightningMessageTypes.ACCEPT_CHANNEL:
				message = new AcceptChannelMessage();
				break;
			default:
				throw new Error('unsupported data');
		}
		return message.parseData(undelimitedData);
	}

	protected parseData(undelimitedBuffer: Buffer): LightningMessage {
		let offset = 0;
		const fields = this.getFields();
		for (const currentField of fields) {
			const currentType = currentField.type;
			if (currentType in MessageFieldType) {
				// @ts-ignore
				const currentTypeDetails = MessageFieldTypeHandler.getTypeDetails(currentType);
				const valueBuffer = undelimitedBuffer.slice(offset, offset + currentTypeDetails.length);
				offset += currentTypeDetails.length;

				// TODO: use custom type handler with valueBuffer
				let value: any = valueBuffer;
				if (currentType === MessageFieldType.u16) {
					value = valueBuffer.readUInt16BE(0);
				} else if (currentType === MessageFieldType.u32) {
					value = valueBuffer.readUInt32BE(0);
				} else if (currentType === MessageFieldType.u64) {
					value = bigintBuffer.toBigIntBE(valueBuffer);
				} else if (currentType === MessageFieldType.POINT) {
					value = ecurve.Point.decodeFrom(secp256k1, valueBuffer);
				}
				this.setValue(currentField.name, value);
			} else {
				// do custom handling
				const customFieldResult = this.parseCustomField(undelimitedBuffer.slice(offset), currentField);
				this.setValue(currentField.name, customFieldResult.value);
				offset += customFieldResult.offsetDelta;
			}
		}
		return this;
	}

	protected abstract getFields(): LightningMessageField[];

	protected abstract parseCustomField(remainingBuffer: Buffer, field: LightningMessageField): { value: any, offsetDelta: number };

	protected abstract setValue(field: string, value: any);

}