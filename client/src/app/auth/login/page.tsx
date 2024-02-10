'use client';

import ThemeSwitcher from '@/components/Theme/ThemeSwitcher';
import React from 'react';
import authStore from '@/store/AuthStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import Loading from '@/components/Loading/Loading';
import { getCookie } from '@/utils/getCookie';

const page = () => {
    const router = useRouter();

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        await authStore.logIn(e);
        isAuth();
    };

    const isAuth = () => {
        const user = authStore.isLogIn();
        if (user) router.push('/chat');
    };
    React.useEffect(() => {
        isAuth();
    }, []);
    return (
        <form
            onSubmit={(e) => submit(e)}
            className="w-[80%] lg:w-[50%] h-[80%] bg-light dark:bg-dark flex flex-col border-standard border-dark dark:border-light z-10"
        >
            <p className="text-3xl w-full text-center my-5">Login</p>
            <div className="w-full h-full flex flex-col items-center">
                <label>Email</label>
                <input
                    className="flex w-[80%] md:w-1/2 p-2 bg-light dark:bg-dark border-standard border-dark dark:border-light"
                    type="email"
                    value={authStore.credentials.email}
                    onChange={(e) => authStore.setEmail(e.target.value)}
                    autoComplete="current-email"
                    placeholder="example@example.ru"
                />
                <label className="mt-5">Password</label>
                <input
                    className="flex w-[80%] md:w-1/2 p-2 bg-light dark:bg-dark border-standard border-dark dark:border-light"
                    type="password"
                    value={authStore.credentials.password}
                    onChange={(e) => authStore.setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="****************"
                />
                <div className="w-full my-auto justify-center items-center flex">
                    <p className="h-10 flex text-center">{authStore.error}</p>
                    {authStore.isLoading && <Loading />}
                </div>

                <div className="flex w-full justify-center items-center my-auto">
                    <button
                        className="w-[40%] md:w-1/4 p-2 dark:bg-dark border-standard border-dark dark:border-light hover:dark:bg-light hover:bg-dark hover:text-light hover:dark:text-dark text-center duration-100"
                        type="submit"
                    >
                        login
                    </button>
                    <Link
                        onClick={() => authStore.resetError()}
                        className="w-[40%] md:w-1/4 p-2 dark:bg-dark border-standard border-dark dark:border-light hover:dark:bg-light hover:bg-dark hover:text-light hover:dark:text-dark text-center duration-100"
                        href={'/auth/registration'}
                    >
                        registration
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default observer(page);
