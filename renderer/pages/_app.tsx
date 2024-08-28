import "../styles/globals.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from "jotai";
import { NextIntlClientProvider } from "next-intl";
import "react-tooltip/dist/react-tooltip.css";
import { Toaster } from "@/components/ui/toaster";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Upscayl</title>
      </Head>
      <Provider>
        <NextIntlClientProvider
          locale={router.locale}
          messages={pageProps.messages}
          timeZone="Etc/GMT"
        >
          <Component {...pageProps} data-theme="upscayl" />
        </NextIntlClientProvider>
        <Toaster />
      </Provider>
    </>
  );
};

export default MyApp;
