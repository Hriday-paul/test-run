"use client"
// import Link from 'next/link'
import { FaRegUser } from "react-icons/fa"
import SmNavSheet from "./SmNavsheet"
import logo from "../../../public/logo.png"
import Image from 'next/image'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { ChevronDown } from 'lucide-react'
import { categories } from '@/components/Home/Section2/Section2'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from "@/i18n/navigation"

export const navitems = [
    // {
    //     id: 1,
    //     rout: "/",
    //     label: "Home"
    // },
    // {
    //     id: 2,
    //     rout: "/#services",
    //     label: "Services"
    // },
    {
        id: 3,
        rout: "/#pricing",
        label: "pricing"
    },
    {
        id: 4,
        rout: "/about",
        label: "about"
    },
]

function Navbar() {
    const t = useTranslations("navbar");
    const tc = useTranslations('Home.section2');
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();

    const handlePostAdd = () => {
        router.push(`/vendor/post-ad`);
    }
    const handleMoveProfile = () => {
        router.push(`/profile`);
    }

    const handleSwitchLocal = () => {
        const newLocale = locale == "en" ? "bn" : "en";
        router.push(pathname, { locale: newLocale });
        // router.refresh();
    }

    return (
        <div>
            {/* --------------section 1-------------- */}
            {/* <div className='bg-[#fffefe]'>
                <div className='container flex flex-col gap-y-2 md:gap-y-0 md:flex-row md:justify-between items-center py-3 md:py-4 font-figtree text-sm justify-center'>
                    <div>
                        <p className='text-black'><span className='text-neutral-600'>Hello!!</span> Welcome to Runbd.</p>
                    </div>
                    
                </div>
            </div> */}

            <div className='bg-white shadow-md sticky top-0 z-50 border-y border-zinc-100 left-0'>
                <div className='container'>
                    <div className=' flex flex-row justify-between items-center gap-x-5 py-4'>
                        <Link href={"/"}>
                            <Image src={logo} alt='logo' className='h-7 md:h-10 xl:h-12 w-auto object-cover' />
                        </Link>

                        <ul className='lg:flex flex-row gap-x-5 lg:gap-x-8 items-center hidden'>

                            <li className='font-popin text-base text-gray-800 font-normal hover:text-primary duration-200'>
                                <Link href={"/"}>
                                    {t("home")}
                                </Link>
                            </li>

                            <Menubar className="border-none shadow-none bg-transparent">
                                <MenubarMenu>
                                    <MenubarTrigger className="font-popin text-base text-gray-800 font-normal">
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
                                                        <MenubarItem className="cursor-pointer rounded-none py-3 px-4 w-60">
                                                            <div className='flex flex-row gap-x-2 items-center'>
                                                                <Image src={category?.icon} alt="runbd category icon" className="h-3 w-auto mx-auto" />
                                                                <p className='font-popin'>{tc(category.name)}</p>
                                                            </div>
                                                        </MenubarItem>
                                                    </Link>
                                                    <hr />
                                                </div>
                                            ),
                                        )}
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>

                            {navitems?.map(i => {
                                return <li key={i?.id} className='font-popin text-base text-gray-800 font-normal hover:text-primary duration-200'>
                                    <Link href={i?.rout}>
                                        {t(i?.label)}
                                    </Link>
                                </li>
                            })}

                            <li className=''>
                                <button onClick={handleSwitchLocal} className=" border border-primary/40 rounded px-2 py-1 font-popin text-xs">
                                    {locale == "en" ? "বাংলা" : "English"}
                                </button>
                            </li>

                        </ul>

                        <div className="flex flex-row gap-x-2.5 md:gap-x-4 lg:gap-x-5 items-center">

                            <button onClick={handlePostAdd} className="group relative inline-flex py-2 text-sm md:text-base lg:text-lg items-center justify-center rounded-full bg-primary px-3 px-5 lg:px-6 font-normal text-white transition hover:scale-105 cursor-pointer font-popin overflow-hidden">
                                <span>+ {t("btn")}</span>
                                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                                    <div className="relative h-full w-8 bg-white/20"></div>
                                </div>
                            </button>


                            <button onClick={handleMoveProfile} className='cursor-pointer bg-slate-50 border border-stroke rounded-full p-2.5'>
                                <FaRegUser className="text-lg md:text-xl text-gray-800" />
                            </button>

                            <section className='lg:hidden'>
                                <SmNavSheet />
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar