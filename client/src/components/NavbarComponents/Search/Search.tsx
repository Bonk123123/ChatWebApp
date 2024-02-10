'use client';
import React from 'react';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import navbarStore from '@/store/NavbarStore';
import { observer } from 'mobx-react-lite';
import chatsStore from '@/store/ChatsStore';
import debounce from 'lodash.debounce';
import userStore from '@/store/UserStore';

const Search = () => {
    const debounceFn = React.useCallback(
        debounce(chatsStore.fetchChats, 300),
        []
    );

    const setSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        chatsStore.setSearchParam(e.target.value);
    };

    React.useEffect(() => {
        debounceFn(userStore.user._id);
    }, [chatsStore.searchParam]);

    return (
        <div className="flex w-full h-[6%] px-1 border-b-standard duration-100 bg-light dark:bg-dark border-dark dark:border-light">
            <span
                style={{
                    width:
                        navbarStore.mode === 'backgrounds' ||
                        navbarStore.mode === 'options'
                            ? ''
                            : '0',
                }}
                className="w-[12%] h-full flex justify-center items-center duration-100"
            >
                <span
                    onClick={() => navbarStore.setMode('chats')}
                    className="flex justify-center items-center cursor-pointer w-8 h-8 rounded-full hover:text-light hover:bg-dark dark:hover:text-dark dark:hover:bg-light duration-100 overflow-hidden"
                >
                    <ArrowLeftIcon className="min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px]" />
                </span>
            </span>

            <input
                style={{ width: chatsStore.searchParam ? '88%' : '100%' }}
                type="text"
                value={chatsStore.searchParam}
                onChange={(e) => setSearch(e)}
                className="bg-transparent outline-none p-2 h-full"
                placeholder="find user"
            />
            <span
                style={{ width: chatsStore.searchParam ? '' : '0' }}
                className="w-[12%] h-full flex justify-center items-center overflow-hidden"
            >
                <span
                    onClick={() => chatsStore.setSearchParam('')}
                    className="flex cursor-pointer justify-center items-center w-8 h-8 rounded-full hover:text-light hover:bg-dark dark:hover:text-dark dark:hover:bg-light duration-100"
                >
                    <XMarkIcon className="min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px]" />
                </span>
            </span>
            <span
                onClick={() => navbarStore.setShow()}
                className="flex md:hidden items-center xl:hidden w-[7%] h-full cursor-pointer"
            >
                <ArrowLeftIcon
                    className="min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px]"
                    style={{
                        rotate: navbarStore.isOpen ? '' : '180deg',
                        transition: 'rotate 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                />
            </span>
        </div>
    );
};

export default observer(Search);
