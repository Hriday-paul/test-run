'use client'
import { removeUser } from '@/redux/slices/userSlice';
import { AppDispatch } from '@/redux/store';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';


const Sidebar = ({ routs, title, logoutTxt }: { routs: { id: number, name: string, rout: string, icon: React.ReactNode }[], title: string, logoutTxt: string }) => {
    const activeRout = usePathname();
    const navig = useRouter();

    const dispatch = useDispatch<AppDispatch>()
    const handleLogout = useCallback(() => {
        dispatch(removeUser())
        navig.push(`/auth/login?next=${activeRout}`)
    }, [dispatch, activeRout, navig])

    return (
        <div className='w-full bg-white border-stroke shadow-2'>
            <p className='text-lg font-popin font-medium text-primary px-4 py-3'>{title}</p>
            <ul className='border-t border-t-stroke pb-2 space-y-1'>
                {
                    routs?.map(rout => {
                        return <li key={rout?.id} className={`px-5 relative hover:bg-[#E9E9E9] duration-200 ${rout?.rout == activeRout ? "bg-[#E9E9E9]" : ''}`}>
                            <Link href={rout?.rout} className='flex flex-row gap-x-2 items-center py-3'>
                                <span className={rout?.rout !== activeRout ? "text-zinc-600" : "text-black"}>{rout?.icon}</span>
                                <p className={`font-popin text-base ${rout?.rout !== activeRout ? "text-zinc-600" : "text-black"}`}>{rout?.name}</p>
                                {rout?.rout == activeRout && <span className='absolute top-0 left-0 h-full w-full border-l-4 border-l-primary'></span>}
                            </Link>
                        </li>
                    })
                }
                {/* //default logout------------------- */}
                <li onClick={handleLogout} className={`px-5 relative hover:bg-[#E9E9E9] duration-200 cursor-pointer`}>
                    <section className='flex flex-row gap-x-2 items-center py-3'>
                        <span className={"text-zinc-600"}><IoLogOutOutline className='text-lg' /></span>
                        <p className={`font-popin text-base text-zinc-600`}>{logoutTxt}</p>
                    </section>
                </li>

            </ul>
        </div>
    );
};

export default Sidebar;