export interface IMessage {
    _id: string;
    user: {
        username: string;
    };
    message: string;
}
