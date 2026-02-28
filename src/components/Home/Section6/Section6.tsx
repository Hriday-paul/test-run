import React from 'react'
import Title from '../Section2/Title'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

function Section6() {
    return (
        <section className="py-12 md:py-16 lg:py-20" id="pricing">
            <div className="container">

                <Title subtitle="Faq" title="Frequently Asked Questions" />

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-10 mt-0 md:mt-5 lg:mt-8'>
                    <div>
                        <Accordion type="single" collapsible className="bg-white border border-stroke">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer rounded-none px-4">What is Runbd ?</AccordionTrigger>
                                <AccordionContent className="border-t border-stroke pt-4 space-y-3 px-4 font-popin text-base text-gray-700">
                                    Runbd is an online marketplace where users can buy and sell products and services across various categories such as Car, Bike, Vehicle process, accessories, jobs, and more.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer rounded-none px-4">Who can use Runbd ?</AccordionTrigger>
                                <AccordionContent className="border-t border-stroke pt-4 space-y-3 px-4 font-popin">
                                    Anyone in Bangladesh who wants to list a vehicle or service, or search for vehicles, rentals, accessories, or related information can use the site.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer rounded-none px-4">How do I post a listing on Runbd ?</AccordionTrigger>
                                <AccordionContent className="border-t border-stroke pt-4 space-y-3 px-4 font-popin">
                                    <ul className='list-decimal space-y-2 pl-5'>
                                        <li>Create an account or log in</li>
                                        <li>Click on “Post Ad” or “Sell Your Vehicle”</li>
                                        <li>Choose the correct category (e.g., bike, car, rent)</li>
                                        <li>Fill in the details and upload photos</li>
                                        <li>Submit your listing</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div>
                        <Accordion type="single" collapsible className="bg-white border border-stroke">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer rounded-none px-4">How can I contact a seller or renter ?</AccordionTrigger>
                                <AccordionContent className="border-t border-stroke pt-4 space-y-3 px-4 font-popin bg-white">
                                    Contact information (like phone number or chat) is provided in the listing. You can use that to reach out directly.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer rounded-none px-4">Can I edit or delete my listing after posting ?</AccordionTrigger>
                                <AccordionContent className="border-t border-stroke pt-4 space-y-3 px-4 font-popin">
                                    Yes — you can edit or delete your listing anytime from your account as long as it is still active.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer rounded-none px-4">How do I rent a car from the site ?</AccordionTrigger>
                                <AccordionContent className="border-t border-stroke pt-4 space-y-3 px-4 font-popin">
                                    Search the “Car Rent” category, choose a listing, and contact the provider using the contact info in the listing to confirm availability and price.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Section6