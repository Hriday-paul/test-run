import SignUpForm from '@/components/Auth/SignUpForm'
import Pagetop from '@/shared/Pagetop'
import { Metadata } from 'next'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

export const metadata: Metadata = {
    title: "Signup",
    description: "Runbd signup Page",
}

function SignUp() {
    return (
        <div>
            <Pagetop title='Sign Up'>
                <h3 className="text-xs md:text-sm font-figtree text-gray-500 flex flex-row gap-x-1.5 justify-center items-center">
                    <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Sign Up
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 mb-10'>
                <SignUpForm />
            </div>

        </div>
    )
}

export default SignUp