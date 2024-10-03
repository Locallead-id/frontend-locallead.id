"use client";
import DashboardNav from "@/components/shared/dashboard-nav";
import { navItems, BotNavItems } from "@/constants/data";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { ChevronsLeft } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./theme-toggle";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <nav
      className={cn(
        `relative z-10 hidden h-screen flex-none px-3 md:block dark:bg-slate-800`,
        status && "duration-500",
        !isMinimized ? "w-72" : "w-[80px]",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center px-0 py-5 md:px-2",
          isMinimized ? "justify-center " : "justify-between"
        )}
      >
        {!isMinimized && (
          <img
            className='w-10 pl-2'
            src='https://locallead.id/favicon.svg'
            alt='Logo'
          />
        )}
        <ChevronsLeft
          className={cn(
            "size-8 cursor-pointer rounded-full border bg-background text-foreground",
            isMinimized && "rotate-180"
          )}
          onClick={handleToggle}
        />
      </div>
      <div className='flex flex-col h-full justify-between'>
        <div className='space-y-4 py-4 flex-1'>
          <div className='px-2 py-2'>
            <div className='mt-3 space-y-1'>
              <DashboardNav items={navItems} />
            </div>
          </div>
        </div>
        <div className='space-y-4 pt-4 flex-1'>
          <div className='px-2 pt-2'>
            <div className='mt-3 space-y-1'>
              {isMinimized && <ModeToggle />}
              <DashboardNav items={BotNavItems} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
