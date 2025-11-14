import Image from "next/image";
import { MapPin, Calendar, User, Briefcase } from "lucide-react";
import ShopBanner from "@/components/Shop/ShopBanner";
import Link from "next/link";

export default function JobDetailsPage() {
  return (
    <section className="w-full">
      <ShopBanner
        title="Job Details"
        desc="Search and find your best items for buy or rent"
        path="/job-service.png"
      />
      <div className="container mx-auto py-10">
        {/* Header */}
        <div className="flex md:flex-row flex-col items-start gap-4 shadow rounded-2xl border p-6">
          <Image
            src="/user.png"
            alt="User"
            width={90}
            height={90}
            className="rounded-md object-cover"
          />

          <div>
            <h1 className="text-2xl font-semibold">Md Shahid Hasan Shimul</h1>

            <h2 className="text-lg font-semibold mt-2">About Company</h2>

            {/* Keep paragraph content on a single line to avoid accidental JSX parsing issues */}
            <p className="text-gray-600 text-sm mt-1 max-w-xl">
              The Mercedes-Benz C220d is a luxury diesel variant of the
              Mercedes-Benz C-Class, known for its combination of fuel
              efficiency, comfort, and advanced technology.
            </p>

            <h2 className="text-xl font-semibold mt-4">Private Car Driver</h2>

            <p className="text-sm mt-1">
              <span className="font-medium">Application Deadline :</span>{" "}
              <span className="text-red-600 font-semibold">31 Oct 2025</span>
            </p>
          </div>
        </div>

        {/* Summary Section */}
        <div className="shadow border p-6 rounded-lg mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-3">
            <p>
              <span className="font-semibold">Vacancy :</span> 02
            </p>
            <p>
              <span className="font-semibold">Salary :</span> 15k - 20k
            </p>
          </div>

          <div className="space-y-3">
            <p>
              <span className="font-semibold">Age :</span> 20 to 30 years
            </p>
            <p>
              <span className="font-semibold">Experience :</span> At most 1 Year
            </p>
          </div>

          <div className="space-y-3">
            <p>
              <span className="font-semibold">Location :</span> Mohakhali, Dhaka
            </p>
            <p>
              <span className="font-semibold">Published :</span> 18 Oct 2025
            </p>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-10 shadow rounded-2xl border p-6">
          <h2 className="text-lg font-semibold mb-3">Requirements</h2>

          <h3 className="font-semibold mt-4 mb-1">Education</h3>
          <ul className="text-sm text-gray-700 list-disc ml-6 space-y-1">
            <li>Bachelor of Arts (BA)</li>
            <li>HSC</li>
          </ul>

          <h3 className="font-semibold mt-4 mb-1">Experience</h3>
          <ul className="text-sm text-gray-700 list-disc ml-6 space-y-1">
            <li>At most 1 year</li>
            <li>
              Applicants should have experience in Advertising Agency, Travel
              Agent, Manpower Recruitment, Call Center, Shop/Showroom
            </li>
          </ul>

          <h3 className="font-semibold mt-4 mb-1">Additional Requirements</h3>
          <ul className="text-sm text-gray-700 list-disc ml-6 space-y-1">
            <li>At most 1 year</li>
            <li>
              Should have experience in Advertising Agency, Travel Agent,
              Manpower Recruitment, Call Center, Shop/Showroom
            </li>
          </ul>

          <h3 className="font-semibold mt-4 mb-1">
            Responsibilities &amp; Context
          </h3>
          <ul className="text-sm text-gray-700 list-disc ml-6 space-y-1">
            <li>At most 1 year</li>
            <li>
              Should have experience in Advertising Agency, Travel Agent,
              Manpower Recruitment, Call Center, Shop/Showroom
            </li>
          </ul>
        </div>

        {/* Apply Button */}
        <Link href={'/shop/job-shop/job-details/apply'}>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-center rounded-md mt-8 font-semibold cursor-pointer">
            Apply Now
          </button>
        </Link>
      </div>
    </section>
  );
}
