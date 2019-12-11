import LightningMessage from './src/lightning_message';
import {AcceptChannelMessage} from './src/messages/accept_channel';
import {InitMessage} from './src/messages/init';
import {OpenChannelMessage} from './src/messages/open_channel';
import {PingMessage} from './src/messages/ping';
import {PongMessage} from './src/messages/pong';
import {QueryChannelRangeMessage} from './src/messages/query_channel_range';
import {ReplyChannelRangeMessage} from './src/messages/reply_channel_range';

const Message = {
	InitMessage,
	PingMessage,
	PongMessage,
	OpenChannelMessage,
	AcceptChannelMessage,
	QueryChannelRangeMessage,
	ReplyChannelRangeMessage
};

export {
	LightningMessage,
	Message
}
