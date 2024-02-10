'use client';

import { useTheme } from 'next-themes';
import { SunIcon } from '@heroicons/react/24/outline';
import { MoonIcon } from '@heroicons/react/24/solid';

const ThemeSwitcher = () => {
    const { systemTheme, theme, setTheme } = useTheme();

    const renderThemeChanger = () => {
        const currentTheme = theme === 'system' ? systemTheme : theme;

        if (currentTheme === 'dark') {
            return (
                <span className="flex justify-center items-center w-8 h-8 rounded-full hover:text-dark hover:bg-light duration-100">
                    <SunIcon
                        className="w-6 h-6"
                        role="button"
                        onClick={() => setTheme('light')}
                    />
                </span>
            );
        } else {
            return (
                <span className="flex justify-center items-center w-8 h-8 rounded-full hover:text-light hover:bg-dark duration-100">
                    <MoonIcon
                        className="w-6 h-6"
                        role="button"
                        onClick={() => setTheme('dark')}
                    />
                </span>
            );
        }
    };

    return <>{renderThemeChanger()}</>;
};

export default ThemeSwitcher;
