import { AlertModal } from "@/components/shared/alert-modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useRouter } from "@/routes/hooks";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useParams } from "react-router-dom";

const tests = [
  {
    id: 1,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 6,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 7,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 8,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 9,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 10,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 11,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 12,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 13,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 14,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 15,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 16,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 17,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 18,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 19,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 20,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 21,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 22,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 23,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 24,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 25,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const TestPage = () => {
  const router = useRouter();
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [sectionQuestions, setSectionQuestions] = useState<
    {
      id: number;
      order: number;
      assessmentId: number;
      text: string;
      type: string;
      options: number[];
      createdAt: string;
      updatedAt: string;
    }[]
  >([]);

  const { assessmentId, sectionId } = useParams();

  const onConfirm = async () => {
    // Set the next tab as active in local storage
    const nextTabIndex = Number(sectionId) + 3;
    localStorage.setItem("activeAssessmentTab", `${nextTabIndex}`);

    router.push(`/dashboard/${assessmentId}/`);
  };

  useEffect(() => {
    axios(`/assessments/${assessmentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        const lastNumber = 25 * Number(sectionId);
        const parsedQuestions = res.data.data.questions.slice(lastNumber - 25, lastNumber);
        setSectionQuestions(parsedQuestions);
      })
      .catch((err) => console.error(err));
  }, []);
  
  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={() => onConfirm()} loading={loading} description="Are you sure you want to submit your answers?" />
      <div className="overflow-auto h-full">
        <div className="px-12 py-9 md:px-56 md:py-12">
          <h2 className="font-bold text-2xl">Selamat mengerjakan!</h2>
          <div className="my-8">
            <div className="flex items-end justify-end space-x-4 me-3 my-4">
              {["STS", "TS", "RR", "S", "SS"].map((option) => (
                <div key={option} className="space-x-2">
                  <h1 className="font-medium text-sm">{option}</h1>
                </div>
              ))}
            </div>
            {sectionQuestions.map((question) => (
              <div key={question.id} className={cn("grid grid-cols-[1fr,auto] gap-4  items-center", question.id % 2 === 0 ? "bg-background" : "dark:bg-slate-800 bg-slate-200", "p-4 rounded-lg")}>
                <Label htmlFor={`question-${question.order}`} className="text-sm">
                  <div className="flex">
                    <h1 className="flex items-center justify-center">{question.order}</h1>
                    <p className="ml-8">{question.text}.</p>
                  </div>
                </Label>
                <RadioGroup id={`question-${question.order}`} className="flex space-x-2">
                  {question.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={`${option}`} id={`${question.order}-${option}`} className="space-x-4" />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
            <div className="mt-8 flex justify-end">
              <Button onClick={() => setOpen(true)} className="font-medium">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPage;
