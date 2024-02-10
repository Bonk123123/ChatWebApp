'use client';
import backgroundStore from '@/store/BackgroundStore';
import { observer } from 'mobx-react-lite';
import React from 'react';

const Background = () => {
    return (
        <img
            src={backgroundStore.getCurrentBackground()}
            alt=""
            className="absolute w-full h-full object-cover overflow-hidden"
        />
    );
};

export default observer(Background);
