import { Button } from '@/components/ui/button'
import { usePurchasePackMutation } from '@/redux/api/subcription'
import { IPackage } from '@/redux/types'
import SignUpPopup from '@/shared/SignUpPopup'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { GoArrowUpRight } from 'react-icons/go'
import { ImSpinner2 } from 'react-icons/im'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import Swal from 'sweetalert2'

function PlanCard({ plan, isMiddle }: { plan: IPackage, isMiddle: boolean }) {
    const [postSubscription, { isLoading }] = usePurchasePackMutation();
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();

    const [cookie, _] = useCookies(['accessToken']);


    const handlePurchase = async (id: number) => {
        console.log(cookie?.accessToken)
        if (!cookie?.accessToken) {
            setOpen(true);
            return;
        }
        try {

            const res = await postSubscription({ packageId: id }).unwrap();
            router.push(res?.data);
        }
        catch (err: any) {
            Swal.fire({
                title: err?.data?.message || "Something went wrong, try again",
                text: "Try again or delay some times, then again try",
                customClass: {
                    title: "text-2xl text-black font-figtree",
                    container: "text-sm font-medium font-figtree text-zinc-900",
                    cancelButton: "!bg-primary text-white",
                    confirmButton: "!bg-primary text-white"
                },
                icon: 'error',
                showCancelButton: true,
                showConfirmButton: false,
                confirmButtonText: "Close",
                confirmButtonColor: "#38CB6E",
                cancelButtonText: "Close",
            })
        }
    }

    return (
        <div
            key={plan.id}
            className={`
                  relative flex flex-col p-8 overflow-hidden rounded-2xl shadow-sm border border-gray-200 transition-all duration-1000
                  ${isMiddle
                    ? "lg:scale-y-110 bg-primary text-white"
                    : "group text-black bg-white"
                }
                `}
        >
            {/* Background animation */}
            {!isMiddle && (
                <div className="absolute inset-0 bg-primary translate-y-120 group-hover:translate-y-0 transition-transform duration-1000 ease-out rounded-2xl"></div>
            )}

            <div
                className={`flex justify-between items-center relative z-10 ${!isMiddle ? "group-hover:text-white" : ""
                    }`}
            >
                <h5 className="text-3xl font-semibold font-popin">{plan.name}</h5>
                <p>{plan.duration} days</p>
            </div>

            <div
                className={`relative z-10 text-nowrap ${!isMiddle ? "group-hover:text-white" : ""
                    }`}
            >
                <div className="flex flex-col items-start">
                    <p className=" mb-6">
                        <span className="text-lg font-bold group-hover:text-white">
                            {plan.price} TK
                        </span>
                    </p>

                    <ul
                        className={`mb-8 space-y-2 ${!isMiddle ? "group-hover:text-white" : ""
                            }`}
                    >

                        <li className="flex items-center gap-2 font-popin">
                            <IoMdCheckmarkCircleOutline />
                            {plan?.add_count} Regular Ads
                        </li>
                        <li className="flex items-center gap-2 font-popin">
                            <IoMdCheckmarkCircleOutline />
                            {plan?.feature_count} Featured Ads
                        </li>
                        <li className="flex items-center gap-2 font-popin">
                            <IoMdCheckmarkCircleOutline />
                            {plan?.bumpup_count} Ads will be bumped up
                        </li>
                        <li className="flex items-center gap-2 font-popin">
                            <IoMdCheckmarkCircleOutline />
                            Basic Support
                        </li>

                    </ul>
                </div>
            </div>
            <Button
                className={`
                    relative z-20 mt-auto px-6 rounded-full font-medium  transition-all duration-1000 ease-out transform flex justify-between border border-primary py-6 bg-white text-primary hover:scale-x-105 cursor-pointer 
                    ${isMiddle
                        ? "bg-transparent border-white text-white"
                        : "hover:bg-white"
                    }
                  `}
                onClick={() => handlePurchase(plan?.id)}
            >
                <span>Choose {plan.name}</span>
                <span
                    className={`p-2 border rounded-full ${isMiddle ? "border-white" : "border-primary "
                        }`}
                >
                    {isLoading ? <ImSpinner2 className="animate-spin" /> : <GoArrowUpRight />}
                </span>
            </Button>
            <SignUpPopup open={open} setOpen={setOpen} />
        </div>
    )
}

export default PlanCard