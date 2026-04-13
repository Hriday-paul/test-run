import Navbar from "@/shared/Navbar/Navbar";
import Footer from "@/shared/Footer/Footer";
import ReduxProvider from "@/shared/ReduxProvider";
import { Toaster } from 'sonner';
import NextJsTopLoader from "@/shared/NextJsTopLoader";
import TawkTo from "@/utils/TawkTo";

import { ToastContainer } from 'react-toastify';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReduxProvider>
            <TawkTo />
            <Toaster richColors position="top-right" closeButton />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <NextJsTopLoader />
            
                <Navbar />
                {children}
                <Footer />
            
        </ReduxProvider>
    );
}
