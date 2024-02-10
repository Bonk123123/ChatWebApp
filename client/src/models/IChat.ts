import { IMessage } from './IMessage';

export interface IChat {
    _id: string;
    chat_name: string;
    chat_img: string;
    chat_participants: { user: string; userSocketId: string; _id: string }[];
    messages: IMessage[];
    lastMessage: string;
}
