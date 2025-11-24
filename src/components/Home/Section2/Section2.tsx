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

const categories = [
    {
        id : 1,
        name : "Car Buy/Sell",
        rout : "/carbuysell",
        icon : car
    },
    {
        id : 2,
        name : "Bike Buy/Sell",
        rout : "/bikebuysell",
        icon : bike
    },
    {
        id : 3,
        name : "Workshoops",
        rout : "/workshop",
        icon : workshop
    },
    {
        id : 4,
        name : "Accessories",
        rout : "/accessories",
        icon : accessories
    },
    {
        id : 5,
        name : "Car Rent",
        rout : "/car-rent",
        icon : carRent
    },
    {
        id : 11,
        name : "Documents",
        rout : "/document-process",
        icon : document
    },
    {
        id : 6,
        name : "Job Service",
        rout : "/jobs",
        icon : job
    },
    {
        id : 7,
        name : "Exchange",
        rout : "/exchange",
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
        rout : "/lawyers",
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        categories.map(category=>{
                            return <Link href={category?.rout} key={category?.id} className="bg-slate-50 p-8 rounded-lg border border-stroke hover:border-primary duration-200">
                                <Image src={category?.icon} alt="runbd category icon" className="h-16 w-auto mx-auto" />
                                <h6 className="text-lg font-popin font-medium text-center pt-3">{category?.name}</h6>
                            </Link>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Section2