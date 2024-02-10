'use client';

import React from 'react';
import NavbarBackgroundCard from '../NavbarBackgroundCard/NavbarBackgroundCard';
import backgroundStore from '@/store/BackgroundStore';
import { observer } from 'mobx-react-lite';
import navbarStore from '@/store/NavbarStore';
import userStore from '@/store/UserStore';

const NavbarBackgrounds = () => {
    const divRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!userStore.user._id) return;
        backgroundStore.fetchBackgrounds(userStore.user._id);
    }, [userStore.user]);

    React.useEffect(() => {
        if (!divRef.current) return;
        divRef.current.classList.toggle('animate-borderAnim');
        setTimeout(() => {
            if (!divRef.current) return;
            divRef.current.classList.toggle('animate-borderAnim');
        }, 500);
    }, [navbarStore.mode]);
    return (
        <div
            ref={divRef}
            style={{
                translate: navbarStore.mode === 'backgrounds' ? '' : '-750px',
                zIndex: navbarStore.mode === 'backgrounds' ? '30' : '',
                transition: 'translate 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className="absolute min-w-[100%] h-[87%] bg-light dark:bg-dark flex flex-col gap-0 overflow-y-auto overflow-x-clip scrollbar-thumb border-dark dark:border-light"
        >
            {backgroundStore.backgrounds?.map((background) => (
                <NavbarBackgroundCard
                    img={background.img}
                    key={background.id}
                />
            ))}
        </div>
    );
};

export default observer(NavbarBackgrounds);
