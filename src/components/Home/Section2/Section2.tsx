import Title from "./Title"
import car from "../../../../public/categories/car buy sell.svg"
import carRent from "../../../../public/categories/car rent.svg"
import bike from "../../../../public/categories/bike buy sell.svg"
import workshop from "../../../../public/categories/workshop.svg"
import accessories from "../../../../public/categories/eccessories.svg"
import document from "../../../../public/categories/document.svg"
import job from "../../../../public/categories/job.svg"
import exchange from "../../../../public/categories/exchange.svg"
import vehicle from "../../../../public/categories/vehicle.svg"
import lawyer from "../../../../public/categories/lawyer.svg"
import other from "../../../../public/categories/other.svg"
import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

export const categories = [
    {
        id: 1,
        name: "categories.car_buy_sell",
        rout: "/carbuysell",
        icon: car
    },
    {
        id: 2,
        name: "categories.bike_buy_sell",
        rout: "/bikebuysell",
        icon: bike
    },
    {
        id: 3,
        name: "categories.workshops",
        rout: "/workshop",
        icon: workshop
    },
    {
        id: 4,
        name: "categories.accessories",
        rout: "/accessories",
        icon: accessories
    },
    {
        id: 5,
        name: "categories.car_rent",
        rout: "/car-rent",
        icon: carRent
    },
    {
        id: 8,
        name: "categories.vehicle_process",
        rout: "/vehicle-process",
        icon: vehicle
    },
    {
        id: 6,
        name: "categories.job_service",
        rout: "/jobs",
        icon: job
    },
    {
        id: 7,
        name: "categories.exchange",
        rout: "/exchange",
        icon: exchange
    },
    {
        id: 11,
        name: "categories.documents",
        rout: "/documents",
        icon: document
    },
    {
        id: 9,
        name: "categories.lawyer",
        rout: "/lawyers",
        icon: lawyer
    },
    {
        id: 10,
        name: "categories.other",
        rout: "#",
        icon: other
    }
];

async function Section2() {
    const t = await getTranslations('Home.section2');
    return (
        <div className="bg-white" id="services">
            <div className="container pt-12 md:pt-16 lg:pt-20 ">
                <Title title={t("title")} subtitle={t("subtitle")} />

                {/* service categories */}
                <div className="flex flex-wrap justify-center items-center">
                    {
                        categories.map(category => {
                            return <Link href={category?.rout} key={category?.id} scroll={true} className="p-5 md:p-8 border-r border-b border-stroke duration-200 hover:shadow-[0_0_10px_0_rgba(0,0,0,0.12)]
w-1/2 md:w-1/3 lg:w-1/4
[&:nth-child(2n)]:border-r-0
md:[&:nth-child(2n)]:border-r
md:[&:nth-child(3n)]:border-r-0
lg:[&:nth-child(3n)]:border-r
lg:[&:nth-child(4n)]:border-r-0 last:border-r-0

md:nth-10:border-b-0 nth-11:border-b-0 lg:nth-9:border-b-0
">
                                <Image src={category?.icon} alt="runbd category icon" className="h-16 w-auto mx-auto" />
                                <h6 className="text-lg font-popin font-medium text-center pt-3">{t(category.name)}</h6>
                            </Link>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Section2