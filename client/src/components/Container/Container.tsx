import React from 'react';

type props = {
    children: string | React.ReactNode | React.ReactNode[];
};

const Container: React.FC<props> = ({ children }) => {
    return (
        <div className="flex h-screen justify-center items-center bg-light dark:bg-dark dark:text-light duration-100">
            <div className="w-full h-full sm:w-[95%] sm:h-[95%] xl:w-[90%] xl:h-[90%] border-standard border-dark dark:border-light bg-transparent overflow-hidden relative">
                {children}
            </div>
        </div>
    );
};

export default Container;
