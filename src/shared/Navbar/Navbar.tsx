import logo from "../../../public/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { FaRegUser } from "react-icons/fa"
import SmNavSheet from "./SmNavsheet"

export const navitems = [
    {
        id: 1,
        rout: "/",
        label: "Home"
    },
    {
        id: 2,
        rout: "/#services",
        label: "Services"
    },
    {
        id: 3,
        rout: "/about",
        label: "About Us"
    },
]

function Navbar() {
    return (
        <div className='bg-white shadow-md sticky top-0 z-50'>
            <div className='container'>
                <div className=' flex flex-row justify-between items-center gap-x-5 py-4'>
                    <Link href={"/"}>
                        <Image src={logo} alt='logo' className='h-12 w-auto object-cover' /></Link>
                    <div className="flex flex-row gap-x-5 items-center">

                        <ul className='flex-row gap-x-5 lg:gap-x-8 xl:gap-x-10 items-center hidden lg:flex'>
                            {navitems?.map(i => {
                                return <li key={i?.id} className='font-popin text-lg text-gray-800 font-normal'>
                                    <Link href={i?.rout}>
                                        {i?.label}
                                    </Link>
                                </li>
                            })}
                        </ul>

                        <button>
                            <FaRegUser className="text-xl text-gray-800" />
                        </button>

                        <button className="group relative inline-flex py-2 text-lg items-center justify-center overflow-hidden rounded-full bg-primary px-6 font-normal text-white transition hover:scale-105 cursor-pointer">
                            <span>+ Post Your Add</span>
                            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                                <div className="relative h-full w-8 bg-white/20"></div>
                            </div>
                        </button>

                        <section className='lg:hidden'>
                            <SmNavSheet />
                        </section>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar