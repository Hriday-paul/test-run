"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FaFileAlt,
  FaCalendarAlt,
  FaBuilding,
} from "react-icons/fa";
import PostBanner from "@/components/Post/PostBanner";

export type JobFormValues = {
  jobTitle: string;
  applicationDeadline: string;
  aboutCompany: string;
  vacancy: string;
  salary: string;
  age: string;
  experience: string;
  location: string;
};

export default function JobPostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobFormValues>({
    defaultValues: {
      jobTitle: "",
      applicationDeadline: "",
      aboutCompany: "",
      vacancy: "",
      salary: "",
      age: "",
      experience: "",
      location: "",
    },
  });

  const onSubmit: SubmitHandler<JobFormValues> = (data) => {
    console.log("Job Data:", data);
    reset();
  };

  return (
    <section>
     <PostBanner title="Job Post" description="Search and find your best items for buy or rent" path="/service.png"/>
      <div className="py-16 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          <Card className="border rounded-2xl shadow-md">
            <CardContent className="p-8 space-y-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                {/* ======= Section 1: Job Info ======= */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Job Title */}
                    <div>
                      <label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
                        <FaFileAlt /> Job Title
                      </label>
                      <Input
                        {...register("jobTitle", {
                          required: "Job title is required",
                        })}
                        placeholder="Enter job title"
                        className="rounded h-12"
                      />
                      {errors.jobTitle && (
                        <p className="text-red-500 text-sm">
                          {errors.jobTitle.message}
                        </p>
                      )}
                    </div>

                    {/* Application Deadline */}
                    <div>
                      <label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
                        <FaCalendarAlt /> Application Deadline
                      </label>
                      <Input
                        type="date"
                        {...register("applicationDeadline", {
                          required: "Application deadline is required",
                        })}
                        className="rounded h-12"
                      />
                      {errors.applicationDeadline && (
                        <p className="text-red-500 text-sm">
                          {errors.applicationDeadline.message}
                        </p>
                      )}
                    </div>

                    {/* About Company */}
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
                        <FaBuilding /> About Company
                      </label>
                      <Textarea
                        {...register("aboutCompany", {
                          required: "About company is required",
                        })}
                        rows={4}
                        placeholder="Write about the company"
                        className="rounded"
                      />
                      {errors.aboutCompany && (
                        <p className="text-red-500 text-sm">
                          {errors.aboutCompany.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ======= Section 2: Summary ======= */}
                <div>
                  <h2 className="text-2xl font-bold text-[#1D3557] mb-6 flex items-center gap-2">
                    Summary
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: "vacancy", label: "Vacancy" },
                      { name: "salary", label: "Salary" },
                      { name: "age", label: "Age" },
                      { name: "experience", label: "Experience" },
                      { name: "location", label: "Location" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
                          {field.label}
                        </label>
                        <Input
                          {...register(field.name as keyof JobFormValues, {
                            required: `${field.label} is required`,
                          })}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          className="rounded h-12"
                        />
                        {errors[field.name as keyof JobFormValues] && (
                          <p className="text-red-500 text-sm">
                            {(errors[field.name as keyof JobFormValues]
                              ?.message as string) || ""}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded h-12"
                  >
                    Post Job
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
