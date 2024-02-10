'use client';

import ChatHeader from '@/components/ChatComponents/ChatHeader/ChatHeader';
import authStore from '@/store/AuthStore';
import userStore from '@/store/UserStore';
import { useRouter } from 'next/navigation';
import React from 'react';

const page = () => {
    const router = useRouter();

    React.useEffect(() => {
        const token = authStore.isLogIn();

        if (!token) router.push('/auth/login');

        userStore.fetchUser();
    }, []);
    return (
        <div className="absolute md:relative flex flex-col h-full w-full">
            <ChatHeader
                name="Click on someone to start chatting"
                typing={false}
            />

            <div className="flex h-[94%] justify-center items-center w-full relative">
                <p className="text-4xl text-center z-10">Good morning</p>
            </div>
        </div>
    );
};

export default page;
