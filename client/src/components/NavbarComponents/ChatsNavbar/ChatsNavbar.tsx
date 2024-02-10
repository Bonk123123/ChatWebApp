import currentChatsStore from '@/store/CurrentChatStore';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

interface props {
    id: string;
    username: string;
    lastMessage: string;
    img: string;
}

const ChatsNavbar: React.FC<props> = ({ id, username, lastMessage, img }) => {
    return (
        <Link
            href={`/chat/${id}`}
            className="min-w-[384px] flex h-16 border-b-standard border-dark dark:border-light cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover duration-100"
        >
            <div className="flex items-center border-r-standard border-dark dark:border-light h-full min-w-[64px] max-w-[64px] overflow-hidden object-contain">
                {img ? (
                    <img // convert to Image from next after all
                        className="h-full w-full object-cover"
                        src={img}
                        alt=""
                    />
                ) : (
                    <span className="w-full">
                        <PhotoIcon />
                    </span>
                )}
            </div>

            <div className="flex flex-col mx-5 justify-center whitespace-nowrap">
                <p className="text-start">{username}</p>
                <p className="text-sm">
                    {lastMessage ? lastMessage : 'oops...'}
                </p>
            </div>
            <div></div>
        </Link>
    );
};

export default ChatsNavbar;
