import VerifyOtpForm from '@/components/Auth/VerifyOtpForm'
import Pagetop from '@/shared/Pagetop'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

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