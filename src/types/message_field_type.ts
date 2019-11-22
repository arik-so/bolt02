export enum MessageFieldType {
	u16,
	u32,
	u64,
	HASH,
	POINT,
	BYTE
}

export interface MessageFieldTypeDetails {
	readonly name: string;
	readonly length?: number;
}

export class MessageFieldTypeHandler {

	private static typeDetails: { [key in MessageFieldType]: MessageFieldTypeDetails; } = {
		[MessageFieldType.u16]: {name: 'u16', length: 2},
		[MessageFieldType.u32]: {name: 'u32', length: 4},
		[MessageFieldType.u64]: {name: 'u64', length: 8},
		[MessageFieldType.HASH]: {name: 'hash', length: 32},
		[MessageFieldType.POINT]: {name: 'point', length: 33},
		[MessageFieldType.BYTE]: {name: 'byte', length: 1}
	};

	public static getTypeDetails(type: MessageFieldType): MessageFieldTypeDetails {
		return this.typeDetails[type];
	}

}
