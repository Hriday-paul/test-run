"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Gauge,
  Car,
  Calendar,
  Users,
  DollarSign,
  Filter,
  List,
  Bike,
} from "lucide-react";
import ProfileBanner from "@/components/Profile/ProfileBanner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function VehicleListingSection() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([20, 80]);
  const [kmRange, setKmRange] = useState([10, 150]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMdUp, setIsMdUp] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalItems = 24;

  useEffect(() => {
    const handleResize = () => setIsMdUp(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSection = (name: string) => {
    setOpenSection(openSection === name ? null : name);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <section className="bg-white py-10 relative">
      <ProfileBanner />
      {!isMdUp && (
        <Button
          className="fixed left-3 top-1/2 -translate-y-1/2 bg-primary text-white shadow-lg z-50 rounded-full p-3"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <Filter size={18} />
        </Button>
      )}

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4 my-10">
        {/* SIDEBAR / DRAWER */}
        <AnimatePresence>
          {(drawerOpen || isMdUp) && (
            <motion.aside
              initial={{ x: isMdUp ? 0 : -300, opacity: isMdUp ? 1 : 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isMdUp ? 0 : -300, opacity: isMdUp ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 14 }}
              className={`bg-white border border-gray-200 rounded-xl shadow-md p-3 space-y-4 z-40 ${
                drawerOpen
                  ? "fixed left-4 top-1/2 -translate-y-1/2 w-72 z-40 md:static md:translate-y-0"
                  : "md:sticky md:top-30 h-fit"
              }`}
            >
              {/* Filter Sections */}
              {[
                {
                  name: "condition",
                  label: "Condition",
                  content: ["New", "Used"].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox id={item} />
                      <label htmlFor={item} className="text-gray-700 text-sm">
                        {item}
                      </label>
                    </div>
                  )),
                },
                {
                  name: "bikeType",
                  label: "Bike Type",
                  content: ["Sports", "Cruiser", "Scooter", "Standard"].map(
                    (type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <label
                          htmlFor={type}
                          className="text-gray-700 text-sm capitalize"
                        >
                          {type}
                        </label>
                      </div>
                    )
                  ),
                },
                {
                  name: "km",
                  label: "Kilometers Run",
                  content: (
                    <>
                      <Slider
                        className="p-2"
                        value={kmRange}
                        min={0}
                        max={200}
                        step={10}
                        onValueChange={setKmRange}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>{kmRange[0]} km</span>
                        <span>{kmRange[1]} km+</span>
                      </div>
                    </>
                  ),
                },
                {
                  name: "brand",
                  label: "Brand",
                  content: [
                    "Mercedes",
                    "BMW",
                    "Hyundai",
                    "Honda",
                    "Toyota",
                  ].map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox id={brand} />
                      <label
                        htmlFor={brand}
                        className="text-gray-700 text-sm capitalize"
                      >
                        {brand}
                      </label>
                    </div>
                  )),
                },
                {
                  name: "price",
                  label: "Price (Tk)",
                  content: (
                    <>
                      <Slider
                        className="p-2"
                        value={priceRange}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>{priceRange[0]}k</span>
                        <span>{priceRange[1]}k+</span>
                      </div>
                    </>
                  ),
                },
                {
                  name: "location",
                  label: "Location",
                  content: [
                    "Dhaka",
                    "Chittagong",
                    "Barishal",
                    "Rajshahi",
                    "Sylhet",
                    "Rangpur",
                  ].map((loc) => (
                    <div key={loc} className="flex items-center space-x-2">
                      <Checkbox id={loc} />
                      <label
                        htmlFor={loc}
                        className="text-gray-700 text-sm capitalize"
                      >
                        {loc}
                      </label>
                    </div>
                  )),
                },
              ].map((section) => (
                <Card key={section.name} className="border rounded-lg p-0">
                  <CardContent className="p-2">
                    <div
                      onClick={() => toggleSection(section.name)}
                      className="flex items-center justify-between cursor-pointer py-1"
                    >
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {section.label}
                      </h3>
                      {openSection === section.name ? (
                        <ChevronUp size={16} className="text-gray-600" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-600" />
                      )}
                    </div>
                    <AnimatePresence>
                      {openSection === section.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-2 pl-1 overflow-hidden space-y-2"
                        >
                          {section.content}
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

        {/* PRODUCT GRID */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 md:col-span-3 px-2">
            <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
              <List size={16} /> {totalItems} Vehicles Found
            </div>

            <Select onValueChange={(value) => console.log("Sort by:", value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="priceLow">Price: Low to High</SelectItem>
                <SelectItem value="priceHigh">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <Card
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm p-0 hover:shadow-md transition-all"
            >
              <img
                src="/bike.png"
                alt="Vehicle"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 text-lg">
                  Mercedes - Benz C220d
                </h3>
                <div className="flex items-center text-sm text-gray-600 gap-1">
                  <MapPin size={14} /> Dhaka, Bangladesh
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-4 text-gray-700 text-sm">
                    <span className="flex items-center gap-1">
                      <Gauge size={14} /> 100 km
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} /> 4 Seats
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 text-gray-700 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> 2023
                    </span>
                    <span className="flex items-center gap-1">
                      <Bike size={14} /> Suzuki
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="font-semibold text-gray-900 flex items-center gap-1">
                    <DollarSign size={14} /> 144400
                  </p>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          <div className="col-span-full flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                {/* Previous button */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                  />
                </PaginationItem>

                {/* Page numbers */}
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

                {/* Ellipsis example if needed */}
                {totalPages > 5 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Next button */}
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
