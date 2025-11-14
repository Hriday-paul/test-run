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
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import Link from "next/link";
import ShopBanner from "@/components/Shop/ShopBanner";
import { FaBangladeshiTakaSign, FaShop } from "react-icons/fa6";

interface FilterSection {
  name: string;
  label: string;
  items?: string[];
  range?: [number, number];
  onChange?: (value: [number, number]) => void;
  unit?: string;
}

interface WorkShop {
  id: number;
  title: string;
  location: string;
  image: string;
}

export default function CarListingSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isMdUp, setIsMdUp] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const itemsPerPage = 6;
  const totalItems = 24;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const filterSections: FilterSection[] = [
    {
      name: "accessories",
      label: "Accessories",
      items: [
        "All",
        "Helmet",
        "Engine Oil",
        "Type",
        "Battery",
        "Clothing",
        "Bike Care",
        "Car Care",
      ],
    },
    {
      name: "location",
      label: "Location",
      items: [
        "All",
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

  const workshops: WorkShop[] = Array.from({ length: totalItems }).map(
    (_, i) => ({
      id: i + 1,
      title: "Suzuki 4-Stroke 20w40",
      location: "Dhaka, Bangladesh",
      image: "/eng-oil.png",
    })
  );

  return (
    <section className="bg-white py-10 w-full">
      <ShopBanner
        title="Work Shops"
        desc="Search and find your best items for buy or rent"
        path="/accessories.png"
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

        {/* Work Shop Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top Bar */}
          <div className="sticky top-0 bg-white z-10 flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 col-span-full px-2 py-2 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
              <List size={16} /> {totalItems} Vehicles Found
            </div>
          </div>

          {workshops
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((w) => (
              <Card
                key={w.id}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-0"
              >
                <img
                  src={w.image}
                  alt={w.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="space-y-2 p-4 pt-0">
                  <h3 className="font-semibold text-gray-900 text-lg pt-0">
                    {w.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 gap-1">
                    <MapPin size={14} /> {w.location}
                  </div>
                  <Separator className="my-2" />

                  <span className="flex items-center justify-between text-gray-600 ">
                    <FaShop /> BD Bike Shop
                  </span>
                  <span className="flex items-center justify-between text-gray-600">
                    <FaBangladeshiTakaSign /> $600
                  </span>
                  <div className="w-full pt-2">
                    <Link href={"/shop/accessories-shop/accessories-details"}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-[#0C8CE9]  hover:bg-[#0095ff] hover:text-white  text-white duration-200 cursor-pointer"
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
