import LoginForm from '@/components/Auth/LoginForm'
import Pagetop from '@/shared/Pagetop'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

export const metadata: Metadata = {
    title: "Login",
    description: "Runbd login Page",
}

async function LoginPage() {
    const t = await getTranslations("login");
    return (
        <div>
            <Pagetop title={t("title")}>
                <h3 className="text-xs md:text-sm font-figtree text-gray-100 flex flex-row gap-x-1.5 justify-center items-center">
                    <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link> <IoIosArrowForward className='' /> {t("bread_cump.login")}
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 my-10'>
                <LoginForm />
            </div>

        </div>
    )
}

export default LoginPage