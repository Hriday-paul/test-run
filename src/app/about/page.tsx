"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CountUp from "react-countup";
import { FaCarSide, FaSmile, FaCar, FaRegClock } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import { LiaCarSideSolid, LiaMoneyBillWaveSolid } from "react-icons/lia";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      <section className="w-full bg-white">
        {/* 🔹 Hero Section */}
        <div className="relative h-[350px] md:h-[420px] w-full">
          <Image
            src="/car-banner.jpg"
            alt="About Us Hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
            <p className="text-sm md:text-base mt-2">
              Get to know us better, our values and story.
            </p>

            {/* Breadcrumb Centered */}
            <div className="mt-4">
              <Breadcrumb>
                <BreadcrumbList className="justify-center">
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/"
                      className="text-gray-200 hover:text-white"
                    >
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-gray-300" />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="#"
                      className="text-primary font-medium"
                    >
                      About Us
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </div>

        {/* 🔹 About + Counter + Vision + Mission Section */}
        <div className="container mx-auto px-6 py-16">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold md:w-[55%]">
              We offer customers a wide range of{" "}
              <span className="text-primary">commercial cars</span> and{" "}
              <span className="text-primary">luxury cars</span> for any
              occasion.
            </h2>
            <p className="text-gray-600 md:w-[45%]">
              At our car rental company, we believe everyone deserves the joy of
              driving a reliable and comfortable vehicle. Our diverse fleet
              includes everything from sleek sedans to spacious SUVs, all
              carefully maintained and offered at competitive prices. Enjoy a
              hassle-free booking process with us.
            </p>
          </div>

          {/* Counter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { icon: <FaCarSide />, value: 12000, label: "Completed Orders" },
              { icon: <FaSmile />, value: 7250, label: "Happy Customers" },
              { icon: <FaCar />, value: 235, label: "Vehicle Fleet" },
              { icon: <FaRegClock />, value: 8, label: "Years Experience" },
            ].map((item, i) => (
              <Card
                key={i}
                className="bg-[#F4F4F4] flex flex-col items-center justify-center py-6 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <CardContent className="flex flex-col items-center gap-2">
                  <div className="text-primary text-3xl">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    <CountUp end={item.value} duration={2.5} />+
                  </h3>
                  <p className="text-sm text-gray-500 text-center">
                    {item.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Vision + Mission + Image */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
              <p className="text-gray-600 mb-6">
                Pioneering a global standard in car rentals to ensure every
                journey is backed by trust, innovation, and unmatched service.
                We aim to create a seamless, accessible, and enjoyable
                experience for every customer, empowering them to explore the
                world with ease and confidence.
              </p>
              <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-600">
                Our mission is to provide exceptional car rental services that
                make urban travel easy, affordable, and enjoyable. We aim to
                create a seamless experience by offering a diverse fleet of
                vehicles, flexible rental options, and outstanding customer
                support.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[350px]">
              <Image
                src="/vision.webp"
                alt="Our Team"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* 🔹 How It Works Section */}
        <div className="container py-16 px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-start md:items-center w-full justify-between gap-8 md:gap-0">
            <div className="mb-12 lg:mb-0 w-full lg:w-1/2">
              <h3 className="text-xl font-semibold mb-3">How It Works</h3>
              <p className="text-3xl md:text-4xl">Following working steps</p>
            </div>

            {/* Steps (Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  emoji: <LiaCarSideSolid />,
                  title: "Choose A Car",
                  desc: "Select car type that suits your needs, leisure, or long-term use.",
                },
                {
                  emoji: <LiaMoneyBillWaveSolid />,
                  title: "Customize Your Booking",
                  desc: "Pick your rental dates, location & any additional services or coverage.",
                },
                {
                  emoji: <GiClick />,
                  title: "Confirm & Drive",
                  desc: "Complete your reservation with easy payment options.",
                },
              ].map((step, i) => (
                <Card
                  key={i}
                  className="flex flex-col items-center justify-center text-center p-2 hover:shadow-lg transition rounded-2xl"
                >
                  <CardContent className="flex flex-col items-center">
                    <div className="text-4xl mb-2">{step.emoji}</div>
                    <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                    <p className="text-gray-500 text-sm">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Image */}
          <Card className="relative h-[300px] md:h-[400px] overflow-hidden rounded-2xl">
            <Image
              src="/service.jpg"
              alt="Our Culture"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Your Journey, Our Commitment
              </h3>
              <Button variant="secondary" className="font-medium">
                Our Services
              </Button>
            </div>
          </Card>

          {/* Right Text + Mini Gallery */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Culture</h3>
            <p className="text-gray-600 mb-6">
              At our core, we believe in creating an environment where every
              team member feels empowered to contribute, grow, and thrive.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {["/culture1.jpg", "/culture2.jpg", "/culture3.jpg"].map(
                (src, i) => (
                  <Card
                    key={i}
                    className="relative h-[90px] md:h-[120px] overflow-hidden rounded-lg"
                  >
                    <Image
                      src={src}
                      alt={`Culture ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </Card>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Testimonial Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="shadow-none border-none">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold mb-6">
                What Our Customers Say
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 italic text-lg mb-8">
                “I was really impressed with the level of service I received
                from this car rental company. The process was smooth and easy,
                and the car I rented was in excellent condition. The staff was
                friendly and helpful, and I felt well taken care of throughout
                my rental period. I would definitely recommend this company to
                anyone looking for a premium car rental experience.”
              </p>

              <div className="flex flex-col items-center">
                <Image
                  src="/avatar.png"
                  alt="Customer"
                  width={60}
                  height={60}
                  className="rounded-full mb-2"
                />
                <h4 className="font-semibold">Tahliil Azim</h4>
                <p className="text-gray-500 text-sm">From Australia</p>
              </div>

              {/* Arrows */}
              <div className="flex justify-center items-center gap-3 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-primary hover:text-white transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 🔹 FAQ Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <Button
            variant="default"
            className="bg-primary text-white rounded-full text-sm mb-4"
          >
            Our Support
          </Button>
          <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6">
          <Accordion type="single" collapsible className="w-full text-left">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">
                01. How do I book a car rental with AVA VICO?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm">
                Provide a step-by-step guide on how users can browse and book
                travel services on your platform. Include information on
                searching for destinations, selecting dates, choosing
                accommodation, and completing the booking process. Mention any
                special features or tools that can help users find the best
                deals.
              </AccordionContent>
            </AccordionItem>

            {[
              "02. How do I book a car rental with AVA VICO, and what options are available during the renting process?",
              "03. What specific documents and identification are required to rent a car from AVA VICO?",
              "04. Is insurance automatically included in the rental price, and what additional coverage options are available?",
              "05. Can I modify or cancel my booking after it’s been confirmed, and what are the terms and conditions?",
            ].map((question, index) => (
              <AccordionItem key={index} value={`item-${index + 2}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm">
                  Details for this question can go here. You can add more
                  context or steps for the customer support explanation.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
