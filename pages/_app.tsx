import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/globals.css';
import Head from 'next/head';
const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <Head>
        <title>爱生活-爱上美好生活</title>
      </Head>
      <div className="bg-[url(../utils/bg.webp)] bg-no-repeat bg-cover ">
        <div className="xl:w-[1200px] h-[100vh] flex flex-row m-auto bg-[#0000008D] backdrop-blur-md">
          <div className="h-[100vh]">
            <Sidebar />
          </div>
          <div className="flex-1">
            <Navbar />
            <div className="mt-4 flex flex-col  gap-10 overflow-auto h-[88vh] videos flex-1">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
