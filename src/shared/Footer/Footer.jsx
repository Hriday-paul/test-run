"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white w-full">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

                {/* Logo & About */}
                <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                    <div className="w-[150px] h-12 relative">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <p className="text-gray-300 text-sm">
                        We provide reliable and affordable cars to make your journey smooth and hassle-free. We've
                        got the perfect ride for you.
                    </p>
                    <div className="flex gap-4 mt-2">
                        <a href="#" className="hover:text-primary transition"><FaFacebookF /></a>
                        <a href="#" className="hover:text-primary transition"><FaTwitter /></a>
                        <a href="#" className="hover:text-primary transition"><FaInstagram /></a>
                        <a href="#" className="hover:text-primary transition"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Quick Links</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li><Link href="#" className="hover:text-primary transition">Home</Link></li>
                        <li><Link href="#" className="hover:text-primary transition">All Ads</Link></li>
                        <li><Link href="#" className="hover:text-primary transition">About Us</Link></li>
                    </ul>
                </div>

                {/* Pages */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Pages</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li><Link href="#" className="hover:text-primary transition">Contact Us</Link></li>
                        <li><Link href="#" className="hover:text-primary transition">FAQ</Link></li>
                        <li><Link href="#" className="hover:text-primary transition">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-primary transition">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Contact Info</h3>
                    <div className="text-gray-300 text-sm space-y-2">
                        <p className="flex items-center gap-2"><FaLocationDot /> Nikunja-2, Dhaka-1229</p>
                        <p className="flex items-center gap-2"><FaPhone /> 01336-832636</p>
                        <p className="flex items-center gap-2"><IoIosMail /> runbdorg24@gmail.com</p>
                    </div>
                </div>

                {/* Download App */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Download App</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                        <div className="w-24 h-24 relative bg-white shrink-0">
                            <Image src="/QR_CODE.svg" alt="QR Code" fill className="object-contain" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <a href="#" className="inline-block">
                                <Image src="/google_play.png" alt="Google Play" width={120} height={40} className="object-contain" />
                            </a>
                            <a href="#" className="inline-block">
                                <Image src="/Apple_Store.webp" alt="App Store" width={120} height={40} className="object-contain" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Separator/>

            <div className="text-center text-gray-400 text-sm py-5">
                © 2025 RunBD. All rights reserved.
            </div>
        </footer>
    );
}
