'use client';

import ChatHeader from '@/components/ChatComponents/ChatHeader/ChatHeader';
import ChatSendMessage from '@/components/ChatComponents/ChatSendMessage/ChatSendMessage';
import Message from '@/components/ChatComponents/Message/Message';
import Loading from '@/components/Loading/Loading';
import { URLpath } from '@/constants/URLpath';
import { IMessage } from '@/models/IMessage';
import authStore from '@/store/AuthStore';
import chatsStore from '@/store/ChatsStore';
import currentChatsStore from '@/store/CurrentChatStore';
import userStore from '@/store/UserStore';
import authHeader from '@/utils/authHeader';
import { getCookie } from '@/utils/getCookie';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';
import { Socket, io } from 'socket.io-client';

const page = ({ params }: { params: { chatId: string } }) => {
    const router = useRouter();

    const socket = React.useRef<Socket>();

    const [loading, setLoading] = React.useState(false);

    const [messages, setMessages] = React.useState<IMessage[]>([]);

    const [newMessage, setNewMessage] = React.useState<string>('');

    React.useEffect(() => {
        const token = authStore.isLogIn();

        if (!token) router.push('/auth/login');

        userStore.fetchUser();
    }, []);

    React.useEffect(() => {
        if (!userStore.user._id) return;

        currentChatsStore.fetchCurrentChatById(
            params.chatId,
            userStore.user._id
        );

        const token = authStore.isLogIn();

        if (!token) return;

        socket.current = io(URLpath, {
            extraHeaders: {
                Authorization: authHeader().Authorization!,
            },
        });

        socket.current.emit('GetAllMessages', params.chatId, () =>
            setLoading(true)
        );

        socket.current.on('ReceiveAllMessages', (messages1: IMessage[]) => {
            setMessages(messages1);
        });

        socket.current.on('ReceiveMessage', (message: IMessage) => {
            console.log(2)
            setMessages((prev) => [...prev, message]);
            setLoading(false);
        });
    }, [userStore.user]);

    const sendMessage = () => {
        if (!socket.current) return;
        socket.current.emit('SendMessage', {
            chatId: params.chatId,
            userId: userStore.user._id,
            message: newMessage,
        });
        setNewMessage('');
    };

    return (
        <div className="absolute md:relative flex flex-col h-full w-full">
            <ChatHeader
                name={currentChatsStore.currentChat.chat_name}
                typing={false}
            />
            <div className="flex h-[87%] w-full relative">
                <div className="z-10 flex flex-col w-full p-3 gap-6 overflow-y-auto scrollbar-thumb">
                    {loading ? (
                        <span className="w-full h-full flex justify-center items-center">
                            <Loading />
                        </span>
                    ) : (
                        messages?.map((message) => (
                            <Message
                                key={message._id}
                                username={message.user.username}
                                message={message.message}
                                position={
                                    userStore.user.username ===
                                    message.user.username
                                        ? 'R'
                                        : 'L'
                                }
                            />
                        ))
                    )}
                </div>
            </div>
            <ChatSendMessage
                messageState={newMessage}
                messageSetState={setNewMessage}
                messageSend={sendMessage}
            />
        </div>
    );
};

export default observer(page);
