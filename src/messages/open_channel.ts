import LightningMessage, {LightningMessageField} from '../lightning_message';
import {MessageFieldType, MessageFieldTypeHandler} from '../types/message_field_type';
import {Point} from 'ecurve';

export interface OpenChannelMessageFields {
	chain_hash: Buffer,
	temporary_channel_id: Buffer,
	funding_satoshis: bigint,
	push_msat: bigint,
	dust_limit_satoshis: bigint,
	max_htlc_value_in_flight_msat: bigint,
	channel_reserve_satoshis: bigint,
	htlc_minimum_msat: bigint,
	feerate_per_kw: number,
	to_self_delay: number,
	max_accepted_htlcs: number,
	funding_pubkey: Point
}

export class OpenChannelMessage extends LightningMessage {

	// @ts-ignore
	private values: OpenChannelMessageFields = {};

	protected constructor() {
		super();
	}

	private static readonly FIELDS: LightningMessageField[] = [
		{name: 'chain_hash', type: MessageFieldType.HASH},
		{name: 'temporary_channel_id', type: MessageFieldType.HASH},
		{name: 'funding_satoshis', type: MessageFieldType.u64},
		{name: 'push_msat', type: MessageFieldType.u64},
		{name: 'dust_limit_satoshis', type: MessageFieldType.u64},
		{name: 'max_htlc_value_in_flight_msat', type: MessageFieldType.u64},
		{name: 'channel_reserve_satoshis', type: MessageFieldType.u64},
		{name: 'htlc_minimum_msat', type: MessageFieldType.u64},
		{name: 'feerate_per_kw', type: MessageFieldType.u32},
		{name: 'to_self_delay', type: MessageFieldType.u16},
		{name: 'max_accepted_htlcs', type: MessageFieldType.u16},
		{name: 'funding_pubkey', type: MessageFieldType.POINT},
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
