import { BookOpen, FileText, TextSelect } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

async function Section2() {
    const t = await getTranslations('about.section2');

    const steps = [
        {
            number: 1,
            icon: BookOpen,
            title: t('step1Title'),
            description: t('step1Desc'),
        },
        {
            number: 2,
            icon: FileText,
            title: t('step2Title'),
            description: t('step2Desc'),
        },
        {
            number: 3,
            icon: TextSelect,
            title: t('step3Title'),
            description: t('step3Desc'),
        },
    ];

    return (
        <section className='container'>
            <div className="w-full py-16 px-4 bg-white font-popin">
                <div className="text-center mb-16">
                    <p className="text-red-500 text-lg font-semibold mb-2">
                        {t('subheading')}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
                        {t('heading1')}
                        <br />
                        {t('heading2')}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={step.number}
                                className="flex flex-col items-center text-center relative space-y-4
                                about-section-2
                                relative before:hidden md:before:inline before:absolute before:content-[''] before:top-[19%] before:right-[-20%] md:before:right-[-29%] lg:before:right-[-28%] before:w-[141px] before:h-[30px] before:bg-no-repeat before:bg-contain
                                last:before:hidden md:before:w-[102px] lg:w-auto"
                            >
                                <div className="bg-white relative p-2.5 rounded-full shadow-[0px_10px_30px_rgba(0,18,65,0.1)]">
                                    <div className='border border-stroke rounded-full p-4'>
                                        <Icon className="w-8 h-8 text-gray-500" strokeWidth={1.5} />
                                    </div>
                                    <div className="absolute -top-2 -right-4 w-8 h-8 bg-transparent rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm border border-stroke p-0.5">
                                        <div className='bg-gray-200 w-6 h-6 flex justify-center items-center rounded-full text-xs'>
                                            {step.number}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm mb-2">{step.title}</p>
                                    <h3 className="text-gray-900 text-lg font-medium leading-snug max-w-60">{step.description}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default Section2