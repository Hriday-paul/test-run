import CarSellForm from '@/components/AddPost/CarSellForm'
import Pagetop from '@/shared/Pagetop'
import Link from 'next/link'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

function CarSell() {
    return (
        <div>
            <Pagetop title='Car Sell'>
                <h3 className="text-xs md:text-sm font-figtree text-gray-500 flex flex-row gap-x-1.5 justify-center items-center">
                    <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Car Sell
                </h3>
            </Pagetop>
            <div className='bg-[#F2F4F8]'>
                <div className='container'>
                    <div className='bg-white max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto rounded-xl p-5 md:p-8 lg:p-10 xl:p-14'>
                        <CarSellForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarSell