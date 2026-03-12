import VerifyOtpForm from '@/components/Auth/VerifyOtpForm'
import { Link } from '@/i18n/navigation'
import Pagetop from '@/shared/Pagetop'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { IoIosArrowForward } from 'react-icons/io'

export const metadata: Metadata = {
    title: "Verify Otp",
    description: "Runbd Verify Otp Page",
    metadataBase: new URL('https://runbd.org'),
    alternates: {
        canonical: '/auth/verify-otp',
        languages: {
            en: `/auth/verify-otp`,
            bn: `/bn/auth/verify-otp`,
            'x-default': `/auth/verify-otp`
        }
    },
}

async function VerifyOtp() {
    const t = await getTranslations("verify_otp")
    return (
        <div>
            <Pagetop title={t("title")}>
                <h3 className="text-xs md:text-sm font-figtree text-gray-100 flex flex-row gap-x-1.5 justify-center items-center">
                    <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link> <IoIosArrowForward className='' /> {t("bread_cump.verify")}
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 my-10'>
                <VerifyOtpForm />
            </div>
        </div>
    )
}

export default VerifyOtp