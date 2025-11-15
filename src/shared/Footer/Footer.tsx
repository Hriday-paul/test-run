"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import logo from "../../../public/logo.png"
import qr_code from "../../../public/QR_CODE.svg"
import google_play from "../../../public/google_play.png"
import apple_store from "../../../public/Apple_Store.webp"

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white w-full">
            <div className="container px-6 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

                {/* Logo & About */}
                <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                    <Link href={"/"}>
                        {/* <Image src={logo} alt='logo' className='h-12 w-auto object-cover mb-10' /> */}
                        Logo
                    </Link>
                    <p className="text-gray-300 text-sm font-figtree">
                        Skip the hassle and delays — easily buy, sell, or access essential services anytime from one reliable and secure platform.
                    </p>
                    <div className="flex gap-4 mt-5">
                        <a href="#" className="hover:text-primary transition"><FaFacebookF /></a>
                        <a href="#" className="hover:text-primary transition"><FaTwitter /></a>
                        <a href="#" className="hover:text-primary transition"><FaInstagram /></a>
                        <a href="#" className="hover:text-primary transition"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4 font-figtree">
                    <h3 className="font-semibold text-lg">Quick Links</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li><Link href="#" className="hover:text-primary transition">Home</Link></li>
                        <li><Link href="#" className="hover:text-primary transition">All Ads</Link></li>
                        <li><Link href="#" className="hover:text-primary transition">About Us</Link></li>
                    </ul>
                </div>

                {/* Pages */}
                <div className="space-y-4 font-figtree">
                    <h3 className="font-semibold text-lg">Pages</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li><Link href="#" className="hover:text-primary transition">Contact Us</Link></li>
                        <li><Link href="#" className="hover:text-primary transition">FAQ</Link></li>
                        <li><Link href="#" className="hover:text-primary transition">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-primary transition">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 font-figtree">
                    <h3 className="font-semibold text-lg">Contact Info</h3>
                    <div className="text-gray-300 text-sm space-y-2">
                        <p className="flex items-center gap-2"><FaLocationDot /> Nikunja-2, Dhaka-1229</p>
                        <p className="flex items-center gap-2"><FaPhone /> 01336-832636</p>
                        <p className="flex items-center gap-2"><IoIosMail /> runbdorg24@gmail.com</p>
                    </div>
                </div>

                {/* Download App */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg font-figtree">Download App</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                        <div className="w-24 h-24 relative bg-white shrink-0">
                            <Image src={qr_code} alt="QR Code" fill className="object-contain" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link href="#">
                                <Image src={google_play} alt="Google Play" width={500} height={200} className="object-contain h-full w-auto" />
                            </Link>
                            <Link href="#">
                                <Image src={apple_store} alt="App Store" width={500} height={200} className="object-contain h-full w-auto" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


            <div className="text-center text-gray-400 text-sm py-5">
                © {new Date().getFullYear()} RunBD. All rights reserved.
            </div>
        </footer>
    );
}
