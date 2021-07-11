// noinspection JSUnusedGlobalSymbols

import "normalize.css";
import "tailwindcss/tailwind.css";
import Head from "next/head";


export default function MyApp({ Component, pageProps }) {

    // noinspection HtmlUnknownTarget
    return (

        <div>

            <Head>
                <title>SalesLoft Client</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <Component { ...pageProps } />
            </main>

        </div>

    )

}
