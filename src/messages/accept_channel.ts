import LightningMessage, {LightningMessageField, LightningMessageTypes} from '../lightning_message';

export class AcceptChannelMessage extends LightningMessage {

	protected getType(): number {
		return LightningMessageTypes.ACCEPT_CHANNEL;
	}

	protected getFields(): LightningMessageField[] {
		return [];
	}

	protected parseCustomField(remainingBuffer: Buffer, field: LightningMessageField): { value: any; offsetDelta: number } {
		return undefined;
	}

	protected getValue(field: string): any {
		throw new Error('unimplemented');
	}

	protected setValue(field: string, value: any) {
		throw new Error('unimplemented');
	}

}
