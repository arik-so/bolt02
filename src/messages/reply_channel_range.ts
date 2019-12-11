import LightningMessage, {LightningMessageField, LightningMessageTypes} from '../lightning_message';
import {MessageFieldType} from '../types/message_field_type';
import TLV from 'lightning-tlv/src/tlv';

export interface ReplyChannelRangeMessageFields {
	chain_hash: Buffer,
	first_blocknum: number,
	number_of_blocks: number,
	complete: number,
	len?: number,
	encoded_short_ids: Buffer,
	reply_channel_range_tlvs: TLV[],
}

export class ReplyChannelRangeMessage extends LightningMessage {

	protected values: ReplyChannelRangeMessageFields;

	constructor(values: ReplyChannelRangeMessageFields) {
		super();
		this.values = values;
	}

	public getType(): number {
		return LightningMessageTypes.REPLY_CHANNEL_RANGE;
	}

	protected getFields(): LightningMessageField[] {
		return [
			{name: 'chain_hash', type: MessageFieldType.HASH},
			{name: 'first_blocknum', type: MessageFieldType.u32},
			{name: 'number_of_blocks', type: MessageFieldType.u32},
			{name: 'complete', type: MessageFieldType.BYTE},
			{name: 'len', type: MessageFieldType.u16, dynamic_value: true},
			{name: 'encoded_short_ids', type: 'encoded_short_ids'},
			{name: 'reply_channel_range_tlvs', type: MessageFieldType.TLV_STREAM}
		];
	}

	protected parseCustomField(remainingBuffer: Buffer, field: LightningMessageField): { value: any, offsetDelta: number } {
		if (field.type === 'encoded_short_ids') {
			const value: Buffer = remainingBuffer.slice(0, this.values.len);
			return {value, offsetDelta: this.values.len};
		}
		return undefined;
	}

	protected getDynamicValue(field: LightningMessageField): any {
		if (field.name === 'len') {
			return this.values.encoded_short_ids.length;
		}
		return undefined;
	}

	protected serializeCustomField(field: LightningMessageField, value: any): Buffer {
		return undefined;
	}

}
