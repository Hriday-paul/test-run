import ForgotPassForm from '@/components/Auth/ForgotPassForm'
import Pagetop from '@/shared/Pagetop'
import Link from 'next/link'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

function Forgot() {
    return (
        <div>
            <Pagetop title='Forgot Password'>
                <h3 className="text-xs md:text-sm font-figtree text-gray-500 flex flex-row gap-x-1.5 justify-center items-center">
                    <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> forgot password
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 mb-10'>
                <ForgotPassForm />
            </div>
        </div>
    )
}

export default Forgot