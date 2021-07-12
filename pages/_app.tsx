// noinspection JSUnusedGlobalSymbols

import "normalize.css";
import "tailwindcss/tailwind.css";
import { RecoilRoot } from "recoil";


export default function MyApp({ Component, pageProps }) {

    // noinspection HtmlUnknownTarget
    return (

        <RecoilRoot>

            <div>

                <main>
                    <Component { ...pageProps } />
                </main>

            </div>

        </RecoilRoot>

    )

}
