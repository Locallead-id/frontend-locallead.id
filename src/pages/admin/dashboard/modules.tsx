import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import AssessmentCard from "@/pages/dashboard/components/assesment";
import { Link } from "react-router-dom";
import PageHead from "@/components/shared/page-head";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import TableSearchInput from "@/components/shared/table-search-input";
import ModuleCreateForm from "../components/create-module-form";
import PopupModalAssessment from "@/components/shared/modal-add-assessment";

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
    axiosInstance("/admin/assessments", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => setAssessmentsData(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  {
    console.log(assessmentsData);
  }
  return (
    <>
      <div className="overflow-auto h-full w-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <PageHead title="Module Management" />
          <Breadcrumbs
            items={[
              { title: "Dashboard", link: "/dashboard/admin" },
              { title: "Modules", link: "/dashboard/admin/modules" },
            ]}
          />
          <div className="flex w-full gap-4 pb-4">
            <TableSearchInput placeholder="Search module here" />
          </div>
          <div className="relative">
            <ScrollArea>
              <div className="flex gap-4">
                {assessmentsData.map((assessment) => (
                  <Link key={assessment.id} to={`/dashboard/admin/modules/${assessment.id}`}>
                    <AssessmentCard assessment={assessment} className="w-[250px] min-h-64" aspectRatio="square" width={200} height={300} />
                  </Link>
                ))}

                <div
                  className="
              "
                >
                  <PopupModalAssessment renderModal={(onclose) => <ModuleCreateForm modalClose={onclose} />}></PopupModalAssessment>
                </div>
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
