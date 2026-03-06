import { getTranslations } from 'next-intl/server';
import HeroTitle from './HeroTitle'

async function Section1() {
    const t = await getTranslations('Home');
    return (
        <div className='h-80 md:h-96 lg:h-[90vh] relative bg-[url("/hero.png")] bg-no-repeat bg-cover bg-center'>
            <div className='h-full bg-black/80 z-50'>
                <div className='container flex flex-row w-full items-center h-full justify-center'>
                    <HeroTitle line1={t("section1.title.line1")} />
                </div>
            </div>
        </div>
    )
}

export default Section1