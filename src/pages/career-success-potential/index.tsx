import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import PageHead from "@/components/shared/page-head";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const CareerSuccessPotentialPage = () => {
  return (
    <div className='p-4 md:p-8 overflow-auto h-full'>
      <PageHead title='Leadership' />
      <Breadcrumbs
        items={[
          { title: "Dashboard", link: "/dashboard" },
          { title: "Leadership", link: "/dashboard/leadership" },
        ]}
      />
      <div>
        <div className='flex items-center justify-center  mt-8'>
          <h1 className='text-lg font-semibold'>
            Carreer Success Potentian Score
          </h1>
        </div>
        <div className='space-y-5 mt-8 mx-16 flex flex-col'>
          <div className=''>
            <span className=''>Non Organizational</span>
            <div className='flex items-center w-full my-6'>
              <div className='w-full mx-12 relative flex items-center flex-1 h-2 dark:bg-gray-600 bg-slate-200 rounded-full'>
                <div className='absolute left-0 w-4 h-4 bg-cyan-500 rounded-full' />
                <Star className='absolute left-[45%] w-6 h-auto fill-yellow-500 stroke-yellow-500 rounded-full' />
                <Star className='absolute left-[80%] w-6 h-auto dark:fill-slate-300 dark:stroke-slate-300 fill-slate-400 stroke-slate-400 rounded-full' />
                <div className='absolute right-0 w-4 h-4 bg-cyan-500 rounded-full' />
              </div>
            </div>
          </div>
          <div className=''>
            <span className=''>Interpersonal</span>
            <div className='flex items-center w-full my-6'>
              <div className='w-full mx-12 relative flex items-center flex-1 h-2  dark:bg-gray-600 bg-slate-200 rounded-full'>
                <div className='absolute left-0 w-4 h-4 bg-cyan-500 rounded-full' />
                <Star className='absolute left-[40%] w-6 h-auto fill-yellow-500 stroke-yellow-500 rounded-full' />
                <Star className='absolute left-[30%] w-6 h-auto dark:fill-slate-300 dark:stroke-slate-300 fill-slate-400 stroke-slate-400 rounded-full' />
                <div className='absolute right-0 w-4 h-4 bg-cyan-500 rounded-full' />
              </div>
            </div>
          </div>
          <div className=''>
            <span className=''>Non Organizational</span>
            <div className='flex items-center w-full my-6'>
              <div className='w-full mx-12 relative flex items-center flex-1 h-2  dark:bg-gray-600 bg-slate-200 rounded-full'>
                <div className='absolute left-0 w-4 h-4 bg-cyan-500 rounded-full' />
                <Star className='absolute left-[65%] w-6 h-auto fill-yellow-500 stroke-yellow-500 rounded-full' />
                <Star className='absolute left-[50%] w-6 h-auto dark:fill-slate-300 dark:stroke-slate-300 fill-slate-400 stroke-slate-400 rounded-full' />
                <div className='absolute right-0 w-4 h-4 bg-cyan-500 rounded-full' />
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center pt-8 space-x-12'>
            <span className=''>Description:</span>
            <div className='flex items-center space-x-2'>
              <div className='w-4 h-4 bg-cyan-500 rounded-full' />
              <span>Min/Max Score</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Star className='w-6 h-auto fill-yellow-500 stroke-yellow-500 rounded-full' />
              <span>Your Score</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Star className='w-6 h-auto dark:fill-slate-300 dark:stroke-slate-300 fill-slate-400 stroke-slate-400 rounded-full' />
              <span>Old Score</span>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 mt-8'>
          <Card className='flex flex-col items-center p-4'>
            <h1 className='text-lg font-medium'>Summmary</h1>
            <p className='flex flex-1 text-justify items-center justify-center text-sm mt-4 px-8'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Card>
          <Card className='flex flex-col items-center p-4'>
            <img
              src='https://raw.githubusercontent.com/RezaConz/Mocci/7498a86eea932e121f572d2a711c298915f8bbe9/Summary.svg'
              alt=''
            />
            <h1 className='text-lg font-medium'>Ready to retake the test?</h1>
            <p className='flex text-center items-center justify-center text-sm mt-4 px-8'>
              You’re allowed retake the test after a minimum of 3 months{" "}
            </p>
            <Button className='mt-4 mb-4 font-medium'>Retake the test</Button>
          </Card>
        </div>
      </div>

      {/* <div className='h-8 w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-800 flex items-center'>
        <div className='h-0.5 rounded-tl-lg rounded-bl-lg w-3/4 bg-cyan-600' />
        <div className='h-0.5 w-1/4 rounded-tl-lg rounded-bl-lg bg-cyan-200' />
      </div> */}
    </div>
  );
};

export default CareerSuccessPotentialPage;
