import React from 'react';

const FriendNavbarSkelet = () => {
    return (
        <div className="min-w-[384px] flex h-16 border-b-standard border-dark dark:border-light overflow-hidden">
            <div className="flex justify-center items-center border-r-standard border-dark dark:border-light h-full min-w-[64px] max-w-[64px]">
                <span className="flex w-full h-full animate-pulse bg-dark dark:bg-light"></span>
            </div>
            <div className="flex flex-col mx-5 w-80 h-full justify-around">
                <span className="border-standard w-32 animate-pulse"></span>
                <span className="border-standard w-52 animate-pulse"></span>
            </div>
        </div>
    );
};

export default FriendNavbarSkelet;
