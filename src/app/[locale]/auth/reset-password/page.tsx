import ResetPassword from '@/components/Auth/ResetPassword'
import Pagetop from '@/shared/Pagetop'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

function Resetpass() {
    return (
        <div>
            <Pagetop title='Reset Password'>
                <h3 className="text-xs md:text-sm font-figtree text-gray-500 flex flex-row gap-x-1.5 justify-center items-center">
                    <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> rest password
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 mb-10'>
                <ResetPassword />
            </div>
        </div>
    )
}

export default Resetpass