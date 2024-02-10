import React from 'react';

interface props {
    style?: Object;
    className?: string;
    refModal?: React.RefObject<HTMLDivElement>;
    children?: string | React.ReactNode | React.ReactNode[];
}

const Modal: React.FC<props> = ({ children, className, style, refModal }) => {
    return (
        <div
            ref={refModal}
            style={style}
            className={
                'absolute border-standard border-dark dark:border-light bg-light dark:bg-dark z-30 ' +
                className
            }
        >
            {children}
        </div>
    );
};
export default Modal;
