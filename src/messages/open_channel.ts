import LightningMessage, {LightningMessageField} from '../lightning_message';
import {MessageFieldType, MessageFieldTypeHandler} from '../types/message_field_type';

export interface OpenChannelMessageFields {
	chain_hash: Buffer,
	temporary_channel_id: Buffer,
	funding_satoshis: bigint,
}

export class OpenChannelMessage extends LightningMessage {

	private values: OpenChannelMessageFields;

	protected constructor() {
		super();
	}

	private static readonly FIELDS: LightningMessageField[] = [
		{name: 'chain_hash', type: MessageFieldType.hash},
		{name: 'temporary_channel_id', type: MessageFieldType.hash},
		{name: 'funding_satoshis', type: MessageFieldType.u64},
		{name: 'push_msat', type: MessageFieldType.u64},
		{name: 'dust_limit_satoshis', type: MessageFieldType.u64},
		{name: 'max_htlc_value_in_flight_msat', type: MessageFieldType.u64},
		{name: 'channel_reserve_satoshis', type: MessageFieldType.u64},
		{name: 'htlc_minimum_msat', type: MessageFieldType.u64},
		{name: 'feerate_per_kw', type: MessageFieldType.u32}
	];

	protected getFields(): LightningMessageField[] {
		return OpenChannelMessage.FIELDS;
	}

	protected setValue(field: string, value: any) {
		this.values[field] = value;
	}

	protected parseCustomField(remainingBuffer: Buffer, field: LightningMessageField): { value: any, offsetDelta: number } {
		return undefined;
	}

	toBuffer(): Buffer {
		return undefined;
	}

}
