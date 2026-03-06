import { getTranslations } from 'next-intl/server';
import Title from '../Section2/Title'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

async function Section6() {
    const t = await getTranslations('Home.section6');

    const leftFaqs = [
        { key: "1", question: t("faq.question1"), answer: t("faq.answer1") },
        { key: "2", question: t("faq.question2"), answer: t("faq.answer2") },
        { key: "3", question: t("faq.question3"), answer: t("faq.answer3") },
    ];

    const rightFaqs = [
        { key: "4", question: t("faq.question4"), answer: t("faq.answer4") },
        { key: "5", question: t("faq.question5"), answer: t("faq.answer5") },
        { key: "6", question: t("faq.question6"), answer: t("faq.answer6") },
    ];


    return (
        <section className="py-12 md:py-16 lg:py-20" id="pricing">
            <div className="container">

                <Title subtitle={t("subtitle")} title={t("title")} />

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-10 mt-0 md:mt-5 lg:mt-8'>
                    <div>
                        <Accordion type="single" collapsible className="bg-white border border-stroke">
                            {leftFaqs.map(({ key, question, answer }) => (
                                <AccordionItem key={key} value={`item-${key}`}>
                                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer rounded-none px-4">
                                        {question}
                                    </AccordionTrigger>
                                    <AccordionContent className="border-t border-stroke pt-4 space-y-3 px-4 font-popin text-base text-gray-700">
                                        {key === "3" ? (
                                            <ol className="list-decimal space-y-2 pl-5">
                                                {answer.split("\n").map((step, i) => (
                                                    <li key={i}>{step.replace(/^\d+\.\s*/, "")}</li>
                                                ))}
                                            </ol>
                                        ) : (
                                            answer
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                    <div>
                        <Accordion type="single" collapsible className="bg-white border border-stroke">
                            {rightFaqs.map(({ key, question, answer }) => (
                                <AccordionItem key={key} value={`item-${key}`}>
                                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer rounded-none px-4">
                                        {question}
                                    </AccordionTrigger>
                                    <AccordionContent className="border-t border-stroke pt-4 space-y-3 px-4 font-popin bg-white text-base text-gray-700">
                                        {answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Section6