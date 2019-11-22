import LightningMessage, {LightningMessageField} from '../lightning_message';

export class AcceptChannelMessage extends LightningMessage {

	toBuffer(): Buffer {
		return undefined;
	}

	protected getFields(): LightningMessageField[] {
		return [];
	}

	protected parseCustomField(remainingBuffer: Buffer, field: LightningMessageField): { value: any; offsetDelta: number } {
		return undefined;
	}

	protected setValue(field: string, value: any) {
		throw new Error('unimplemented');
	}

}
