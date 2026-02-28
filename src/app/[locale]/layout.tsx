import Navbar from "@/shared/Navbar/Navbar";
import Footer from "@/shared/Footer/Footer";
import ReduxProvider from "@/shared/ReduxProvider";
import { Toaster } from 'sonner';
import NextJsTopLoader from "@/shared/NextJsTopLoader";
import TawkTo from "@/utils/TawkTo";
import { NextIntlClientProvider } from 'next-intl';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReduxProvider>
            <TawkTo />
            <Toaster richColors position="top-right" closeButton />
            <NextJsTopLoader />
            <NextIntlClientProvider>
                <Navbar />
                <div className="">
                    {children}
                </div>
                <Footer />
            </NextIntlClientProvider>
        </ReduxProvider>
    );
}
