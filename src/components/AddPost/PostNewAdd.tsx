"use client"

import carbuy from "../../../public/categories/car buy sell.svg"
import carRent from "../../../public/categories/car rent.svg"
import bike from "../../../public/categories/bike buy sell.svg"
import workshop from "../../../public/categories/workshop.svg"
import accessories from "../../../public/categories/eccessories.svg"
import job from "../../../public/categories/job.svg"
import exchange from "../../../public/categories/exchange.svg"
import lawyer from "../../../public/categories/lawyer.svg"

import { Steps } from "antd";
import { useState } from "react";
import Image from "next/image"
import { IoIosArrowForward } from "react-icons/io"
import CarSellForm from "./CarSellForm"
import BikeSellForm from "./BikeSellForm"
import CarrentForm from "./CarrentForm"
import AccessoriesForm from "./AccessoriesForm"
import JobForm from "./JobForm"
import ExchangeForm from "./ExchangeForm"
import WorkshopForm from "./WorkshopForm"
import LawyerForm from "./LawyerForm"
import { useTranslations } from "next-intl"

const categories = [
    {
        id: 1,
        name: "categories.car_buy_sell",
        icon: carbuy,
        rout: "/post/car-sell"
    },
    {
        id: 2,
        name: "categories.bike_buy_sell",
        icon: bike,
        rout: "/post/bike-sell"
    },
    {
        id: 3,
        name: "categories.car_rent",
        icon: carRent,
        rout: "/post/car-rent"
    },
    {
        id: 4,
        name: "categories.accessories",
        icon: accessories,
        rout: "/post/accessories"
    },
    {
        id: 5,
        name: "categories.job_service",
        icon: job,
        rout: "/post/job"
    },
    {
        id: 6,
        name: "categories.exchange",
        icon: exchange,
        rout: "/post/exchange"
    },
    {
        id: 7,
        name: "categories.workshops",
        icon: workshop,
        rout: "/post/workshop"
    },
    {
        id: 8,
        name: "categories.lawyer",
        icon: lawyer,
        rout: "/post/lawyer"
    }
]

function PostNewAdd() {
    const [step, setStep] = useState(0);
    const [category, setCategory] = useState<null | number>(null);
    const t = useTranslations("vendor.post_ad");
    const tc = useTranslations('Home.section2');

    const stepList = [
        {
            id : 1,
            title: t("steps.step1"),
            description: null,
        },
        {
            id : 2,
            title: t("steps.step2"),
            description: null,
        }
    ]

    const selectCategory = (categoryNum: number) => {
        setCategory(categoryNum)
        setStep(1)
    }

    const handleStepChange = (nextStep: number) => {

        // Allow going back anytime
        if (nextStep < step) {
            setStep(nextStep);
            return;
        }

        // Block going to step 2 if current step is 0
        if (nextStep === 1 && step === 0) {
            return;
        }

        setStep(nextStep);
    }

    return (
        <div>
            <div className='max-w-xs mx-auto'>
                <Steps
                    current={step}
                    onChange={handleStepChange}
                    size="small"
                    items={stepList}
                />
            </div>

            <div className='max-w-3xl mx-auto'>
                {(category && step == 1) && <h3 className='text-xl font-medium font-popin py-5'>{tc(categories[category - 1]?.name)}</h3>}
                {
                    step == 0 ? <Category selectCategory={selectCategory} /> : <div className="bg-white p-8 rounded-lg">
                        {
                            category == 1 ? <CarSellForm /> : category == 2 ? <BikeSellForm /> : category == 3 ? <CarrentForm /> : category == 4 ? <AccessoriesForm /> : category == 5 ? <JobForm /> : category == 6 ? <ExchangeForm /> : category == 7 ? <WorkshopForm /> : category == 8 ? <LawyerForm /> : <> </>
                        }

                    </div>
                }
            </div>
        </div>
    )
}

export default PostNewAdd;

const Category = ({ selectCategory }: { selectCategory: (c: number) => void }) => {
    const t = useTranslations("vendor.post_ad");
    const tc = useTranslations('Home.section2');

    return (
        <div className="mt-5">
            <h3 className='text-base lg:text-lg font-popin text-black mb-0.5 font-semibold text-center'>{t("title")}</h3>
            <h3 className='text-sm font-popin text-gray-700 text-center'>{t("subtitle")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2  border border-stroke max-w-2xl mx-auto mt-8">
                {
                    categories?.map(category => {
                        return <div key={category?.id} onClick={() => selectCategory(category?.id)} className="flex flex-row items-center justify-between gap-3 py-5 px-4 border border-stroke hover:bg-slate-100 duration-150 cursor-pointer">

                            <div className="flex flex-row items-center gap-x-2">
                                <Image src={category?.icon} alt="category icon" className="w-5 h-auto" />
                                <h6 className="text-sm font-popin font-medium">{tc(category?.name)}</h6>
                            </div>

                            <IoIosArrowForward className='' />

                        </div>
                    })
                }
            </div>
        </div>
    )

}