import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "Dashboard",
    label: "Dashboard",
    user: "USER",
  },
  {
    title: "Leadership",
    href: "/dashboard/leadership",
    icon: "BriefcaseBusiness",
    label: "Leadership",
    user: "USER",
  },
  {
    title: "Career Success Potential",
    href: "/dashboard/career",
    icon: "Rocket",
    label: "Career Success Potential",
    user: "USER",
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
      "This study attempts to identify the determining factors of leadership behavior using the LBDQ XII for the Indonesian sample. The lack of country-specific leadership style was encouraged by cross-cultural scholars to acknowledge how national culture plays an important role in making the leadership theory apply well in specific countries. For this initial study, we run a focus group discussion in the targeted sector using semi-structured interviews and a collaborative study of 30 business people. The LBDQ XII, consisting of 100 instruments was also distributed and coded qualitatively, resulting in a combination of perspectives on how the variance of LBDQ XII is applied to the population of the study. The study results factors that Indonesian prefer to have leaders that represent and emphasize production and most of the respondents disagree that leaders in Indonesia are associated with a superior orientation behavior. This study is part of the long-run quantitative project, therefore limitations of this initial study are also discussed in this paper.",
  },
  {
    id: 2,
    tabs: "Filling Instructions",
    completed: false,
    description: "Instructions on how to fill in the PCSS questionnaire... \n\n 1 = Sangat Tidak Setuju (STS) \n 2 = Tidak Setuju (TS) \n 3 = Netral / Ragu-ragu (RR) \n 4 = Setuju (S) \n 5 = Sangat Setuju (SS)",
  },
  {
    id: 3,
    tabs: "PCSS (1-9)",
    completed: false,
    description: "Let's start PCSS assessment...",
  },
  {
    id: 4,
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
