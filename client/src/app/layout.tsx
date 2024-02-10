import type { Metadata } from 'next';
import { Pixelify_Sans } from 'next/font/google';
import './globals.css';
import Provider from '../components/Theme/Provider';
import Container from '@/components/Container/Container';
import Navbar from '@/components/NavbarComponents/Navbar/Navbar';
import React, { Suspense } from 'react';

const pixel = Pixelify_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'ChatApp',
    description: 'app for chating with friends in pixel style',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className={pixel.className} suppressHydrationWarning={true}>
                <Provider>
                    <Container>{children}</Container>
                </Provider>
            </body>
        </html>
    );
};

export default RootLayout;
