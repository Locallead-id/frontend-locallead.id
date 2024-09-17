import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "Dashboard",
    label: "Dashboard",
  },
  {
    title: "Employee",
    href: "/employee",
    icon: "User",
    label: "Employee",
  },
  {
    title: "Comparison",
    href: "/comparison",
    icon: "ChartArea",
    label: "Comparison",
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
