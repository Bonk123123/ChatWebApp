'use client';

import navbarStore from '@/store/NavbarStore';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react-lite';
import React from 'react';

const ChatToggleNavbar = () => {
    return (
        <span className="flex xl:hidden items-center w-[8%] h-full">
            <span
                onClick={() => navbarStore.setShow()}
                className="flex justify-center items-center cursor-pointer w-8 h-8 rounded-full hover:text-light hover:bg-dark dark:hover:text-dark dark:hover:bg-light duration-100"
            >
                <ArrowLeftIcon
                    className="min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px]"
                    style={{
                        rotate: navbarStore.isOpen ? '' : '180deg',
                        transition: 'rotate 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                />
            </span>
        </span>
    );
};

export default observer(ChatToggleNavbar);
