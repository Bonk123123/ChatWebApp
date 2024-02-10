'use client';
import Modal from '@/components/Modal/Modal';
import navbarStore from '@/store/NavbarStore';
import userStore from '@/store/UserStore';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react-lite';
import React from 'react';

const NavbarOptions = () => {
    const divRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [userData, setUserData] = React.useState<{username: string, email: string, password: string, avatarImage: File  | null}>({username: '', email: '', password: '', avatarImage: null})


    const chooseAvatarImage = () => {
        inputRef.current?.click();
    }

    const changeAvatarImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => ({...prev, avatarImage: e.target.files ? e.target.files[0] : null}))
    }

    const changeData = (key: keyof typeof userData, e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => ({...prev, [key]: e.target.value}))
    }

    React.useEffect(() => {
        if(userData.avatarImage) userStore.changeAvatarImg(userData.avatarImage)
    }, [userData.avatarImage])

    React.useEffect(() => {
        if (!divRef.current) return;
        divRef.current.classList.toggle('animate-borderAnim');
        setTimeout(() => {
            if (!divRef.current) return;
            divRef.current.classList.toggle('animate-borderAnim');
        }, 500);
    }, [navbarStore.mode]);

    return (
        <div
            ref={divRef}
            style={{
                translate: navbarStore.mode === 'options' ? '0' : '-750px',
                transition: 'translate 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className="absolute min-w-[100%] h-[87%] bg-light dark:bg-dark flex flex-col gap-0 z-30 overflow-y-auto overflow-x-clip scrollbar-thumb border-dark dark:border-light"
        >
            <div className="w-full h-full flex flex-col items-center">
                <span onClick={chooseAvatarImage} className='min-w-[128px] min-h-[128px] mt-10 object-cover cursor-pointer'>
                    <input type="file" ref={inputRef} onChange={(e) => changeAvatarImage(e)} accept="image/png, image/jpeg" className='hidden' />
                    { userStore.user.img ? 
                        (<img src={userStore.user.img} alt="" />) 
                        : 
                        (<PhotoIcon/>)
                    }
                </span>
                
                <label htmlFor="input" className="mt-10">
                    username
                </label>
                <span className="w-3/4 flex">
                    <input
                        defaultValue={userStore.user.username}
                        onChange={(e) => changeData('username', e)}
                        className="w-3/4 h-10 p-2 outline-none bg-light dark:bg-dark border-dark dark:border-light border-standard"
                        type="text"
                    />
                    <button onClick={() => userStore.changeUsername(userData.username)} className="w-1/4 bg-light dark:bg-dark border-dark dark:border-light border-standard border-l-0 hover:dark:bg-light hover:bg-dark hover:text-light hover:dark:text-dark text-center duration-100 cursor-pointer">save</button>
                </span>

                <label htmlFor="input" className="mt-3">
                    email
                </label>
                <span className="w-3/4 flex">
                    <input
                        defaultValue={userStore.user.email}
                        onChange={(e) => changeData('email', e)}
                        className="w-3/4 h-10 p-2 outline-none bg-light dark:bg-dark border-dark dark:border-light border-standard"
                        type="text"
                    />
                    <button onClick={() => userStore.changeEmail(userData.email)} className="w-1/4 bg-light dark:bg-dark border-dark dark:border-light border-standard border-l-0 hover:dark:bg-light hover:bg-dark hover:text-light hover:dark:text-dark text-center duration-100 cursor-pointer">save</button>
                </span>
                

                <label htmlFor="input" className="mt-3">
                    password
                </label>
                <span className="w-3/4 flex">
                    <input
                        onChange={(e) => changeData('password', e)}
                        className="w-3/4 h-10 p-2 outline-none bg-light dark:bg-dark border-dark dark:border-light border-standard"
                        type="text"
                    />
                    <button onClick={() => userStore.changePassword(userData.password)} className="w-1/4 bg-light dark:bg-dark border-dark dark:border-light border-standard border-l-0 hover:dark:bg-light hover:bg-dark hover:text-light hover:dark:text-dark text-center duration-100 cursor-pointer">save</button>
                </span>

                <p className='text-red-600 text-lg w-full h-full text-center'>{userStore.error}</p>
            </div>
        </div>
    );
};

export default observer(NavbarOptions);
