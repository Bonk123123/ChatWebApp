'use client';

import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';

type props = {
    children: string | React.ReactNode | React.ReactNode[];
};

const Provider: React.FC<props> = ({ children }) => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeProvider enableSystem={true} attribute="class">
            {children}
        </ThemeProvider>
    );
};

export default Provider;
