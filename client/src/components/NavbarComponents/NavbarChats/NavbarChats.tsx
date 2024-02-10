'use client';
import React, { Suspense } from 'react';
import NavbarSkelets from '../NavbarSkelets/NavbarSkelets';
import FriendNavbar from '../FriendNavbar/FriendNavbar';
import chatsStore from '@/store/ChatsStore';
import userStore from '@/store/UserStore';
import navbarStore from '@/store/NavbarStore';
import { observer } from 'mobx-react-lite';
import ChatsNavbar from '../ChatsNavbar/ChatsNavbar';

const NavbarChats = () => {
    React.useEffect(() => {
        if (!userStore.user._id) return;
        chatsStore.fetchChats(userStore.user._id);
    }, [userStore.user]);

    return (
        <div className="w-full h-[87%] bg-light dark:bg-dark flex flex-col gap-0 overflow-y-auto overflow-x-clip">
            {chatsStore.isLoading ? (
                <NavbarSkelets />
            ) : chatsStore.searchParam ? (
                chatsStore.users?.map((user) => (
                    <FriendNavbar
                        key={user._id}
                        id={user._id}
                        username={user.username}
                        img={user.img}
                    />
                ))
            ) : (
                chatsStore.chats?.map((chat) => (
                    <ChatsNavbar
                        key={chat._id}
                        id={chat._id}
                        username={chat.chat_name}
                        lastMessage={chat.lastMessage}
                        img={chat.chat_img}
                    />
                ))
            )}
            {chatsStore.error ? (
                <p className="my-3 text-[red] text-xl w-full text-center">
                    {chatsStore.error}
                </p>
            ) : (
                <></>
            )}
        </div>
    );
};

export default observer(NavbarChats);
