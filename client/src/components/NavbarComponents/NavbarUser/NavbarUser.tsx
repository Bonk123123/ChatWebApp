'use client';

import Modal from '@/components/Modal/Modal';
import navbarStore from '@/store/NavbarStore';
import userStore from '@/store/UserStore';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react-lite';
import React from 'react';

const NavbarUser = () => {
    const optionsRef = React.useRef<HTMLDivElement>(null);
    const gearRef = React.useRef<HTMLSpanElement>(null);

    const [showModal, setShowModal] = React.useState(false);

    const ChooseModeShowModal = (mode: 'backgrounds' | 'options') => {
        setShowModal(false);
        navbarStore.setMode(mode);
    };

    const closeModalOnDocumentClick = (e: MouseEvent) => {
        if (!optionsRef.current || !gearRef.current) return;
        if (
            !optionsRef.current.contains(e.target as Node) &&
            !gearRef.current.contains(e.target as Node)
        )
            setShowModal(false);
    };

    React.useEffect(() => {
        document.addEventListener('click', closeModalOnDocumentClick, true);

        return () =>
            document.removeEventListener('click', closeModalOnDocumentClick);
    }, []);

    return (
        <div className="flex h-full w-full border-t-standard border-dark dark:border-light justify-center px-2">
            <div className="flex flex-col w-[90%] h-full overflow-hidden justify-center">
                <p className="whitespace-nowrap">{userStore.user.username}</p>
                <p className="text-xs whitespace-nowrap">
                    {'id: ' + userStore.user._id}
                </p>
            </div>

            <span className="h-full w-[10%] flex justify-center items-center overflow-hidden">
                <span
                    ref={gearRef}
                    onClick={() => setShowModal((prev) => !prev)}
                    className="flex justify-center items-center cursor-pointer w-8 h-8 rounded-full hover:text-light hover:bg-dark dark:hover:text-dark dark:hover:bg-light duration-100"
                >
                    <Cog6ToothIcon className="h-6 w-6" />
                </span>
            </span>
            <Modal
                refModal={optionsRef}
                style={{ translate: showModal ? '0 0' : '0 130px' }}
                className="w-40 flex right-1 bottom-10 flex-col duration-100 "
            >
                <span
                    onClick={() => ChooseModeShowModal('backgrounds')}
                    className="w-full p-1 border-b-standard border-dark dark:border-light hover:dark:bg-light hover:bg-dark hover:text-light hover:dark:text-dark text-center duration-100 cursor-pointer"
                >
                    Background
                </span>
                <span
                    onClick={() => ChooseModeShowModal('options')}
                    className="w-full p-1 hover:dark:bg-light hover:bg-dark hover:text-light hover:dark:text-dark text-center duration-100 cursor-pointer"
                >
                    Options
                </span>
            </Modal>
        </div>
    );
};

export default observer(NavbarUser);
