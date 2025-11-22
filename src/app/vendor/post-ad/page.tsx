import carbuy from "../../../../public/categories/car buy sell.svg"
import carRent from "../../../../public/categories/car rent.svg"
import bike from "../../../../public/categories/bike buy sell.svg"
import workshop from "../../../../public/categories/workshop.svg"
import accessories from "../../../../public/categories/eccessories.svg"
import job from "../../../../public/categories/job.svg"
import exchange from "../../../../public/categories/exchange.svg"
import lawyer from "../../../../public/categories/lawyer.svg"
import Image from "next/image"
import { IoIosArrowForward } from "react-icons/io"
import Link from "next/link"

function PostAdd() {
    const categories = [
        {
            id : 1,
            name : "Car Sell",
            icon : carbuy,
            rout : "/post/car-sell"
        },
        {
            id : 2,
            name : "Bike Sell",
            icon : bike,
            rout : "/post/bike-sell"
        },
        {
            id : 3,
            name : "Car Rent",
            icon : carRent,
            rout : "/post/car-rent"
        },
        {
            id : 4,
            name : "Accessories",
            icon : accessories,
            rout : "/post/accessories"
        },
        {
            id : 5,
            name : "Job",
            icon : job,
            rout : "/post/job"
        },
        {
            id : 6,
            name : "Exchange",
            icon : exchange,
            rout : "/post/exchange"
        },
        {
            id : 7,
            name : "Workshop",
            icon : workshop,
            rout : "/post/workshop"
        },
        {
            id : 8,
            name : "Lawyer",
            icon : lawyer,
            rout : "/post/lawyer"
        }
    ]
  return (
    <div>
         <h3 className='text-base lg:text-lg font-popin text-black mb-0.5 font-semibold text-center'>Post New Ad</h3>
         <h3 className='text-sm font-popin text-gray-700 text-center'>Choose any option below</h3>
         <div className="grid grid-cols-1 md:grid-cols-2  gap-x-10 pt-5">
            {
                categories?.map(category=>{
                    return <Link href={category?.rout} key={category?.id} className="flex flex-row items-center justify-between gap-3 py-5 px-4 border-b border-stroke hover:bg-slate-100 duration-150">

                        <div className="flex flex-row items-center gap-x-2">
                            <Image src={category?.icon} alt="category icon" className="w-5 h-auto" />
                            <h6 className="text-sm font-popin font-medium">{category?.name}</h6>
                        </div>

                        <IoIosArrowForward className='' />
                        
                    </Link>
                })
            }
         </div>
    </div>
  )
}

export default PostAdd