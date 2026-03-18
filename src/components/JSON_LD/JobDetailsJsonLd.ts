import { Add } from "@/redux/types"

export const gen_JsonLdJobDetails = (ad: Add, path: string) => {
    const job = ad?.job

    return {
        "@context": "https://schema.org",
        "@type": "JobPosting",           // ✅ Job = JobPosting type

        // ── Must Have ──────────────────────────
        "title": ad.title,
        "url": `https://runbd.org/${path}/${ad.slug}`,

        ...(ad.description && {
            "description": ad.description
        }),

        // ── Safe Image ─────────────────────────
        ...(ad.images?.length > 0 && {
            "image": ad.images[0]?.url
        }),

        // ── Company ────────────────────────────
        ...(job?.company_name && {
            "hiringOrganization": {
                "@type": "Organization",
                "name": job.company_name,

                ...(job?.about_company && {
                    "description": job.about_company
                }),
            }
        }),

        // ── Job Type ───────────────────────────
        ...(job?.job_type && {
            "occupationalCategory": job.job_type,  // "Driver", "Mechanic" etc
        }),

        // ── Employment Type ────────────────────
        ...(job?.employment_type && {
            "employmentType": job.employment_type  // "FULL_TIME", "PART_TIME",
                                                   // "CONTRACT", "TEMPORARY"
        }),

        // ── Salary ─────────────────────────────
        ...(job?.salary && {
            "baseSalary": {
                "@type": "MonetaryAmount",
                "currency": "BDT",
                "value": {
                    "@type": "QuantitativeValue",
                    "value": job.salary,
                    "unitText": "MONTH"            // per month
                }
            }
        }),

        // ── Vacancy ────────────────────────────
        ...(job?.vacancy && {
            "totalJobOpenings": job.vacancy
        }),

        // ── Experience ─────────────────────────
        ...(job?.experience && {
            "experienceRequirements": {
                "@type": "OccupationalExperienceRequirements",
                "monthsOfExperience": job.experience  // "2 years", "fresher" etc
            }
        }),

        // ── Age ────────────────────────────────
        ...(job?.age && {
            "applicantLocationRequirements": {
                "@type": "AdministrativeArea",
                "description": `Age requirement: ${job.age}`  // "18-35"
            }
        }),

        // ── Deadline ───────────────────────────
        ...(job?.dedline && {
            "applicationDeadline": job.dedline,   // "2024-12-31"
        }),

        // ── Job Location ───────────────────────
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",

                ...(job?.job_location && {
                    "streetAddress": job.job_location,
                }),
                ...(ad?.area && {
                    "streetAddress": ad.area.name,
                }),
                ...(ad?.district && {
                    "addressLocality": ad.district.name,
                }),
                ...(ad?.division && {
                    "addressRegion": ad.division.name,
                }),
                "addressCountry": "BD"
            }
        },

        // ── Date Posted ────────────────────────
        ...(ad?.createdAt && {
            "datePosted": new Date(ad.createdAt)
                .toISOString()
                .split("T")[0],                   // "2024-03-16"
        }),

        
    }
}