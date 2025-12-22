"use client"

import { ImSpinner8 } from 'react-icons/im';
import emptyDataImg from '../../../../public/empty_data.jpg'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Add } from "@/redux/types"
import Pagination from '@/components/ui/Pagination';
import ErrorComponent from '@/shared/ErrorComponent';
import { useAllAdsQuery, useBumpAddMutation, useDltAddMutation, useFeatureAddMutation } from '@/redux/api/ads.api';
import { useState } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Swal from "sweetalert2";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { HiOutlineDotsVertical } from "react-icons/hi";
import { Trash2 } from 'lucide-react';
import { FaArrowDownLong } from 'react-icons/fa6';
import { FaRegStar } from 'react-icons/fa';
import { toast } from 'sonner';
import EditPost from '@/components/EditPost/EditPost';

function AdsTable() {
    const [page, setPage] = useState(1);
    const { isLoading, isError, isSuccess, data } = useAllAdsQuery({ page });
    return (
        <div>
            <div className=''>
                <h3 className='text-base lg:text-lg font-popin text-black py-3'>Posted Ads</h3>
                {
                    isLoading ?
                        <div>
                            <div className='min-h-40 flex items-center justify-center'>
                                <ImSpinner8 className="text-4xl text-primary animate-spin" />
                            </div>
                        </div>
                        :
                        isSuccess ?
                            <div className='max-w-5xl mx-auto'>
                                <AdTable ads={data?.data?.data} />
                                <div className="mt-3">
                                    <Pagination
                                        totalPages={data?.data?.meta?.totalPage || 1}
                                        initialPage={1}
                                        onPageChange={(n) => setPage(n)}
                                        maxDisplayedPages={5}
                                    />
                                </div>
                            </div> : isError ? <ErrorComponent /> : <></>
                }
            </div>
        </div>
    )
}

export default AdsTable

