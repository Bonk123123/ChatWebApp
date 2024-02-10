import Background from '@/components/Background/Background';
import Navbar from '@/components/NavbarComponents/Navbar/Navbar';
import NavbarBackgrounds from '@/components/NavbarComponents/NavbarBackgrounds/NavbarBackgrounds';
import NavbarChats from '@/components/NavbarComponents/NavbarChats/NavbarChats';
import NavbarOptions from '@/components/NavbarComponents/NavbarOptions/NavbarOptions';
import NavbarSkelets from '@/components/NavbarComponents/NavbarSkelets/NavbarSkelets';
import NavbarUser from '@/components/NavbarComponents/NavbarUser/NavbarUser';
import Search from '@/components/NavbarComponents/Search/Search';
import React, { Suspense } from 'react';
import Loading from './loading';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex w-full h-full">
            <Navbar>
                <Search />

                <NavbarBackgrounds />
                <NavbarOptions />
                <NavbarChats />

                <div className="overflow-hidden flex h-[7%] w-full bg-light dark:bg-dark">
                    <NavbarUser />
                </div>
            </Navbar>
            <Background />
            {children}
        </main>
    );
};

export default layout;
