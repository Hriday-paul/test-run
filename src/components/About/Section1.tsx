import carImg from "../../../public/about/car1.png"
import manImg from "../../../public/about/mans.png"
import Image from 'next/image'
import { Info, Monitor, Search } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

async function Section1() {
    const t = await getTranslations('about.section1');

    return (
        <div className='bg-red-50/10'>
            <div className='container'>
                <section className="py-8 md:py-12 lg:py-16 px-6 ">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left Column - Images */}
                        <div className="relative h-[400px] md:h-[582px] flex items-center">
                            <Image
                                src={carImg}
                                alt="Car on highway"
                                className="object-cover absolute top-0 right-0 w-full md:w-3/4 h-auto"
                            />
                            <div className="absolute left-0 md:left-12 top-3 md:top-8 z-20 transform -skew-y-4 bg-black text-white px-8 py-8 rounded-lg w-40 font-popin">
                                <div className="text-5xl font-bold">{t('yearsInMarket')}</div>
                                <div className="text-sm font-semibold mt-2">{t('yearsLabel1')}</div>
                                <div className="text-sm font-semibold">{t('yearsLabel2')}</div>
                            </div>
                            <Image
                                src={manImg}
                                alt="Young professionals"
                                className="object-cover w-auto h-40 md:h-72 absolute bottom-0 left-0"
                            />
                            <div className="absolute bottom-24 right-0 opacity-20 text-gray-300">
                                <svg width="120" height="120" viewBox="0 0 120 120">
                                    {Array.from({ length: 100 }).map((_, i) => (
                                        <circle key={i} cx={30 + (i % 4) * 25} cy={30 + Math.floor(i / 4) * 25} r="3" fill="currentColor" />
                                    ))}
                                </svg>
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="space-y-5 font-popin">
                            <div>
                                <h2 className="text-primary text-lg mb-2 font-medium">{t('aboutUs')}</h2>
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight mb-4">
                                    {t('heading')}
                                </h1>
                                <p className="text-gray-600 text-lg">{t('description')}</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white border-2 border-stroke border-dotted">
                                            <Search className="w-4 h-4 text-gray-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('feature1Title')}</h3>
                                        <p className="text-gray-600">{t('feature1Desc')}</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white border-2 border-stroke border-dotted">
                                            <Monitor className="w-4 h-4 text-gray-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('feature2Title')}</h3>
                                        <p className="text-gray-600">{t('feature2Desc')}</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white border-2 border-stroke border-dotted">
                                            <Info className="w-4 h-4 text-gray-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('feature3Title')}</h3>
                                        <p className="text-gray-600">{t('feature3Desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    )
}

export default Section1