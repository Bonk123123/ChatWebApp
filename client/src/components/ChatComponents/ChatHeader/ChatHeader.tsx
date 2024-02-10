'use client';

import ThemeSwitcher from '@/components/Theme/ThemeSwitcher';
import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ChatToggleNavbar from '../ChatToggleNavbar/ChatToggleNavbar';
import currentChatsStore from '@/store/CurrentChatStore';
import { observer } from 'mobx-react-lite';

interface props {
    name: string;
    typing: boolean;
}

const ChatHeader: React.FC<props> = ({ name, typing }) => {
    return (
        <div className="w-full flex h-[6%] p-2 bg-light dark:bg-dark border-b-standard border-dark dark:border-light items-center justify-between z-10">
            <ChatToggleNavbar />
            {!currentChatsStore.isLoading ? (
                <p className="text-xs sm:text-lg whitespace-nowrap">{name}</p>
            ) : (
                <span className=" w-1/4 flex border-standard animate-pulse"></span>
            )}
            <ThemeSwitcher />
        </div>
    );
};

export default observer(ChatHeader);
