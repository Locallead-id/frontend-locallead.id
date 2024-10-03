import PageHead from "@/components/shared/page-head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssessmentCard, { EmployeeAssessment } from "./components/assesment";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Check, ListCheck, Timer } from "lucide-react";
import { useRouter } from "@/routes/hooks";

export const employeeAssessments: EmployeeAssessment[] = [
  {
    title: "The Leadership Behavior Description Questionnaire (LBDQ)",
    description: "technical skills",
    image:
      "https://i.pinimg.com/736x/10/b6/03/10b6036d9dc7ebe236aed2d5e65b1e2a.jpg",
    url: "LBDQ",
    progress: 2,
  },
  {
    title: "The Leadership Behavior Description Questionnaire (LBDQ)",
    description: "technical skills",
    image:
      "https://i.pinimg.com/736x/43/a8/f3/43a8f35f1c56b7c9d63c0a8f8d0c14b0.jpg",
    url: "LBDQ",
    progress: 2,
  },
];

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div className='overflow-auto h-full'>
      <PageHead title='Dashboard' />
      <div className='flex-1 space-y-4 p-4 pt-6 md:p-8'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger disabled value='analytics'>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <Card className='bg-slate-100 dark:bg-slate-800'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Completion form
                  </CardTitle>
                  <Check className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>1</div>
                  <p className='text-xs text-muted-foreground'></p>
                </CardContent>
              </Card>
              <Card className='bg-slate-100 dark:bg-slate-800'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Questions Answered
                  </CardTitle>
                  <ListCheck className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>25</div>
                  <p className='text-xs text-muted-foreground'>question</p>
                </CardContent>
              </Card>
              <Card className='bg-slate-100 dark:bg-slate-800'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+12,234</div>
                  <p className='text-xs text-muted-foreground'>
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className='bg-slate-100 dark:bg-slate-800'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Average Completion
                  </CardTitle>
                  <Timer className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>15</div>
                  <p className='text-xs text-muted-foreground'>minutes</p>
                </CardContent>
              </Card>
            </div>
            <h1 className='text-3xl font-bold tracking-tight'>Quesionarre</h1>
            <div className='relative'>
              <ScrollArea>
                <div className='flex space-x-4 pb-4'>
                  {employeeAssessments.map((assessment) => (
                    <AssessmentCard
                      onClick={() =>
                        router.push(`/dashboard/${assessment.url}`)
                      }
                      key={assessment.image}
                      assessment={assessment}
                      className='w-[250px]'
                      aspectRatio='square'
                      width={200}
                      height={300}
                      progressAssessment={assessment.progress}
                    />
                  ))}
                </div>
                <ScrollBar orientation='horizontal' />
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
