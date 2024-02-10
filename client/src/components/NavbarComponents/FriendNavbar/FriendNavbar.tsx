'use client';
import Image from 'next/image';
import React from 'react';
import { PhotoIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import currentChatsStore from '@/store/CurrentChatStore';
import userStore from '@/store/UserStore';
import { observer } from 'mobx-react-lite';

interface props {
    id: string;
    username: string;
    img: string;
}

const FriendNavbar: React.FC<props> = ({ id, username, img }) => {
    const router = useRouter();
    return (
        <button
            onClick={() =>
                currentChatsStore.createChat([id, userStore.user._id], () =>
                    router.push(`/chat/${currentChatsStore.currentChat._id}`)
                )
            }
            className="min-w-[384px] flex items-center h-16 border-b-standard border-dark dark:border-light cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover duration-100"
        >
            <div className="flex justify-center items-center border-r-standard border-dark dark:border-light h-full min-w-[64px] max-w-[64px] overflow-hidden object-contain">
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
                <p className="text-sm">{id ? id : 'oops...'}</p>
            </div>
            <div></div>
        </button>
    );
};

export default observer(FriendNavbar);
