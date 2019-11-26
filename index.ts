import LightningMessage from './src/lightning_message';
import {AcceptChannelMessage} from './src/messages/accept_channel';
import {InitMessage} from './src/messages/init';
import {OpenChannelMessage} from './src/messages/open_channel';
import {PingMessage} from './src/messages/ping';
import {PongMessage} from './src/messages/pong';

const Message = {
	InitMessage,
	PingMessage,
	PongMessage,
	OpenChannelMessage,
	AcceptChannelMessage
};

export {
	LightningMessage,
	Message
}
