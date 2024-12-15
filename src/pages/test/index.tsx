import { AlertModal } from "@/components/shared/alert-modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAssessment } from "@/lib/assesment";
import { cn } from "@/lib/utils";
import { useRouter } from "@/routes/hooks";
import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

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

  const { assessment, getAssessment } = useAssessment();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      answers: {}, // Tempat penyimpanan jawaban
    },
  });

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      const assessmentId = 1; // Ganti dengan ID yang sesuai
      getAssessment(assessmentId);
      hasFetched.current = true;
    }
  }, [getAssessment]);

  const onConfirm = async (data) => {
    const formattedData = {
      answers: Object.values(data.answers).map((value) => parseInt(value, 10)),
    };
    console.log(formattedData); // Lakukan sesuatu dengan data

    // Simpan data ke localStorage untuk mengupdate tab berikutnya
    const currentIndex = parseInt(
      localStorage.getItem("activeTabIndex") || "0"
    );
    localStorage.setItem("activeTabIndex", (currentIndex + 1).toString());

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:3000/api/assessments/${assessment?.id}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result); // Handle the response from the API

      // router.push(`/dashboard/:assessment/:id`);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      router.push(`/dashboard/:assessment/:id`);
    }
  };

  const validateAllAnswered = () => {
    const values = getValues("answers");
    const totalQuestions = assessment?.questions.length || 0;
    const answeredCount = Object.keys(values).length;
    return answeredCount === totalQuestions;
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
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleSubmit(onConfirm)}
        loading={loading}
        description='Are you sure you want to submit your answers?'
      />
      <div className='overflow-auto h-full'>
        <div className='px-12 py-9 md:px-56 md:py-12'>
          <h2 className='font-bold text-2xl'>Selamat mengerjakan!</h2>
          <form
            onSubmit={handleSubmit((data) => {
              if (validateAllAnswered()) {
                onConfirm(data);
              } else {
                alert("Semua pertanyaan harus dijawab sebelum submit.");
              }
            })}
            className='my-8 space-y-6'
          >
            <div className='flex items-end justify-end space-x-4 me-3 my-4'>
              {["STS", "TS", "RR", "S", "SS"].map((option) => (
                <div key={option} className="space-x-2">
                  <h1 className="font-medium text-sm">{option}</h1>
                </div>
              ))}
            </div>
            {assessment?.questions.map((test) => (
              <div
                key={test.id}
                className={cn(
                  "grid grid-cols-[1fr,auto] gap-4 items-center",
                  test.id % 2 === 0
                    ? "bg-background"
                    : "dark:bg-slate-800 bg-slate-200",
                  "p-4 rounded-lg"
                )}
              >
                <Label htmlFor={`question-${test.id}`} className='text-sm'>
                  <div className='flex'>
                    <h1 className='flex items-center justify-center'>
                      {test.id}
                    </h1>
                    <p className='ml-8'>{test.text}</p>
                  </div>
                </Label>
                <Controller
                  name={`answers.${test.id}`}
                  control={control}
                  rules={{
                    required: "Pertanyaan ini harus dijawab",
                  }}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      id={`question-${test.id}`}
                      className='flex space-x-2'
                    >
                      {["1", "2", "3", "4", "5"].map((option) => (
                        <div
                          key={option}
                          className='flex items-center space-x-2'
                        >
                          <RadioGroupItem
                            value={option}
                            id={`${test.id}-${option}`}
                            className='space-x-4'
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.answers?.[test.id] && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.answers[test.id]?.message}
                  </p>
                )}
              </div>
            ))}
            <div className='mt-8 flex justify-end'>
              <Button type='submit' className='font-medium'>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TestPage;
