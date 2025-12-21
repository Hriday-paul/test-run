import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IOrder } from "@/redux/types"
import Link from "next/link"
import { BsCloudDownload } from "react-icons/bs"
import { FaFileAlt, FaRegEye } from "react-icons/fa"
import { MdOutlineRemoveRedEye } from "react-icons/md"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"


function OrderResultView({ order }: { order: IOrder }) {
    return (
        <div className="font-popin">
            <Tooltip>
                <Dialog>

                    <TooltipTrigger>
                        <DialogTrigger asChild>

                            <button className="bg-slate-50 p-2 border border-stroke outline-0 text-black rounded">
                                <FaRegEye />
                            </button>

                        </DialogTrigger>
                    </TooltipTrigger>

                    <TooltipContent>
                        <p>View Results</p>
                    </TooltipContent>

                    <DialogContent >
                        <DialogHeader>
                            <DialogTitle className="font-medium">View Result</DialogTitle>
                            <DialogDescription>

                            </DialogDescription>
                        </DialogHeader>


                        <div className='space-y-5 w-full'>
                            {
                                order?.response_list?.map(report => {
                                    return <div className='p-10 border border-gray-200 rounded flex flex-col justify-center relative' key={report?.id}>
                                        {report?.fieldType == "File" ? <FaFileAlt className='text-5xl' /> : <></>}
                                        <p className="mt-2.5 font-medium font-popin">
                                            {report?.name}
                                        </p>
                                        {
                                            report?.fieldType == "Text" && <p className='text-base mt-1 font-popin'>{report?.data}</p>
                                        }
                                        {(report?.fieldType == "File" && report?.File) && <div className='flex flex-row gap-x-2 items-center absolute right-5 top-5'>
                                            <Link href={report?.File?.url} target='_blank'>
                                                <button className="bg-slate-50 p-2 border border-stroke outline-0 text-black">
                                                    <MdOutlineRemoveRedEye />
                                                </button>
                                            </Link>
                                            <a href={report?.File?.url} download={true}>
                                                <button className="bg-slate-50 p-2 border border-stroke outline-0 text-black">
                                                    <BsCloudDownload />
                                                </button>
                                            </a>
                                        </div>}
                                    </div>
                                })
                            }

                        </div>



                    </DialogContent>

                </Dialog>
            </Tooltip>
        </div>
    )
}

export default OrderResultView