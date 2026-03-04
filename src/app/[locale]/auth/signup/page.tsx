import SignUpForm from '@/components/Auth/SignUpForm'
import Pagetop from '@/shared/Pagetop'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

export const metadata: Metadata = {
    title: "Signup",
    description: "Runbd signup Page",
}

async function SignUp() {
    const t = await getTranslations("signup");
    return (
        <div>
            <Pagetop title={t("title")}>
                <h3 className="text-xs md:text-sm font-figtree text-gray-500 flex flex-row gap-x-1.5 justify-center items-center">
                    <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link> <IoIosArrowForward className='' /> {t("bread_cump.signup")}
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 my-10'>
                <SignUpForm />
            </div>

        </div>
    )
}

export default SignUp