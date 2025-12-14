
import ShopBanner from "@/shared/ShopBanner";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import bannerimg from "../../../public/contact_banner.png"

 function ContctPage() {

    return (
        <section>
            {/* Hero Section */}
            <ShopBanner
                image={bannerimg}
                title="Contact"
                desc=""
            >
                <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Contact
            </ShopBanner>

            
        </section>
    );
}

export default ContctPage