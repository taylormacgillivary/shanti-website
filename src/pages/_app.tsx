import type { AppProps } from 'next/app';
import { RootLayoutClient } from '@/app/client-layout';
import '@/app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayoutClient>
      <Component {...pageProps} />
    </RootLayoutClient>
  );
}

export default MyApp; 