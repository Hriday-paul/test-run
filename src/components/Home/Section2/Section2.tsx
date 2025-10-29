import Title from "./Title"
import car from "../../../../public/categories/car.png"
import bike from "../../../../public/categories/bike_buy_sell.png"
import workshop from "../../../../public/categories/workshop.png"
import accessories from "../../../../public/categories/accessories.png"
import document from "../../../../public/categories/document.png"
import job from "../../../../public/categories/job.png"
import exchange from "../../../../public/categories/exchange.png"
import vehicle from "../../../../public/categories/vehicle.png"
import lawyer from "../../../../public/categories/lawyer.png"
import other from "../../../../public/categories/other.png"
import Image from "next/image"
import Link from "next/link"


const categories = [
    {
        id : 1,
        name : "Car Buy/Sell",
        rout : "#",
        icon : car
    },
    {
        id : 2,
        name : "Bike Buy/Sell",
        rout : "#",
        icon : bike
    },
    {
        id : 3,
        name : "Workshoops",
        rout : "#",
        icon : workshop
    },
    {
        id : 4,
        name : "Accessories",
        rout : "#",
        icon : accessories
    },
    {
        id : 5,
        name : "Car Rent",
        rout : "#",
        icon : car
    },
    {
        id : 11,
        name : "Documents",
        rout : "#",
        icon : document
    },
    {
        id : 6,
        name : "Job Service",
        rout : "#",
        icon : job
    },
    {
        id : 7,
        name : "Exchange",
        rout : "#",
        icon : exchange
    },
    {
        id : 8,
        name : "Vehicle",
        rout : "#",
        icon : vehicle
    },
    {
        id : 9,
        name : "Lawyer",
        rout : "#",
        icon : lawyer
    },
    {
        id : 10,
        name : "Other",
        rout : "#",
        icon : other
    }
]

function Section2() {
    return (
        <div className="bg-white">
            <div className="container pt-12 md:pt-16 lg:pt-20 ">
                <Title />

                {/* service categories */}
                <div className="flex flex-row gap-5 flex-wrap justify-center">
                    {
                        categories.map(category=>{
                            return <Link href={category?.rout} key={category?.id} className="bg-[#F2F2F2] h-36 p-8 rounded-lg border border-zinc-400">
                                <Image src={category?.icon} alt="runbd category icon" className="h-16 w-auto mx-auto" />
                                <h6 className="text-lg font-figtree font-semibold text-center pt-1">{category?.name}</h6>
                            </Link>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Section2