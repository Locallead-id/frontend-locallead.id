"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import PageHead from "@/components/shared/page-head";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { link } from "fs";
import { BriefcaseBusiness, Home, House } from "lucide-react";

export const description = "A radar chart";

const chartData = [
  { skill: "Communication", score: 186 },
  { skill: "Problem Solving", score: 305 },
  { skill: "Team Work", score: 237 },
  { skill: "Adaptability", score: 273 },
  { skill: "Leadership", score: 209 },
  { skill: "Technical Skills", score: 300 },
  { skill: "Time Management", score: 255 },
  { skill: "Creativity", score: 192 },
  { skill: "Work Ethics", score: 268 },
  { skill: "Decision Making", score: 221 },
  { skill: "Attention to Detail", score: 240 },
  { skill: "Stress Management", score: 280 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const EmployeeDetailPage = () => {
  return (
    <div className='p-4 md:p-8 overflow-auto h-full'>
      <PageHead title='Employee Detail' />
      <Breadcrumbs
        items={[
          { title: "Dashboard", link: "/" },
          { title: "Employee", link: "/employee" },
          { title: "Detail", link: "/employee/detail" },
        ]}
      />
      <div className='py-5 text-2xl'>Rezaaaaaa</div>
      <div className='grid md:grid-cols-1 lg:grid-cols-2 mt-5'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto max-h-[300px] mt-16'
          style={{ width: "100%", height: "300px" }}
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey='skill' />
            <PolarGrid />
            <Radar
              dataKey='score'
              fill='var(--color-desktop)'
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
        <div className='sm:mt-5 md:mt-5'>
          <div className='grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-2 gap-3'>
            <div className='flex space-x-5 items-center'>
              <House
                size={40}
                className='text-white bg-emerald-600 p-2 rounded-full'
              />
              <div>
                <p className='text-gray-500 text-sm'>From</p>
                <h3 className='text-xl'>Malang</h3>
              </div>
            </div>
            <div className='flex space-x-5 items-center'>
              <BriefcaseBusiness
                size={40}
                className='text-white bg-pink-800 p-2 rounded-full'
              />
              <div>
                <p className='text-gray-500 text-sm'>Placement</p>
                <h3 className='text-xl'>Malang</h3>
              </div>
            </div>
          </div>
          <div>
            <h3 className='text-xl mt-5 font-medium'>Tipe kepemimpinan :</h3>
            <div className='p-2 dark:bg-background bg-slate-200 rounded-xl mt-2'>
              <h1 className='text-2xl text-center items-center font-semibold dark:text-rose-600 text-cyan-500'>
                Initiate of structure and control
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
