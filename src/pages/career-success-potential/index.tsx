import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import PageHead from "@/components/shared/page-head";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const CareerSuccessPotentialPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          "http://localhost:3000/api/assessments/1/result",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>; // Placeholder saat data belum dimuat
  }

  const { score } = data;
  const jobSuccess = score[0]?.job_success * 10 || 0;
  const interpersonalSuccess = score[0]?.interpersonal_success * 10 || 0;
  const nonOrganisationalSuccess =
    score[0]?.non_organisational_success * 10 || 0;

  const progressData = [
    { label: "Job Success", value: jobSuccess },
    { label: "Interpersonal", value: interpersonalSuccess },
    { label: "Non Organizational", value: nonOrganisationalSuccess },
  ];

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
        <div className='flex items-center justify-center mt-8'>
          <h1 className='text-lg font-semibold'>
            Career Success Potential Score
          </h1>
        </div>
        <div className='space-y-5 mt-8 mx-16 flex flex-col'>
          {progressData.map(({ label, value }, index) => (
            <div key={index}>
              <span>{label}</span>
              <div className='flex items-center w-full my-6'>
                <div className='w-full mx-12 relative flex items-center flex-1 h-2 dark:bg-gray-600 bg-slate-200 rounded-full'>
                  <div className='absolute left-0 w-4 h-4 bg-cyan-500 rounded-full' />
                  <Star
                    className='absolute'
                    style={{
                      left: `${value}%`,
                      width: "24px",
                      height: "auto",
                      fill: "yellow",
                      stroke: "yellow",
                      borderRadius: "50%",
                    }}
                  />
                  <div className='absolute right-0 w-4 h-4 bg-cyan-500 rounded-full' />
                </div>
              </div>
            </div>
          ))}
          <div className='flex items-center justify-center pt-8 space-x-12'>
            <span>Description:</span>
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
            <h1 className='text-lg font-medium'>Summary</h1>
            <p className='flex flex-1 text-justify items-center justify-center text-sm mt-4 px-8'>
              {data.summary || "No summary provided."}
            </p>
          </Card>
          <Card className='flex flex-col items-center p-4'>
            <img
              src='https://raw.githubusercontent.com/RezaConz/Mocci/7498a86eea932e121f572d2a711c298915f8bbe9/Summary.svg'
              alt='Summary'
            />
            <h1 className='text-lg font-medium'>Ready to retake the test?</h1>
            <p className='flex text-center items-center justify-center text-sm mt-4 px-8'>
              You’re allowed to retake the test after a minimum of 3 months
            </p>
            <Button className='mt-4 mb-4 font-medium'>Retake the test</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CareerSuccessPotentialPage;
