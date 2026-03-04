"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAddstatsQuery } from "@/redux/api/user.api";
import ErrorComponent from "@/shared/ErrorComponent";
import { useTranslations, useLocale } from "next-intl";

export const formatNumberByLocale = (
  value: number | undefined,
  locale: string
) => {
  if (value === undefined || value === null) return "0";

  return new Intl.NumberFormat(
    locale === "bn" ? "bn-BD" : "en-US"
  ).format(value);
};

function AddStats() {
  const { isLoading, isSuccess, isError, data } = useAddstatsQuery();
  const t = useTranslations("vendor.home.stats");
  const locale = useLocale();

  if (isError) {
    return <ErrorComponent />;
  }

  const stats = data?.data;

  const remainingAds =
    (stats?.add_count || 0) - (stats?.postedAd || 0);

  const formattedDate = stats?.expiredAt
    ? new Intl.DateTimeFormat(
        locale === "bn" ? "bn-BD" : "en-US",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }
      ).format(new Date(stats.expiredAt))
    : "-";

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 w-full min-w-0">
        {isLoading ? (
          <>
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </>
        ) : isSuccess ? (
          <>
            {/* Post Limit */}
            <StatCard
              value={formatNumberByLocale(stats?.add_count, locale)}
              label={t("post_limit")}
            />

            {/* Posted Ads */}
            <StatCard
              value={formatNumberByLocale(stats?.postedAd, locale)}
              label={t("posted_ad")}
            />

            {/* Remaining Ads */}
            <StatCard
              value={formatNumberByLocale(remainingAds, locale)}
              label={t("remain_ad")}
            />

            {/* Featured Ads */}
            <StatCard
              value={`${formatNumberByLocale(
                stats?.featured,
                locale
              )} / ${formatNumberByLocale(
                stats?.feature_count,
                locale
              )}`}
              label={t("feature_ad")}
            />

            {/* Bump Ads */}
            <StatCard
              value={`${formatNumberByLocale(
                stats?.bumped,
                locale
              )} / ${formatNumberByLocale(
                stats?.bump_count,
                locale
              )}`}
              label={t("bump_ad")}
            />

            {/* Expire Date */}
            <StatCard
              value={formattedDate}
              label={t("expire_date")}
              isDate
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default AddStats;

/* ---------------- Reusable Stat Card ---------------- */

type StatCardProps = {
  value: string;
  label: string;
  isDate?: boolean;
};

function StatCard({ value, label, isDate }: StatCardProps) {
  return (
    <div className="flex flex-col px-6 py-2 bg-white shadow-2 rounded overflow-hidden border border-stroke">
      <div
        className={`flex flex-col items-center ${
          isDate ? "space-y-5" : "space-y-2"
        } py-3`}
      >
        <div
          className={`${
            isDate
              ? "text-base md:text-xl"
              : "text-2xl md:text-4xl"
          } font-semibold tracking-tight leading-none text-primary font-popin`}
        >
          {value}
        </div>

        <div className="text-lg font-medium text-primary font-popin">
          {label}
        </div>
      </div>
    </div>
  );
}