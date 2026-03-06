import ResetPassword from '@/components/Auth/ResetPassword'
import Pagetop from '@/shared/Pagetop'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

async function Resetpass() {
    const t = await getTranslations("reset_pass")
    return (
        <div>
            <Pagetop title={t("title")}>
                <h3 className="text-xs md:text-sm font-figtree text-gray-100 flex flex-row gap-x-1.5 justify-center items-center">
                    <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link> <IoIosArrowForward className='' /> <Link href='/auth/forgot-password' className='text-primary'>{t("bread_cump.forgot")}</Link> <IoIosArrowForward className='' /> {t("bread_cump.reset")}
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 my-10'>
                <ResetPassword />
            </div>
        </div>
    )
}

export default Resetpass