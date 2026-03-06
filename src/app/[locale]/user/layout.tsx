import Sidebar from '@/shared/Dashboard/Sidebar';
import SmTopBar from '@/shared/Dashboard/SmTopBar';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';
import { SlBadge } from "react-icons/sl";

export const metadata: Metadata = {
    title: "Profile",
    description: "Runbd User Profile",
    robots: {
        index: false,
        follow: false,
        nocache: false,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    }
}

const Layout = async({ children }: { children: React.ReactNode }) => {
    const t = await getTranslations('sidebar')
    const routs: { id: number, name: string, rout: string, icon: React.ReactNode }[] = [
        {
            id: 1,
            name: t("dashboard"),
            icon: <MdDashboard className='text-lg' />,
            rout: '/user'
        },
        {
            id: 3,
            name: t("orders"),
            icon: <SlBadge className='text-lg' />,
            rout: '/user/service-orders'
        },
        {
            id: 5,
            name: t("setting"),
            icon: <IoSettingsOutline className='text-lg' />,
            rout: '/user/settings'
        }]
    return (
        <div className='bg-[#F8FAFC] min-h-[80vh]'>
            <div className="container py-4 md:py-8">
                <div className='grid grid-cols-1 lg:grid-cols-8 gap-x-5'>
                    <div className='hidden lg:block lg:col-span-2'>
                        <Sidebar routs={routs} title={t("title")} logoutTxt={t("logout")} />
                    </div>
                    <div className='lg:hidden'>
                        <SmTopBar routs={routs} logoutTxt={"Logout"} />
                    </div>
                    <div className='col-span-1 lg:col-span-6'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;