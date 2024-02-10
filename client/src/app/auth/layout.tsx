import Container from '@/components/Container/Container';
import ThemeSwitcher from '@/components/Theme/ThemeSwitcher';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-[10%] justify-center items-center z-10 border-b-standard bg-light dark:bg-dark border-dark dark:border-light flex">
                <p className="text-5xl">ChatApp</p>
            </div>
            <div className="w-full h-[90%] flex justify-center items-center overflow-hidden">
                <img
                    className="absolute w-full h-full object-cover"
                    src="https://img.itch.zone/aW1nLzEwNzg1Mzg2LnBuZw==/original/BGKhI%2F.png"
                    alt=""
                />
                {children}
            </div>
        </div>
    );
};

export default layout;
