import React from 'react';

interface props {
    username: string;
    message: string;
    position: 'L' | 'R';
}

const Message: React.FC<props> = ({ username, message, position }) => {
    return (
        <div
            style={{ justifyContent: position === 'R' ? 'end' : 'start' }}
            className="w-full flex"
        >
            <div className="flex flex-col h-min w-fit min-w-[10%] p-2 bg-light dark:bg-dark border-standard border-dark dark:border-light">
                {position === 'L' && <p className="text-xs">{username}</p>}
                <p className="text-lg">{message}</p>
            </div>
        </div>
    );
};

export default Message;
