import "../styles/global.css";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import "../styles/global.css";

import Script from "next/script";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    const router = useRouter();

    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
