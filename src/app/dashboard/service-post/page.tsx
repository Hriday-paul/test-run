"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  FaDollarSign,
  FaMapMarkerAlt,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { List, Search } from "lucide-react";

type CarPost = {
  id: number;
  title: string;
  price: string;
  description: string;
  engine: string;
  mileage: string;
  color: string;
  fuelType: string;
  carType: string;
  brand: string;
  model: string;
  year: string;
  location: string;
  image: string;
  status: "Published" | "Pending" | "Expired";
};

const demoData: CarPost[] = [
  {
    id: 1,
    title: "Toyota Axio Hybrid",
    price: "$15,500",
    description:
      "Excellent hybrid performance, smooth drive, and great fuel economy.",
    engine: "1500cc",
    mileage: "45,000 km",
    color: "Pearl White",
    fuelType: "Hybrid",
    carType: "Sedan",
    brand: "Toyota",
    model: "Axio",
    year: "2020",
    location: "Dhaka, Bangladesh",
    image: "/car.png",
    status: "Published",
  },
  {
    id: 2,
    title: "Honda Vezel Z 2019",
    price: "$17,000",
    description: "Luxurious interior, push start, reverse camera, smart entry.",
    engine: "1500cc",
    mileage: "38,000 km",
    color: "Black",
    fuelType: "Hybrid",
    carType: "SUV",
    brand: "Honda",
    model: "Vezel",
    year: "2019",
    location: "Chittagong, Bangladesh",
    image: "",
    status: "Pending",
  },
  {
    id: 3,
    title: "Nissan X-Trail G 2018",
    price: "$19,200",
    description:
      "Spacious family SUV with premium comfort and safety features.",
    engine: "2000cc",
    mileage: "52,000 km",
    color: "Silver",
    fuelType: "Petrol",
    carType: "SUV",
    brand: "Nissan",
    model: "X-Trail",
    year: "2018",
    location: "Khulna, Bangladesh",
    image: "",
    status: "Expired",
  },
  {
    id: 4,
    title: "Mitsubishi Outlander 2021",
    price: "$23,000",
    description:
      "Powerful 4WD system, leather interior, fully loaded with safety options.",
    engine: "2400cc",
    mileage: "20,000 km",
    color: "Red",
    fuelType: "Petrol",
    carType: "SUV",
    brand: "Mitsubishi",
    model: "Outlander",
    year: "2021",
    location: "Sylhet, Bangladesh",
    image: "",
    status: "Published",
  },
];

export default function CarPosts() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const filteredData = useMemo(() => {
    return demoData
      .filter(
        (item) =>
          (activeTab === "All" || item.status === activeTab) &&
          item.title.toLowerCase().includes(search.toLowerCase())
      )
      .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
  }, [activeTab, search, currentPage]);

  const totalPages = Math.ceil(
    demoData.filter((item) => activeTab === "All" || item.status === activeTab)
      .length / postsPerPage
  );

  return (
    <section className="p-4 border rounded-2xl shadow-sm bg-white">
      <div className="mb-6">
        {/* Search + Filter Button */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px] sm:min-w-[250px] md:max-w-sm">
            <Input
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Filter Button (Only visible on small devices) */}
          <div className="lg:hidden">
            <Button
              onClick={() => setFilterOpen((prev) => !prev)}
              variant="outline"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <List className="w-4 h-4" />
              Filter
            </Button>
          </div>

          {/* Filter Tabs (Visible on larger screens) */}
          <div className="hidden lg:flex flex-wrap items-center justify-end gap-3 flex-1">
            {["All", "Published", "Pending", "Expired"].map((tab) => (
              <motion.div
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                  className={`rounded-full px-5 text-sm sm:text-base ${
                    activeTab === tab
                      ? "bg-primary text-white border"
                      : "text-primary border border-primary bg-transparent hover:bg-primary/10"
                  }`}
                >
                  {tab}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 🔹 Animated Filter Drawer (Mobile Only) */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: filterOpen ? "auto" : 0,
            opacity: filterOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden lg:hidden mt-3"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["All", "Published", "Pending", "Expired"].map((tab) => (
              <Button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                  setFilterOpen(false);
                }}
                className={`rounded-full px-5 text-sm ${
                  activeTab === tab
                    ? "bg-primary text-white border"
                    : "text-primary border border-primary bg-transparent hover:bg-primary/10"
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>

      {/*  Cards Section */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredData.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-0 bg-white">
              <div className="relative w-full h-48">
                <Image
                  src="/service-menu.png"
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4 pt-0">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {post.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 mt-1 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt /> {post.location}
                  </span>
                </div>

                <Separator className="my-3" />

                <p className="text-gray-600 text-sm line-clamp-2">
                  {post.description}
                </p>

                {/* Buttons */}
                <CardFooter className="flex items-center justify-between gap-3 mt-4 px-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <FaEye /> View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 text-xs sm:text-sm text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <FaTrash /> Delete
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 flex justify-center"
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage((p) => p - 1);
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                    className={`${
                      currentPage === i + 1
                        ? "bg-primary text-white border border-primary"
                        : ""
                    }`}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </motion.div>
      )}
    </section>
  );
}
