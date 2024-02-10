import React from 'react';

const Loading = () => {
    return (
        <div className="border-standard border-dark dark:border-light w-min h-6 flex relative px-1">
            <div className="w-full flex gap-1 items-center whitespace-nowrap animate-loading overflow-hidden overflow-x-clip">
                <span className="h-3 min-w-[12px] flex bg-dark dark:bg-light whitespace-nowrap"></span>
                <span className="h-3 min-w-[12px] flex bg-dark dark:bg-light whitespace-nowrap"></span>
                <span className="h-3 min-w-[12px] flex bg-dark dark:bg-light whitespace-nowrap"></span>
                <span className="h-3 min-w-[12px] flex bg-dark dark:bg-light whitespace-nowrap"></span>
                <span className="h-3 min-w-[12px] flex bg-dark dark:bg-light whitespace-nowrap"></span>
            </div>
        </div>
    );
};

export default Loading;
