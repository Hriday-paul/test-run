"use client"
import { IoSearchOutline } from 'react-icons/io5'
import { MdLocationOn } from 'react-icons/md'
import { motion } from "motion/react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useAllDivisionsQuery, useDistrictsByDivisionQuery } from '@/redux/api/locations.api';
import Loader from '@/shared/Loader';
import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';
import { IDivision } from '@/redux/types';
import { UseUpdateMultipleSearchParams, UseUpdateSearchParams } from '@/hooks/UseUpdateSearchPrams'
import { useSearchParams } from 'next/navigation'

function Searchbar() {

  const updateMultipleSearchParam = UseUpdateMultipleSearchParams();

  return (
    <div className='w-full bg-white px-2 md:p-2 border border-stroke grid grid-cols-1 md:grid-cols-2 gap-x-5'>

      <LocationModal updateSearchParam={updateMultipleSearchParam} />

      <Search updateMultipleSearchParam={updateMultipleSearchParam} />
    </div>
  )
}

export default Searchbar;

const Search = ({ updateMultipleSearchParam }: { updateMultipleSearchParam: any }) => {

  const searchTerm = useSearchParams().get("searchTerm");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get('search');
    updateMultipleSearchParam({ searchTerm: search as string })
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-row gap-x-1 items-center justify-between py-2 md:py-0'>
      <div className='flex flex-row gap-x-1 items-center'>
        <IoSearchOutline className='text-xl' />
        <input
          defaultValue={searchTerm || ""}
          type="text" name='search' className='border-none outline-0 focus:outline-0 text-black font-figtree' placeholder='Search...' />
      </div>

      <button type='submit' className='bg-primary text-white px-3 py-2 rounded font-figtree cursor-pointer hover:opacity-70 duration-200'>Search</button>

    </form>
  )
}


const LocationModal = ({ updateSearchParam }: { updateSearchParam: any }) => {

  const district = useSearchParams().get("district");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={` py-3.5 md:py-0 flex flex-row gap-x-1 items-center border-b md:border-b-0 md:border-r border-stroke cursor-pointer ml-2 w-full ${district ? "text-black" : "text-gray-400"}`}>
          <MdLocationOn className='text-xl' />
          <p className='text-base font-figtree'>{district ?? "Location"}</p>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>

          <DialogTitle></DialogTitle>

          <DialogDescription asChild>
            <DivisionSlide updateSearchParam={updateSearchParam} />
          </DialogDescription>

        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const DivisionSlide = ({ updateSearchParam }: { updateSearchParam: any }) => {

  const { isLoading, data, isSuccess } = useAllDivisionsQuery();
  const [selectedDivision, setSelectedDivision] = useState<IDivision | null>(null);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='max-h-[80vh] overflow-y-auto overflow-x-hidden'>
      {!selectedDivision &&
        <>
          <h4 className='text-lg font-figtree font-medium text-black mb-3'>Select Devesion</h4>
          <ul>
            {isSuccess && data?.data?.divisions?.map(division => {
              return <li key={division?.id + division?.name} className='w-full'>
                <button className='flex flex-row gap-x-5 justify-between items-center border-b border-stroke p-3 cursor-pointer hover:bg-gray-50 duration-200 w-full' onClick={() => setSelectedDivision(division)}>
                  <p className='text-base font-figtree'>{division?.name}</p>
                  <IoIosArrowBack className='rotate-180' />
                </button>
              </li>
            })}
          </ul>
        </>}

      {selectedDivision && <DistrictSlide division={selectedDivision} updateSearchParam={updateSearchParam} />}

    </div>
  )
}

const DistrictSlide = ({ division, updateSearchParam }: { division: IDivision, updateSearchParam: any }) => {

  const { isLoading, data, isSuccess } = useDistrictsByDivisionQuery({ divisionId: division?.id });



  if (isLoading) {
    return <Loader />
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          type: "spring"
        },
      }}
    >
      <h4 className='text-lg font-figtree font-medium text-black mb-3'>Select Devesion</h4>
      <ul>
        <li className='w-full'>
          <DialogTrigger asChild>
            <button className='flex flex-row gap-x-5 justify-between items-center border-b border-stroke p-3 cursor-pointer hover:bg-gray-50 duration-200 w-full' onClick={() => {
              updateSearchParam({ division: division?.name, district: null })
            }}>
              <p className='text-base font-figtree'>All</p>
            </button>
          </DialogTrigger>
        </li>
        {isSuccess && data?.data?.map(district => {
          return <li key={`${district?.id}-${district?.name}`} className='w-full'>
            <DialogTrigger asChild>
              <button className='flex flex-row gap-x-5 justify-between items-center border-b border-stroke p-3 cursor-pointer hover:bg-gray-50 duration-200 w-full' onClick={() => {
                updateSearchParam({ division: division?.name, district: district?.name })
              }}>
                <p className='text-base font-figtree'>{district?.name}</p>
              </button>
            </DialogTrigger>
          </li>
        })}
      </ul>
    </motion.div>
  )
}