import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "Dashboard",
    label: "Dashboard",
    user: "User",
  },
  {
    title: "Leadership",
    href: "/dashboard/leadership",
    icon: "BriefcaseBusiness",
    label: "Leadership",
    user: "User",
  },
  {
    title: "Career Success Potential",
    href: "/dashboard/career",
    icon: "Rocket",
    label: "Career Success Potential",
    user: "User",
  },
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: "Dashboard",
    label: "Dashboard",
    user: "Admin",
  },
  {
    title: "User",
    href: "/dashboard/admin/user",
    icon: "Users",
    label: "Dashboard",
    user: "Admin",
  },
];

export const assesments = [
  {
    id: 1,
    tabs: "Welcome",
    completed: true,
    description:
      "This study attempts to identify the determining factors of leadership behavior...",
  },
  {
    id: 2,
    tabs: "Filling Instructions",
    completed: false,
    description: "Instructions on how to fill in the LBDQ questionnaire...",
  },
  {
    id: 3,
    tabs: "LBDQ (1-25)",
    completed: false,
    description: "Instructions on how to fill in the LBDQ questionnaire...",
  },
  {
    id: 4,
    tabs: "LBDQ (26-50)",
    completed: false,
    description: "Instructions on how to fill in the LBDQ questionnaire...",
  },
  {
    id: 5,
    tabs: "LBDQ (51-75)",
    completed: false,
    description: "Instructions on how to fill in the LBDQ questionnaire...",
  },
  {
    id: 6,
    tabs: "LBDQ (76-100)",
    completed: false,
    description: "Instructions on how to fill in the LBDQ questionnaire...",
  },
  {
    id: 7,
    tabs: "Finish",
    completed: false,
    description: "Congratulations! You have completed the LBDQ questionnaire.",
  },
];

export const BotNavItems: NavItem[] = [
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "User",
    label: "Profile",
    user: "User",
  },
  {
    title: "Logout",
    href: "/",
    icon: "LogOut",
    label: "Logout",
    user: "User",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "User",
    label: "Profile",
    user: "Admin",
  },
  {
    title: "Logout",
    href: "/",
    icon: "LogOut",
    label: "Logout",
    user: "Admin",
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const departments = [
  "Engineering",
  "Sales",
  "Marketing",
  "Human Resources",
  "Finance",
  "Legal",
  "Operations",
  "Customer Support",
  "IT",
];
