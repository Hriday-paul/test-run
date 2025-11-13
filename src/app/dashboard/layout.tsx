"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Car,
  Bike,
  Wrench,
  Briefcase,
  Package,
  List,
  Menu,
  X,
} from "lucide-react";
import ProfileBanner from "@/components/Profile/ProfileBanner";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState("Dashboard");
  const [openListing, setOpenListing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative m-4">
      <ProfileBanner />

      {/* Floating Toggle Button (mobile only) */}
      {!sidebarOpen && (
        <div className="fixed left-2 top-1/2 -translate-y-1/2 z-1000 md:hidden">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setSidebarOpen(true)}
            className="bg-white shadow-md"
          >
            <Menu size={20} />
          </Button>
        </div>
      )}

      {sidebarOpen && (
        <div className="fixed left-2 top-1/2 -translate-y-1/2 z-1000 md:hidden">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setSidebarOpen(false)}
            className="bg-white shadow-md"
          >
            <X size={20} />
          </Button>
        </div>
      )}

      <div className="flex gap-2 container relative">
        <aside
          className={cn(
            "w-64 bg-white border-r shadow-sm p-4 mt-10 rounded-2xl border flex-col gap-2 transition-all duration-300",
            "md:sticky md:top-30 md:flex",
            "hidden md:flex"
          )}
        >
          <SidebarContent
            active={active}
            setActive={setActive}
            openListing={openListing}
            setOpenListing={setOpenListing}
            closeSidebar={() => {}}
          />
        </aside>

        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/30 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Floating Mobile Sidebar */}
              <motion.aside
                className="fixed left-0 top-1/2 -translate-y-1/2 w-64 bg-white border rounded-2xl shadow-lg p-4 z-50 md:hidden"
                initial={{ x: "-120%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-120%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <SidebarContent
                  active={active}
                  setActive={setActive}
                  openListing={openListing}
                  setOpenListing={setOpenListing}
                  closeSidebar={() => setSidebarOpen(false)}
                />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* 🔹 Main Content */}
        <main className="flex-1 m-4 md:mt-10">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({
  active,
  setActive,
  openListing,
  setOpenListing,
  closeSidebar,
}: any) {
  return (
    <nav className="relative z-40 flex flex-col gap-2 overflow-y-auto">
      <SidebarButton
        name="Dashboard"
        href="/dashboard"
        icon={Home}
        active={active}
        setActive={setActive}
        onClickExtra={closeSidebar}
      />

      {/* My Listing */}
      <div>
        <button
          onClick={() => setOpenListing(!openListing)}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition",
            openListing ? "bg-primary text-white" : "hover:bg-gray-100"
          )}
        >
          <div className="flex items-center gap-2">
            <List className="w-4 h-4" />
            My Listing
          </div>
          {openListing ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {openListing && (
          <div className="pl-8 mt-1 flex flex-col gap-1">
            <SidebarSubLink
              name="Car Post"
              href="/dashboard/car-post"
              icon={Car}
              active={active}
              setActive={setActive}
              onClickExtra={closeSidebar}
            />
            <SidebarSubLink
              name="Bike Post"
              href="/dashboard/bike-post"
              icon={Bike}
              active={active}
              setActive={setActive}
              onClickExtra={closeSidebar}
            />
            <SidebarSubLink
              name="Service Post"
              href="/dashboard/service-post"
              icon={Wrench}
              active={active}
              setActive={setActive}
              onClickExtra={closeSidebar}
            />
            <SidebarSubLink
              name="Accessories Post"
              href="/dashboard/accessories"
              icon={Package}
              active={active}
              setActive={setActive}
              onClickExtra={closeSidebar}
            />
            <SidebarSubLink
              name="Job Post"
              href="/dashboard/job-post"
              icon={Briefcase}
              active={active}
              setActive={setActive}
              onClickExtra={closeSidebar}
            />
          </div>
        )}
      </div>

      <SidebarButton
        name="Settings"
        href="/dashboard/settings"
        icon={Settings}
        active={active}
        setActive={setActive}
        onClickExtra={closeSidebar}
      />

      <SidebarButton
        name="Logout"
        href="/logout"
        icon={LogOut}
        active={active}
        setActive={setActive}
        onClickExtra={closeSidebar}
      />
    </nav>
  );
}

interface SidebarButtonProps {
  name: string;
  href: string;
  icon: React.ElementType;
  active: string;
  setActive: (value: string) => void;
  onClickExtra?: () => void;
}

function SidebarButton({
  name,
  href,
  icon: Icon,
  active,
  setActive,
  onClickExtra,
}: SidebarButtonProps) {
  return (
    <Button
      asChild
      variant={active === name ? "default" : "ghost"}
      className={cn(
        "w-full justify-start flex items-center gap-2 font-medium",
        active === name && "bg-primary text-white hover:bg-primary/90"
      )}
      onClick={() => {
        setActive(name);
        onClickExtra?.();
      }}
    >
      <Link href={href}>
        <Icon className="w-4 h-4" />
        {name}
      </Link>
    </Button>
  );
}

function SidebarSubLink({
  name,
  href,
  icon: Icon,
  active,
  setActive,
  onClickExtra,
}: SidebarButtonProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        setActive(name);
        onClickExtra?.();
      }}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition",
        active === name
          ? "bg-primary text-white"
          : "hover:bg-gray-100 text-gray-700"
      )}
    >
      <Icon className="w-4 h-4" />
      {name}
    </Link>
  );
}
