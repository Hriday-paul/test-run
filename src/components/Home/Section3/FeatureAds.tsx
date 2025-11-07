"use client"
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselDots
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import Image from 'next/image'
import { desc } from 'motion/react-client'
import { ArrowRight, Wallet } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { FaLocationDot } from 'react-icons/fa6'
import { GiPriceTag } from 'react-icons/gi'
import { MdOutlineLocationOn } from 'react-icons/md'

type addType = {
    id: number,
    title: string,
    price: string,
    date: string,
    vendor: string
    location: string,
    desc: string
}

const ads = [
  {
    id: 1,
    title: "Brown Pomeranian",
    price: "3000$",
    date: "10 days ago",
    vendor: "Hriday Paul",
    location: "Dhaka, Bangladesh",
    desc: "A friendly and playful brown Pomeranian looking for a loving home.",
  },
  {
    id: 2,
    title: "Brown Pomeranian",
    price: "3000$",
    date: "10 days ago",
    vendor: "Hriday Paul",
    location: "Dhaka, Bangladesh",
    desc: "A friendly and playful brown Pomeranian looking for a loving home.",
  },
  {
    id: 3,
    title: "Brown Pomeranian",
    price: "3000$",
    date: "10 days ago",
    vendor: "Hriday Paul",
    location: "Dhaka, Bangladesh",
    desc: "A friendly and playful brown Pomeranian looking for a loving home.",
  },
  {
    id: 4,
    title: "Brown Pomeranian",
    price: "3000$",
    date: "10 days ago",
    vendor: "Hriday Paul",
    location: "Dhaka, Bangladesh",
    desc: "A friendly and playful brown Pomeranian looking for a loving home.",
  },
  {
    id: 5,
    title: "Brown Pomeranian",
    price: "3000$",
    date: "10 days ago",
    vendor: "Hriday Paul",
    location: "Dhaka, Bangladesh",
    desc: "A friendly and playful brown Pomeranian looking for a loving home.",
  },
  {
    id: 6,
    title: "Brown Pomeranian",
    price: "3000$",
    date: "10 days ago",
    vendor: "Hriday Paul",
    location: "Dhaka, Bangladesh",
    desc: "A friendly and playful brown Pomeranian looking for a loving home.",
  },

  // {
  //     id: 10,
  //     title: "Brown Pomeranian",
  //     price: "220$ - 300$",
  //     date: "10 days ago",
  //     vendor: "Hriday Paul"
  // },
  // {
  //     id: 20,
  //     title: "Brown Pomeranian",
  //     price: "220$ - 300$",
  //     date: "10 days ago",
  //     vendor: "Hriday Paul"
  // },
  // {
  //     id: 30,
  //     title: "Brown Pomeranian",
  //     price: "220$ - 300$",
  //     date: "10 days ago",
  //     vendor: "Hriday Paul"
  // },
  // {
  //     id: 40,
  //     title: "Brown Pomeranian",
  //     price: "220$ - 300$",
  //     date: "10 days ago",
  //     vendor: "Hriday Paul"
  // },
  // {
  //     id: 50,
  //     title: "Brown Pomeranian",
  //     price: "220$ - 300$",
  //     date: "10 days ago",
  //     vendor: "Hriday Paul"
  // },
  // {
  //     id: 60,
  //     title: "Brown Pomeranian",
  //     price: "220$ - 300$",
  //     date: "10 days ago",
  //     vendor: "Hriday Paul"
  // },
];

function FeatureAds() {
    return (
        <div>
            <Carousel
                plugins={[
                    Autoplay({ delay: 2000 })
                ]}
                opts={{
                    align: "start",
                    loop : true
                }}
                className="w-full"
            >
                <CarouselContent>
                    {ads.map((add, index) => (
                        <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                            <FeatureAddCard add={add} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious /> */}
                {/* <CarouselNext /> */}
                <CarouselDots className='mt-5' />
            </Carousel>
        </div>
    )
}

export default FeatureAds

const FeatureAddCard = ({ add }: { add: addType }) => {
    return (
      <div className="bg-white">
        <Image
          src="/feature-2.avif"
          alt="feature add image"
          className="w-full h-64 object-cover rounded rounded-b-none"
          height={4000}
          width={2000}
        />
        <div className="p-4 space-y-2 border border-t-0 border-black rounded rounded-t-none">
          <div>
            <h6 className="text-xl text-black font-figtree font-medium">
              {add?.title}
            </h6>
            <div className="flex items-center gap-1 text-[#737373]">
              <MdOutlineLocationOn />
              <span>{add?.location}</span>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-[#606060] text-base text-justify">
              "{add?.desc}"
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h6 className="text-xl text-[#303030] font-figtree font-medium flex items-center gap-2">
              <GiPriceTag color="#000000" />
              <span>{add?.price}</span>
            </h6>
            <div>
              <Button className="rounded bg-[#0C8CE94D] text-[#0C8CE9] hover:bg-[#0C8CE9] hover:text-white transition-colors duration-500 cursor-pointer">
                <span>View Details </span>
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}