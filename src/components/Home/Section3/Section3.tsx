import FeatureAds from './FeatureAds'
import GetFeatureAds from '@/lib/services/FeatureAdds';
import { Suspense } from 'react';
import { LoadingCard } from '@/shared/LoadingCard';
import { Add } from '@/redux/types';
import Title from '../Section2/Title';
import { getTranslations } from 'next-intl/server';

async function Section3() {
    const featureadd = GetFeatureAds();
    const t = await getTranslations('Home.section3');
    return (
        <div className="pt-12 md:pt-16 lg:pt-20">
            <div className="bg-[#F5F7FA]">

                <div className='container py-16'>

                    <Title subtitle={t("subtitle")} title={t("title")} />

                    <Suspense fallback={
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>

                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />

                        </div>
                    }>
                        <FeatureAddList featureAddPromise={featureadd} />
                    </Suspense>


                </div>

            </div>
        </div>
    )
}

export default Section3;

const FeatureAddList = async ({ featureAddPromise }: { featureAddPromise: Promise<{ data: { ad: Add, id: number }[] }> }) => {

    const data = await featureAddPromise;

    return (
        <FeatureAds data={data} />
    )

}