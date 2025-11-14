import LoginForm from '@/components/Auth/LoginForm'
import Pagetop from '@/shared/Pagetop'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

function LoginPage() {
    return (
        <div>
            <Pagetop title='Login'>
                <h3 className="text-xs md:text-sm font-figtree text-gray-500 flex flex-row gap-x-1.5 justify-center items-center">
                    <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Login
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 mb-10'>
                <LoginForm />
            </div>

        </div>
    )
}

export default LoginPage