const AdTable = ({ ads }: { ads: Add[] }) => {

    const [addFeature] = useFeatureAddMutation();
    const [addBump] = useBumpAddMutation();
    const [addDlt] = useDltAddMutation();

    const handleFeature = async (addId: number) => {
        const loading = toast.loading("Loading...")
        try {
            await addFeature({ addId }).unwrap();
            toast.success("Add successfully featured");
        } catch (err: any) {
            Swal.fire({
                title: err?.data?.message || "Something went wrong",
                // text: "Job poster will review your quotes. You’ll be notified in you email when a quote arrives.",
                icon: "error",
                customClass: {
                    title: "text-xl text-black font-medium font-figtree",
                    container: "text-sm font-medium font-figtree text-zinc-800",
                    cancelButton: "bg-primary text-white",
                    confirmButton: "bg-primary text-white"
                },
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: "Close",
            });
        } finally {
            toast.dismiss(loading)
        }
    }

    const handleBump = async (addId: number) => {
        const loading = toast.loading("Loading...")
        try {
            await addBump({ addId }).unwrap();
            toast.success("Add successfully bumped up");
        } catch (err: any) {
            Swal.fire({
                title: err?.data?.message || "Something went wrong",
                // text: "Job poster will review your quotes. You’ll be notified in you email when a quote arrives.",
                icon: "error",
                customClass: {
                    title: "text-xl text-black font-medium font-figtree",
                    container: "text-sm font-medium font-figtree text-zinc-800",
                    cancelButton: "bg-primary text-white",
                    confirmButton: "bg-primary text-white"
                },
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: "Close",
            });
        } finally {
            toast.dismiss(loading)
        }
    }

    const handleDelete = async (addId: number) => {
        let loadingId: string | number | undefined;

        const result = await Swal.fire({
            title: "Are you sure want to delete this Ad ?",
            text: "You can not restore after delete",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            customClass: {
                title: "text-xl text-black font-medium font-figtree",
                htmlContainer: "text-lg text-black font-figtree",
                cancelButton: "bg-primary text-white",
                confirmButton: "!bg-primary text-white"
            },
        });

        if (!result.isConfirmed) return; // FIX: do not enter try/catch unless confirmed

        try {
            loadingId = toast.loading("Loading...");

            await addDlt({ addId }).unwrap();

            toast.success("Ad deleted successfully");

        } catch (err: any) {

            toast.error(err?.data?.message || "Something went wrong");

            await Swal.fire({
                title: err?.data?.message || "Something went wrong",
                icon: "error",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: "Close",
            });

        } finally {
            if (loadingId !== undefined) {
                toast.dismiss(loadingId);
            }
        }
    };


    return (
        <div className="pb-8">
            <Table className="font-figtree">
                <TableHeader className="!bg-primary/10 font-figtree ">
                    <TableRow className="">
                        <TableHead className="p-5 font-medium font-figtree">Image</TableHead>
                        <TableHead className="font-medium font-figtree">Ad title</TableHead>
                        <TableHead className="font-medium font-figtree">Category</TableHead>
                        <TableHead className="font-medium font-figtree">Price</TableHead>
                        <TableHead className="font-medium font-figtree">Status</TableHead>
                        <TableHead className="font-medium font-figtree">Posted At</TableHead>
                        <TableHead className="text-right font-figtree p-5">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="border border-stroke">
                    {ads?.map((ad) => (

                        <TableRow key={ad?.id}>

                            <TableCell>
                                <div className='relative w-16'>
                                    <Image height={800} width={1000} src={ad?.images[0]?.url} alt='add images' className='object-cover h-auto w-full rounded' />
                                    <div className='bg-black/50 absolute top-0 left-0 h-full w-full flex justify-center items-center'>
                                        <p className='text-sm text-white font-popin'>{ad?.images?.length}</p>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell className=''>{ad?.title}</TableCell>

                            <TableCell>{ad?.category}</TableCell>
                            <TableCell>{ad?.price}</TableCell>
                            <TableCell>{ad?.status ? "Active" : <p className='text-primary'>Disabled</p>}</TableCell>

                            <TableCell className="font-medium ">{moment(ad?.createdAt).format("MMM Do YYYY, h:mm a")}</TableCell>

                            <TableCell className="text-right p-5">

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="outline-none focus:outline-none">
                                        <button className="border border-stroke p-1.5 rounded cursor-pointer hover:bg-slate-100 duration-150">
                                            <HiOutlineDotsVertical className="text-lg" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="z-40 bg-white font-figtree min-w-40" align="end" >

                                        <DropdownMenuItem asChild className="hover:bg-zinc-100 duration-150">
                                            <button onClick={() => handleFeature(ad?.id)} className='w-full font-popin flex flex-row gap-x-2 items-center cursor-pointer'>
                                                <FaRegStar className='text-black' />
                                                Feature
                                            </button>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild className="hover:bg-zinc-100 duration-150 w-full">
                                            <button onClick={() => handleBump(ad?.id)} className='w-full font-popin flex flex-row gap-x-2 items-center cursor-pointer'>
                                                <FaArrowDownLong className='text-black rotate-180' />
                                                Bump Up
                                            </button>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild className="hover:bg-zinc-100 duration-150">
                                            <EditPost defaultData={ad}></EditPost>
                                        </DropdownMenuItem>


                                        <DropdownMenuItem asChild className="hover:bg-zinc-100 duration-150">
                                            <button onClick={() => handleDelete(ad?.id)} className='w-full font-popin flex flex-row gap-x-2 items-center cursor-pointer'>
                                                <Trash2 className='text-primary' />
                                                Delete
                                            </button>
                                        </DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>


                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            {
                ads?.length <= 0 && <section className='min-h-[calc(25vh)] flex flex-col items-center justify-center'>
                    <Image src={emptyDataImg} className='h-28 w-auto mx-auto' alt='empty data' />
                    <h5 className='text-base font-figtree text-center'>Data is empty</h5>
                </section>
            }

        </div >
    )
}