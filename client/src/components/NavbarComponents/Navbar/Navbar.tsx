'use client';

import React, { Suspense } from 'react';
import navbarStore from '@/store/NavbarStore';
import { observer } from 'mobx-react-lite';

interface props {
    children?: string | React.ReactNode | React.ReactNode[];
}

const Navbar: React.FC<props> = ({ children }) => {
    React.useEffect(() => {
        window.addEventListener('resize', (e) => {
            if (window.innerWidth > 1280) navbarStore.setIsOpen(true);
        });
        return () =>
            window.removeEventListener('resize', (e) => {
                if (window.innerWidth > 1280) navbarStore.setIsOpen(true);
            });
    }, []);

    return (
        <div
            style={{
                transition:
                    'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), border-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                width: navbarStore.isOpen ? '' : '0',
                borderWidth: navbarStore.isOpen ? '' : '0',
                minWidth: navbarStore.isOpen ? '' : '0',
            }}
            className="flex-col md:min-w-[384px] md:max-w-[384px] w-full h-full bg-light dark:bg-dark md:bg-transparent md:border-r-standard border-dark dark:border-light z-20 relative overflow-hidden"
        >
            {children}
        </div>
    );
};

export default observer(Navbar);
