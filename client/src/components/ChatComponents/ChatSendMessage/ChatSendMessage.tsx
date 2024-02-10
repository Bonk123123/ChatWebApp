'use client';

import React from 'react';

interface props {
    messageState: string;
    messageSetState: React.Dispatch<React.SetStateAction<string>>;
    messageSend: () => void;
}

const ChatSendMessage: React.FC<props> = ({
    messageState,
    messageSetState,
    messageSend,
}) => {
    return (
        <div className="w-full h-[7%] flex bg-light dark:bg-dark">
            <input
                type="text"
                value={messageState}
                onChange={(e) => messageSetState(e.target.value)}
                placeholder="send message"
                className="w-full p-1 outline-none border-t-standard border-dark dark:border-light bg-transparent"
            />
            <span
                onClick={messageSend}
                className="duration-100 flex justify-center items-center border-t-standard border-l-standard border-dark dark:border-light w-16 hover:bg-dark dark:hover:bg-light hover:text-light dark:hover:text-dark cursor-pointer"
            >
                send
            </span>
        </div>
    );
};

export default ChatSendMessage;
