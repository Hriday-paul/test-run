import Sidebar from '@/shared/Dashboard/Sidebar';
import SmTopBar from '@/shared/Dashboard/SmTopBar';
import React from 'react';
import { IoCarOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdDashboard, MdFavoriteBorder } from 'react-icons/md';
import { SlBadge } from "react-icons/sl";

const Layout = ({ children }: { children: React.ReactNode }) => {
    // const t = useTranslations('dashboard.sidebar')
    const routs: { id: number, name: string, rout: string, icon: React.ReactNode }[] = [
        {
            id: 1,
            name: "Dashboard",
            icon: <MdDashboard className='text-lg' />,
            rout: '/user'
        },
        {
            id: 3,
            name: "Service Orders",
            icon: <SlBadge className='text-lg' />,
            rout: '/user/service-orders'
        },
        {
            id: 5,
            name:"Setting",
            icon: <IoSettingsOutline className='text-lg' />,
            rout: '/user/settings'
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