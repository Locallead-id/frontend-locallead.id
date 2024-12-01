import { AlertModal } from "@/components/shared/alert-modal";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import PageHead from "@/components/shared/page-head";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "@/routes/hooks";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

import { assesments } from "@/constants/data";
import { useParams } from "react-router-dom";

const AssessmentPage = () => {
  // const [activeTab, setActiveTab] = useState(assesments[0].tabs); // State untuk melacak tab yang aktif
  // const [assessmentState, setAssessmentState] = useState(assesments);
  const [activeTab, setActiveTab] = useState(() => {
    // Retrieve the last active tab from local storage
    const savedActiveTab = localStorage.getItem("activeAssessmentTab");
    return savedActiveTab ? Number(savedActiveTab) : assesments[0].id;
  }); // State untuk melacak tab yang aktif
  const [assessmentState, setAssessmentState] = useState(() => {
    // Try to retrieve saved assessment state from local storage
    const savedState = localStorage.getItem("assessmentState");
    return savedState ? JSON.parse(savedState) : assesments;
  });

  const [assessmentData, setAssessmentData] = useState([]);
  const { assessmentId } = useParams();

  const router = useRouter();
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async (id: Number) => {
    router.push(`/dashboard/${assessmentId}/test/${id}`);
  };

  const onSubmit = (id: number, type: string) => {
    // Ubah status assessment agar tab berikutnya bisa diakses
    const nextIndex = assessmentState.findIndex((item) => item.id === id) + 1;
    const prevIndex = assessmentState.findIndex((item) => item.id === id) - 1;

    if (type === "back" && prevIndex >= 0) {
      setActiveTab(assessmentState[prevIndex].id); // Pindah ke tab sebelum
    }

    if (type === "next" && nextIndex < assessmentState.length) {
      const updatedAssessments = assessmentState.map((assessment, index) => {
        if (index === nextIndex) {
          return { ...assessment, completed: true }; // Set tab berikutnya menjadi completed
        }
        return assessment;
      });

      setAssessmentState(updatedAssessments);
      // setActiveTab(updatedAssessments[nextIndex].tabs); // Pindah ke tab berikutnya
      setActiveTab(updatedAssessments[nextIndex].id); // Pindah ke tab berikutnya
    }

    if (nextIndex === assessmentState.length) {
      router.push("/dashboard");
      localStorage.removeItem("activeAssessmentTab");
      localStorage.removeItem("assessmentState");
    }
  };

  useEffect(() => {
    localStorage.setItem("activeAssessmentTab", activeTab.toString());
  }, [activeTab]);

  // Update local storage whenever assessment state changes
  useEffect(() => {
    localStorage.setItem("assessmentState", JSON.stringify(assessmentState));
  }, [assessmentState]);

  // Populate data from server
  useEffect(() => {
    axios(`/assessments/${assessmentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => setAssessmentData(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="p-4 md:p-8">
        <PageHead title="Assessment LBDQ" />
        <Breadcrumbs
          items={[
            { title: "Dashboard", link: "/dashboard" },
            { title: "LBDQ", link: "/lbdq" },
          ]}
        />
        <div className="flex-1 space-y-4 pt-6">
          <Tabs value={activeTab.toString()} onValueChange={(val) => setActiveTab(Number(val))} className="space-y-4">
            <TabsList className="bg-slate-200 dark:bg-slate-800">
              {assessmentState.map((assessment) => (
                <TabsTrigger key={assessment.id} value={assessment.id.toString()} disabled={!assessment.completed}>
                  {assessment.tabs}
                </TabsTrigger>
              ))}
            </TabsList>
            {assessmentState.map((assessment) => (
              <TabsContent key={assessment.id} value={assessment.id.toString()} className="space-y-4">
                <div className="flex flex-col p-12">
                  <h2>{assessment.tabs}</h2>
                  <p className="pt-4">
                    {activeTab === 1
                      ? `Welcome to assessment ${assessment.description}`
                      : activeTab === 2
                      ? `Informasi Umum\n

Kuesioner ini terdiri dari 100 pertanyaan yang dibagi menjadi 4 bagian
Setiap bagian berisi 25 pertanyaan
Bacalah setiap pertanyaan dengan teliti sebelum menjawab\n\n

Pilihan Jawaban\n
Gunakan skala berikut untuk menjawab setiap pertanyaan:

STS (Sangat Tidak Setuju): 1
TS (Tidak Setuju): 2
RR (Ragu-Ragu): 3
S (Setuju): 4\n
SS (Sangat Setuju): 5\n\n

Cara Pengisian\n
Jawab setiap pertanyaan dengan jujur dan sesuai dengan keadaan/perasaan Anda
Pilih satu jawaban yang paling sesuai untuk setiap pertanyaan
Pastikan tidak ada pertanyaan yang terlewatkan
Jika Anda merasa ragu, pilih pilihan yang paling mendekati perasaan atau pengalaman Anda`
                      : activeTab === 7
                      ? "You have completed the assignemtn"
                      : `you are going to fill section ${assessment.tabs}`}
                  </p>
                  <div className="flex justify-between items-center">
                    {assessment.id !== 1 && assessment.id !== assesments.length ? (
                      <Button onClick={() => onSubmit(assessment.id, "back")} className="font-bold">
                        Back
                      </Button>
                    ) : (
                      ""
                    )}
                    <Button
                      onClick={() => {
                        assessment.id > 2 && assessment.id !== assesments.length ? setOpen(true) : onSubmit(assessment.id, "next");
                      }}
                      className="bg-rose-500 font-bold"
                    >
                      Continue
                    </Button>
                    <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={() => onConfirm(assessment.id - 2)} loading={loading} />
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
