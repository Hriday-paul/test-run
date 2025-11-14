"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  List,
  MapPin,
  Gauge,
  Calendar,
  Users,
  Bike,
  DollarSign,
} from "lucide-react";
import ProfileBanner from "@/components/Profile/ProfileBanner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Slider } from "@/components/ui/slider";
import ShopBanner from "@/components/Shop/ShopBanner";
import Link from "next/link";

interface FilterSection {
  name: string;
  label: string;
  items?: string[];
  range?: [number, number];
  onChange?: (value: [number, number]) => void;
  unit?: string;
}

interface Vehicle {
  id: number;
  title: string;
  location: string;
  km: number;
  seats: number;
  year: number;
  brand: string;
  price: number;
  image: string;
}

export default function CarListingSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isMdUp, setIsMdUp] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const [kmRange, setKmRange] = useState<[number, number]>([0, 50000]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const itemsPerPage = 6;
  const totalItems = 24;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const filterSections: FilterSection[] = [
    { name: "condition", label: "Condition", items: ["New", "Used"] },
    {
      name: "vehicleType",
      label: "Vehicle Type",
      items: ["Car", "Bike", "Truck"],
    },
    {
      name: "km",
      label: "Kilometers Run",
      range: kmRange,
      onChange: setKmRange,
      unit: " km",
    },
    {
      name: "price",
      label: "Price (Tk)",
      range: priceRange,
      onChange: setPriceRange,
      unit: "k",
    },
    {
      name: "brand",
      label: "Brand",
      items: ["Mercedes", "BMW", "Hyundai", "Honda", "Toyota"],
    },
    {
      name: "location",
      label: "Location",
      items: [
        "Dhaka",
        "Chittagong",
        "Barishal",
        "Rajshahi",
        "Sylhet",
        "Rangpur",
      ],
    },
  ];

  if (Object.keys(openSections).length === 0) {
    setOpenSections(
      Object.fromEntries(filterSections.map((s) => [s.name, true]))
    );
  }

  const toggleSection = (name: string) => {
    setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const vehicles: Vehicle[] = Array.from({ length: totalItems }).map(
    (_, i) => ({
      id: i + 1,
      title: "Mercedes - Benz C220d",
      location: "Dhaka, Bangladesh",
      km: 100,
      seats: 4,
      year: 2023,
      brand: "Suzuki",
      price: 144400,
      image: "/bike.png",
    })
  );

  return (
    <section className="bg-white py-10 w-full">
      <ShopBanner
        title="Find Your Perfect Items"
        desc="Search and find your best items for buy or rent"
        path="/bike-banner.png"
      />

      {/* Mobile filter button */}
      {!isMdUp && (
        <Button
          className="fixed left-3 top-1/2 -translate-y-1/2 bg-primary text-white shadow-lg z-50 rounded-full p-3"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <Filter size={18} />
        </Button>
      )}
      <div className="container mx-auto flex flex-col md:flex-row gap-6 mt-6 px-4">
        {/* Sidebar */}
        <AnimatePresence>
          {(drawerOpen || isMdUp) && (
            <motion.aside
              initial={{ x: isMdUp ? 0 : -300, opacity: isMdUp ? 1 : 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isMdUp ? 0 : -300, opacity: isMdUp ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 14 }}
              className={`bg-white border border-gray-200 rounded-xl shadow-md p-3 space-y-4 z-40  
                ${
                  drawerOpen
                    ? "fixed left-4 top-1/2 -translate-y-1/2 w-72 md:static md:translate-y-0 h-72 md:h-full overflow-y-auto"
                    : "md:sticky md:top-30 "
                }`}
            >
              {filterSections.map((section) => (
                <Card key={section.name} className="border rounded-lg p-0">
                  <CardContent className="p-2">
                    <div
                      onClick={() => toggleSection(section.name)}
                      className="flex items-center justify-between cursor-pointer py-1"
                    >
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {section.label}
                      </h3>
                      {openSections[section.name] ? (
                        <ChevronUp size={16} className="text-gray-600" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-600" />
                      )}
                    </div>
                    <AnimatePresence>
                      {openSections[section.name] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-2 pl-1 overflow-hidden space-y-2"
                        >
                          {section.items?.map((item) => (
                            <div
                              key={item}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox id={`${section.name}-${item}`} />
                              <label
                                htmlFor={`${section.name}-${item}`}
                                className="text-gray-700 text-sm"
                              >
                                {item}
                              </label>
                            </div>
                          ))}

                          {section.range && section.onChange && (
                            <div className="px-2">
                              <Slider
                                value={section.range}
                                onValueChange={section.onChange}
                                max={section.name === "price" ? 500 : 50000}
                              />
                              <div className="flex justify-between text-sm text-gray-500 mt-1">
                                <span>
                                  {section.range[0]}
                                  {section.unit}
                                </span>
                                <span>
                                  {section.range[1]}
                                  {section.unit}
                                </span>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              ))}

              <Button className="w-full bg-primary text-white hover:bg-primary/90 rounded-md mt-2 text-sm">
                Filter Now
              </Button>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Vehicle Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top Bar */}
          <div className="sticky top-0 bg-white z-10 flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 col-span-full px-2 py-2 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
              <List size={16} /> {totalItems} Vehicles Found
            </div>
          </div>

          {vehicles
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((v) => (
              <Card
                key={v.id}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-0"
              >
                <img
                  src={v.image}
                  alt={v.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {v.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 gap-1">
                    <MapPin size={14} /> {v.location}
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between text-gray-700 text-sm">
                    <span className="flex items-center gap-1">
                      <Gauge size={14} /> {v.km} km
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} /> {v.seats} Seats
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {v.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bike size={14} /> {v.brand}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <p className="font-semibold text-gray-900 flex items-center gap-1">
                      <DollarSign size={14} /> {v.price}
                    </p>
                    <Link href={"/shop/bike-shop/bike-details"}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[#0C8CE9] hover:text-white bg-[#0C8CE9]/30 hover:bg-[#0C8CE9] duration-300 cursor-pointer"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}

          {/* Pagination */}
          <div className="col-span-full flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      currentPage < totalPages &&
                      setCurrentPage(currentPage + 1)
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </section>
  );
}
