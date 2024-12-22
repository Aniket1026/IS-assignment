"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../app/static/Vector.png";
import Image from "next/image";
import Dashboard from "../app/static/Dashboard.png";
import Users from "../app/static/Student.png";
import Chapter from "../app/static/Chapter.png";
import Help from "../app/static/Help.png";
import Reports from "../app/static/Report.png";
import Settings from "../app/static/Setting.png";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    icon: Dashboard,
    href: "/",
  },
  {
    title: "Students",
    icon: Users,
    href: "/students",
  },
  {
    title: "Chapter",
    icon: Chapter,
    href: "/chapter",
  },
  {
    title: "Help",
    icon: Help,
    href: "/help",
  },
  {
    title: "Reports",
    icon: Reports,
    href: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      <nav
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-none md:w-[200px] md:border-r md:bg-gray-50/40",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Image
              src={Logo}
              height={42}
              width={98}
              alt="logo"
              className="mx-auto md:mx-0"
            />
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                    pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Image
                    src={item.icon}
                    height={18}
                    width={20}
                    alt={`${item.title} icon`}
                  />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}