import Head from 'next/head';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@uikit/theme-provider';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Head>
        <title>PermitFlow Assessment App - Kevin Wong</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen p-8">{children}</main>
    </ThemeProvider>
  );
};
