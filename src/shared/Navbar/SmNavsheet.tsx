"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Link } from '@/i18n/navigation';;
import { RiMenu3Fill } from 'react-icons/ri';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { navitems } from './Navbar';
import Image from 'next/image';
import logo from "../../../public/logo.png"
import { useTranslations } from "next-intl";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { ChevronDown } from "lucide-react";
import { categories } from "@/components/Home/Section2/Section2";


const SmNavSheet = () => {
    const tc = useTranslations('Home.section2');
    const t = useTranslations("navbar");

    const routes = navitems;

    return (
        <div>
            <Sheet>
                <SheetTrigger className='border border-zinc-200 p-1 md:p-1.5 rounded cursor-pointer hover:bg-zinc-100 duration-150'>
                    <RiMenu3Fill className="text-xl md:text-2xl text-black" />
                </SheetTrigger>
                <SheetContent side={'right'}>
                    <SheetHeader>
                        <SheetTitle></SheetTitle>
                        <SheetDescription />

                        <div className=''>

                            <SheetTrigger>
                                <Link href={"/"}>
                                    <Image src={logo} alt='logo' className='h-12 w-auto object-cover' />
                                </Link>
                            </SheetTrigger>

                            <ul className="my-3">
                                <li className='font-popin text-base text-gray-800 font-normal hover:text-primary duration-200'>
                                    <Link href={"/"} className="border-b border-b-stroke py-4 font-figtree text-sm text-black flex flex-row gap-x-1 items-center group duration-300 cursor-pointer">
                                        <SheetTrigger className="w-full flex flex-row gap-x-1 items-center cursor-pointer">
                                            <p className="text-black text-xl font-figtree">{t("home")}</p>
                                            <FaArrowLeftLong className="text-black block rotate-180 ml-1 group-hover:ml-2.5 duration-200" />
                                        </SheetTrigger>
                                    </Link>
                                </li>

                                {
                                    routes?.map(item => {
                                        return <li
                                            key={item?.id} className='text-base relative group my-2'>
                                            <Link href={item?.rout} className="border-b border-b-stroke py-4 font-figtree text-sm text-black flex flex-row gap-x-1 items-center group duration-300 cursor-pointer">
                                                <SheetTrigger className="w-full flex flex-row gap-x-1 items-center cursor-pointer">
                                                    <p className="text-black text-xl font-figtree">{t(item?.label)}</p>
                                                    <FaArrowLeftLong className="text-black block rotate-180 ml-1 group-hover:ml-2.5 duration-200" />
                                                </SheetTrigger>
                                            </Link>
                                        </li>
                                    })
                                }

                                <li className="pt-2">
                                    <Menubar className="border-none shadow-none bg-transparent">
                                        <MenubarMenu>
                                            <MenubarTrigger className="font-normal text-black text-xl font-figtree">
                                                {t("categories")}
                                                <ChevronDown className="ml-2" size={20} />
                                            </MenubarTrigger>
                                            <MenubarContent className='p-0 rounded'>
                                                {categories?.map(
                                                    (category, idx: number) => (
                                                        <div key={idx}>
                                                            <Link
                                                                href={category?.rout}
                                                                className='cursor-pointer'
                                                            >
                                                                <SheetTrigger>
                                                                    <MenubarItem className="cursor-pointer rounded-none py-3 px-4 w-60">
                                                                        <div className='flex flex-row gap-x-2 items-center'>
                                                                            <Image src={category?.icon} alt="runbd category icon" className="h-3 w-auto mx-auto" />
                                                                            <p className='font-popin'>{tc(category.name)}</p>
                                                                        </div>
                                                                    </MenubarItem>
                                                                </SheetTrigger>
                                                            </Link>
                                                            <hr />
                                                        </div>
                                                    ),
                                                )}
                                            </MenubarContent>
                                        </MenubarMenu>
                                    </Menubar>
                                </li>

                            </ul>

                        </div>

                    </SheetHeader>
                </SheetContent>
            </Sheet>

        </div>
    );
};


export default SmNavSheet;