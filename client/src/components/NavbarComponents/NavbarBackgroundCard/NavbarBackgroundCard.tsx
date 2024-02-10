import backgroundStore from '@/store/BackgroundStore';
import { observer } from 'mobx-react-lite';
import React from 'react';

interface props {
    img: string;
}

const NavbarBackgroundCard: React.FC<props> = ({ img }) => {
    return (
        <div className="min-w-max h-60 flex justify-center items-center">
            <img
                onClick={() => backgroundStore.setCurrentBackground(img)}
                className="w-[90%] h-[90%] object-cover border-standard border-dark dark:border-light cursor-pointer"
                src={img}
                alt=""
            />
        </div>
    );
};

export default observer(NavbarBackgroundCard);
