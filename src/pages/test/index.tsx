/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { AlertModal } from "@/components/shared/alert-modal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import PageHead from "@/components/shared/page-head";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "@/routes/hooks";
import { useEffect, useState } from "react";

import { assesments } from "@/constants/data";
import { useAssessment } from "@/lib/assesment";

const AssessmentPage = () => {
  const [activeTab, setActiveTab] = useState(() => {
    // Ambil tab terakhir dari localStorage, jika ada
    const lastIndex = parseInt(localStorage.getItem("activeTabIndex") || "0");
    return assesments[lastIndex]?.tabs || assesments[0].tabs;
  });

  const [assessmentState, setAssessmentState] = useState(assesments);

  const router = useRouter();
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);

  const { assessment, getAssessment } = useAssessment();

  useEffect(() => {
    const assessmentId = 1; // Ganti dengan ID yang sesuai
    getAssessment(assessmentId);
  }, []);

  useEffect(() => {
    // Simpan tab aktif ke localStorage setiap kali berubah
    const currentIndex = assessmentState.findIndex(
      (assessment) => assessment.tabs === activeTab
    );
    localStorage.setItem("activeTabIndex", currentIndex.toString());
  }, [activeTab]);

  const onConfirm = async (id: Number) => {
    router.push(`/dashboard/:assessment/test/${id}`);
  };

  const onSubmit = (id: number, type: string) => {
    // Ubah status assessment agar tab berikutnya bisa diakses
    const nextIndex = assessmentState.findIndex((item) => item.id === id) + 1;
    const prevIndex = assessmentState.findIndex((item) => item.id === id) - 1;

    if (type === "back" && prevIndex >= 0) {
      setActiveTab(assessmentState[prevIndex].tabs); // Pindah ke tab sebelum
    }

    if (type === "next" && nextIndex < assessmentState.length) {
      const updatedAssessments = assessmentState.map((assessment, index) => {
        if (index === nextIndex) {
          return { ...assessment, completed: true }; // Set tab berikutnya menjadi completed
        }
        return assessment;
      });

      setAssessmentState(updatedAssessments);
      setActiveTab(updatedAssessments[nextIndex].tabs); // Pindah ke tab berikutnya
    }

    // Arahkan ke `/dashboard/career` pada tab terakhir
    if (nextIndex === assessmentState.length) {
      router.push("/dashboard/career");
    }
  };

  return (
    <>
      <div className='p-4 md:p-8'>
        <PageHead title='Assessment' />
        <Breadcrumbs
          items={[
            { title: "Dashboard", link: "/dashboard" },
            { title: "PCSS", link: "/" },
          ]}
        />
        <div className='flex-1 space-y-4 pt-6'>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className='space-y-4'
          >
            <TabsList className='bg-slate-200 dark:bg-slate-800'>
              {assessmentState.map((assessment) => (
                <TabsTrigger
                  key={assessment.id}
                  value={assessment.tabs}
                  disabled={!assessment.completed}
                >
                  {assessment.tabs}
                </TabsTrigger>
              ))}
            </TabsList>
            {assessmentState.map((assessment) => (
              <TabsContent
                key={assessment.id}
                value={assessment.tabs}
                className='space-y-4'
              >
                <div className='flex flex-col p-12'>
                  <h2>{assessment.tabs}</h2>
                  <p
                    className='pt-4 text-justify'
                    dangerouslySetInnerHTML={{
                      __html: assessment.description.replace(/\n/g, "<br />"),
                    }}
                  ></p>
                  <div className='flex justify-between items-center mt-8'>
                    {assessment.id !== 1 ? (
                      <Button
                        onClick={() => onSubmit(assessment.id, "back")}
                        className='font-bold'
                      >
                        Back
                      </Button>
                    ) : null}
                    <Button
                      onClick={() => {
                        if (assessment.id === assessmentState.length) {
                          // Tab terakhir
                          router.push("/dashboard/career");
                        } else if (
                          assessment.id > 2 &&
                          assessment.id !== assesments.length
                        ) {
                          setOpen(true);
                        } else {
                          onSubmit(assessment.id, "next");
                        }
                      }}
                      className='bg-rose-500 font-bold'
                    >
                      {assessment.id === assessmentState.length
                        ? "Finish"
                        : "Continue"}
                    </Button>
                    <AlertModal
                      isOpen={open}
                      onClose={() => setOpen(false)}
                      onConfirm={() => onConfirm(assessment.id - 2)}
                      loading={loading}
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AssessmentPage;