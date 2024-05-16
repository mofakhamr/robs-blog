'use client'

import React from 'react';
import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { AppProps } from 'next/app';

// unused props not linting: { Component, pageProps }: AppProps
const GoogleAnalytics = () => {

    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const url = searchParams.toString() ? `${pathname}?${searchParams}` : pathname;
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID as string, {
            page_path: url,
        });

    }, [pathname, searchParams]);

    return (
        <>
        </>
    );
};

export default GoogleAnalytics;

