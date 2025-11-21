"use client"
import React, { useCallback } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/dashboardCarousel"
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { removeUser } from '@/redux/slices/userSlice';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const SmTopBar = ({ routs, logoutTxt }: { routs: { id: number, name: string, rout: string, icon: React.ReactNode }[], logoutTxt : string }) => {
    const activeRout = usePathname();
    const navig = useRouter();
    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = useCallback(() => {
        dispatch(removeUser())
        navig.push(`/auth/login?next=${activeRout}`)
    }, [dispatch, activeRout, navig]);

    return (
        <div>
            <Carousel
                className="w-full"
            >
                <CarouselContent className="-ml-3 lg:-ml-5  flex flex-row justify-between gap-x-5 p-4 pt-0">

                    {
                        routs?.map(rout => {
                            return <CarouselItem key={rout?.id} className="basis-1/4 md:basis-1/6 lg:basis-1/6 pl-3 lg:pl-5">
                                <Link href={rout?.rout}>
                                    <section className={`flex flex-col justify-center gap-y-1 pb-1 ${rout?.rout == activeRout ? "border-b-2 border-b-strokedark " : ''}`}>
                                        <span className={`mx-auto ${rout?.rout == activeRout ? "text-primary" : 'text-zinc-600'}`}>{rout?.icon}</span>
                                        <p className={`text-center font-poppins text-sm font-medium ${rout?.rout == activeRout ? "text-primary" : 'text-zinc-600'}`}>{rout?.name}</p>
                                    </section>
                                </Link>
                            </CarouselItem>
                        })
                    }
                    <CarouselItem className="basis-1/6">
                        <section onClick={handleLogout} className={`flex flex-col justify-center gap-y-1 pb-1`}>
                            <span className={`mx-auto text-zinc-600`}><IoLogOutOutline className='text-lg' /></span>
                            <p className={`text-center font-poppins text-sm font-medium text-zinc-600`}>{logoutTxt}</p>
                        </section>
                    </CarouselItem>

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    );
};

export default SmTopBar;