import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import PageHead from "@/components/shared/page-head";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BriefcaseBusiness, Home } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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

const leadershipProfile = [
  {
    name: "Tolerance of Uncertainty",
    description:
      "Menggambarkan sejauh mana pemimpin mampu mentolerir ketidakpastian yang terjadi",
    score: 94.67,
  },
  {
    name: "Tolerance of Uncertainty",
    description:
      "Menggambarkan sejauh mana pemimpin mampu mentolerir ketidakpastian yang terjadi",
    score: 20,
  },
  {
    name: "Tolerance of Uncertainty",
    description:
      "Menggambarkan sejauh mana pemimpin mampu mentolerir ketidakpastian yang terjadi",
    score: 50,
  },
  {
    name: "Tolerance of Uncertainty",
    description:
      "Menggambarkan sejauh mana pemimpin mampu mentolerir ketidakpastian yang terjadi",
    score: 45,
  },
  {
    name: "Tolerance of Uncertainty",
    description:
      "Menggambarkan sejauh mana pemimpin mampu mentolerir ketidakpastian yang terjadi",
    score: 94.67,
  },
];

const LeadershipPage = () => {
  return (
    <div className='p-4 md:p-8 overflow-auto h-full'>
      <PageHead title='Leadership' />
      <Breadcrumbs
        items={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Leadership", link: "/dashboard/leadership" },
        ]}
      />
      <div className='grid md:grid-cols-2 gap-8'>
        <div className='flex flex-col md:ms-2 lg:ms-4'>
          <h1 className='text-xl font-medium mt-8'>Overall Stats</h1>
          <div className='flex flex-1 items-center justify-center'>
            <ChartContainer
              config={chartConfig}
              className='mx-auto md:h-[200px] lg:h-[300px] w-auto mt-4'
            >
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <PolarAngleAxis dataKey='skill' />
                <PolarGrid />
                <Radar
                  dataKey='score'
                  fill='var(--color-desktop)'
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ChartContainer>
          </div>
        </div>
        <div className='md:ms-2 lg:ms-4 lg:me-12'>
          <h1 className='text-xl font-medium mt-8'>Summary</h1>
          <h3 className='font-bold text-2xl mb-6 mt-4'>Jesicaaa</h3>
          <div className='flex justify-between'>
            <div className='flex space-x-5 items-center mt-4'>
              <div className='p-2 bg-slate-200 rounded-full'>
                <Home className='stroke-green-600' />
              </div>
              <div className='flex flex-col -space-y-1'>
                <h1 className='text-sm font-normal'>Asal</h1>
                <h2 className='text-lg font-medium'>Jepara</h2>
              </div>
            </div>
            <div className='flex space-x-5 items-center mt-4'>
              <div className='p-2 bg-slate-200 rounded-full'>
                <BriefcaseBusiness className='stroke-rose-600' />
              </div>
              <div className='flex flex-col -space-y-1'>
                <h1 className='text-sm font-normal'>Kantor</h1>
                <h2 className='text-lg font-medium'>Semarang</h2>
              </div>
            </div>
          </div>
          <h1 className='text-xl font-semibold my-8'>Tipe Kepemimpinan Anda</h1>
          <div className='flex flex-grow bg-slate-200 dark:bg-slate-800 p-4 rounded-lg'>
            <p className='text-base font-medium dark:text-[#36DBFF] text-cyan-500'>
              Tolerance of Uncertainty: 94.67%
            </p>
          </div>
          <p className='mt-6'>
            Menggambarkan sejauh mana pemimpin mampu mentolerir ketidakpastian
            yang terjadi
          </p>
          <p className='mt-8'>Tanggal Survey: 15 September 2024</p>
        </div>
      </div>
      <div className='p-4'>
        <h1 className='text-xl font-medium mt-8'>Leadership Profiling</h1>
        <div className='space-y-6 mt-8'>
          {leadershipProfile.map((profile, index) => (
            <div className='grid md:grid-cols-2 grid-cols-1'>
              <div className=''>
                <h1 className='font-medium '>{profile.name}</h1>
                <p className='text-xs'>{profile.description}</p>
              </div>
              <div className='flex items-center w-full my-6'>
                <div className='w-full mx-12 relative flex items-center flex-1 h-2 bg-slate-200 dark:bg-gray-600 rounded-full'>
                  <div
                    className='absolute left-0  h-2 bg-cyan-500 rounded-full'
                    style={{ width: `${profile.score+2}%` }}
                  />
                  <div
                    className='absolute  w-4 h-4 bg-cyan-300 rounded-full'
                    style={{ left: `${profile.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadershipPage;
