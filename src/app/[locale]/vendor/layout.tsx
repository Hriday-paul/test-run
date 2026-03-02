import Sidebar from '@/shared/Dashboard/Sidebar';
import SmTopBar from '@/shared/Dashboard/SmTopBar';
import { Metadata } from 'next';
import React from 'react';
import { IoCarOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';
import { SlBadge } from "react-icons/sl";

export const metadata: Metadata = {
    title: "Profile",
    description: "Runbd Vendor Profile",
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

const Layout = ({ children }: { children: React.ReactNode }) => {
    // const t = useTranslations('dashboard.sidebar')
    const routs: { id: number, name: string, rout: string, icon: React.ReactNode }[] = [
        {
            id: 1,
            name: "Dashboard",
            icon: <MdDashboard className='text-lg' />,
            rout: '/vendor'
        },
        {
            id: 2,
            name: "Ads",
            icon: <IoCarOutline className='text-lg' />,
            rout: '/vendor/ads'
        },
        {
            id: 3,
            name: "Service Orders",
            icon: <SlBadge className='text-lg' />,
            rout: '/vendor/service-orders'
        },
        {
            id: 5,
            name:"Setting",
            icon: <IoSettingsOutline className='text-lg' />,
            rout: '/vendor/settings'
        }]
    return (
        <div className='bg-[#F8FAFC] min-h-[80vh]'>
            <div className="container py-4 md:py-8">
                <div className='grid grid-cols-1 lg:grid-cols-8 gap-x-5'>
                    <div className='hidden lg:block lg:col-span-2'>
                        <Sidebar routs={routs} title={"Dashboard"} logoutTxt={"Logout"}/>
                    </div>
                    <div className='lg:hidden'>
                        <SmTopBar routs={routs} logoutTxt={"Logout"}/>
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