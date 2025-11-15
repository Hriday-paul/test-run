import ShopBanner from '@/shared/ShopBanner'
import React from 'react'
import bannerimg from "../../../public/post-top-bg.jpg"
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

function CarBuySell() {
  return (
    <div>
      <ShopBanner
        image={bannerimg}
        title="Find Your Perfect Car"
        desc="Search and find your best car for buy"
      >
        <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Car Buy/Sell
      </ShopBanner>
      <div className='grid grid-cols-4 gap-5 bg-[#F2F4F8]'>
        <div className='col-span-1'>

        </div>
        <div className='col-span-3'>

        </div>
      </div>
    </div>
  )
}

export default CarBuySell