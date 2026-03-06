import ForgotPassForm from '@/components/Auth/ForgotPassForm'
import Pagetop from '@/shared/Pagetop'
import { getTranslations } from 'next-intl/server';
import {Link} from '@/i18n/navigation'

import { IoIosArrowForward } from 'react-icons/io'

async function Forgot() {
     const t = await getTranslations("forgot_pass");
    return (
        <div>
            <Pagetop title={t("title")}>
                <h3 className="text-xs md:text-sm font-figtree text-gray-100 flex flex-row gap-x-1.5 justify-center items-center">
                    <Link href='/' className='text-primary'>{t("bread_cump.home")}</Link> <IoIosArrowForward className='' /> {t("bread_cump.forgot")}
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 my-10'>
                <ForgotPassForm />
            </div>
        </div>
    )
}

export default Forgot