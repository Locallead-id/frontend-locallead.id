import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import AssessmentCard from "@/pages/dashboard/components/assesment";
import { Link } from "react-router-dom";

export default function AdminModulePage() {
  const [assessmentsData, setAssessmentsData] = useState<
    {
      id: number;
      name: string;
      description: string;
      imageUrl: string;
      duration: number;
      userId: number;
      price: number;
      isActive: true;
      createdAt: string;
      updatedAt: string;
    }[]
  >([]);

  useEffect(() => {
    axios("/admin/assessments", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => setAssessmentsData(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="overflow-auto h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {assessmentsData.map((assessment) => (
                  <Link key={assessment.id} to={`/dashboard/admin/${assessment.id}`}>
                    <AssessmentCard assessment={assessment} className="w-[250px]" aspectRatio="square" width={200} height={300} progressAssessment={0} />
                  </Link>
                ))}
              </div>
              {/* Dialog here */}
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}
