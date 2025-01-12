import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import PageHead from "@/components/shared/page-head";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/lib/axios";
import { useRouter } from "@/routes/hooks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminUpdateAssessmentPage() {
  const { moduleId } = useParams();
  const [moduleData, setModuleData] = useState<{
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    duration: number;
    userId: string;
    price: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    questions: {
      id: number;
      order: number;
      assessmentId: number;
      text: string;
      type: "SCALE" | "MULTIPLE_CHOICE" | "TRUE_FALSE";
      options: [];
      createdAt: Date;
      updatedAt: Date;
    }[];
  }>();
  const [questions, setQuestions] = useState<
    {
      id: number;
      order: number;
      assessmentId: number;
      text: string;
      type: "SCALE" | "MULTIPLE_CHOICE" | "TRUE_FALSE";
      options: number[];
      createdAt: Date;
      updatedAt: Date;
    }[]
  >([]);
  const [newQuestions, setNewQuestions] = useState<any[]>([]);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  // ** Editing questions **
  const startEditingQuestion = (question: (typeof questions)[0]) => {
    setEditingQuestionId(question.id);
  };

  const saveEditedQuestion = (editedQuestion: (typeof questions)[0]) => {
    setQuestions(questions.map((q) => (q.id === editedQuestion.id ? editedQuestion : q)));
    setEditingQuestionId(null);
  };

  const router = useRouter();

  useEffect(() => {
    axios(`/assessments/${moduleId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        setModuleData(res.data.data);
        setQuestions(res.data.data.questions);
        setName(res.data.data.name);
        setDescription(res.data.data.description);
        setDuration(res.data.data.duration);
        setPrice(res.data.data.price);
      })
      .catch((err) => console.log(err));
  }, [moduleId]);

  const addNewQuestionRow = () => {
    setNewQuestions([
      ...newQuestions,
      {
        order: questions.length + newQuestions.length + 1,
        text: "",
        options: "",
        isEditing: true,
      },
    ]);
  };

  const handleNewQuestionChange = (index: number, field: string, value: string) => {
    const updatedNewQuestions = [...newQuestions];
    updatedNewQuestions[index] = {
      ...updatedNewQuestions[index],
      [field]: value,
    };
    setNewQuestions(updatedNewQuestions);
  };

  const parseScaleOptions = (scaleInput: string): number[] => {
    // Remove any whitespace and convert to number
    const scale = parseInt(scaleInput.trim());

    // Validate the scale input
    if (isNaN(scale) || scale < 1) {
      return []; // Return empty array for invalid input
    }

    // Create an array from 1 to the specified scale
    return Array.from({ length: scale }, (_, i) => i + 1);
  };

  const saveNewQuestion = (index: number) => {
    const newQuestion = newQuestions[index];

    // Parse scale options if the question type is SCALE
    const parsedOptions = newQuestion.type === "SCALE" ? parseScaleOptions(newQuestion.options) : newQuestion.options;

    setQuestions([
      ...questions,
      {
        ...newQuestion,
        options: parsedOptions,
        isEditing: false,
      },
    ]);
    const updatedNewQuestions = newQuestions.filter((_, i) => i !== index);
    setNewQuestions(updatedNewQuestions);
  };

  const handleUpdate = () => {
    const updatedQuestions = [
      ...questions.map((q) => ({
        id: q.id, // Preserve existing question ID for updates
        order: q.order,
        text: q.text,
        type: q.type,
        options: q.options,
      })),
      ...newQuestions.map((nq) => ({
        order: nq.order,
        text: nq.text,
        type: nq.type || "SCALE", // Default type if not specified
        options: nq.type === "SCALE" ? parseScaleOptions(nq.options) : nq.options,
      })),
    ];

    const formData = new FormData();

    // Append text fields
    formData.append("name", name);
    formData.append("description", description);
    formData.append("duration", duration.toString());
    formData.append("price", price.toString());

    // If you want to handle image upload (optional)
    const imageInput = document.getElementById("image-upload") as HTMLInputElement;
    if (imageInput && imageInput.files && imageInput.files[0]) {
      formData.append("image", imageInput.files[0]);
    }

    Promise.all([
      axios(`/admin/assessments/${moduleId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: {
          questions: updatedQuestions,
        },
      }),
      axios(`/admin/assessments/${moduleId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      }),
    ]);

    router.push("/dashboard/admin/modules");
  };

  if (!moduleData) return <div>Loading...</div>;
  return (
    <>
      <ScrollArea className="h-screen w-full">
        <div className="p-4 md:p-8">
          <PageHead title="Employee Management" />
          <Breadcrumbs
            items={[
              { title: "Dashboard", link: "/dashboard/admin" },
              { title: "Modules", link: "/dashboard/admin/modules" },
              { title: `${moduleData.name}`, link: `/dashboard/admin/modules/${moduleId}` },
            ]}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <div className="mt-4 rounded-md border border-input bg-background p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl items-center mx-8">
                <div className="relative cursor-pointer group">
                  <img src={moduleData.imageUrl} className="w-full h-auto object-cover max-w-xs" width={400} height={300} alt={name} />
                  <Input id="image-upload" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Module Name</Label>
                    <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="total_questions">Total Questions</Label>
                    <Input id="total_questions" type="number" value={questions.length} readOnly className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Time Limit (in minutes)</Label>
                    <Input id="duration" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="mt-2" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-md py-4">
              <Label htmlFor="description">Description</Label>
              <Input id="description" type="textarea" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 bg-gray-100" />
            </div>
            <div className="mt-4 py-4">
              <Label>Questions</Label>
              <Table>
                <TableHeader>
                  <TableRow className="border-2">
                    <TableCell>No.</TableCell>
                    <TableCell>Questions</TableCell>
                    <TableCell>Scale</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="border-[1px]">
                  {questions.map((question) => (
                    <TableRow key={question.id} className="">
                      {editingQuestionId === question.id ? (
                        // ** Editing mode **
                        <>
                          <TableCell>
                            <Input
                              type="number"
                              value={question.order}
                              onChange={(e) => {
                                const updatedQuestion = {
                                  ...question,
                                  order: parseInt(e.target.value),
                                };
                                saveEditedQuestion(updatedQuestion);
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="text"
                              value={question.text}
                              onChange={(e) => {
                                const updatedQuestion = {
                                  ...question,
                                  text: e.target.value,
                                };
                                saveEditedQuestion(updatedQuestion);
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="text"
                              value={question.options.length > 0 ? `${question.options[question.options.length - 1]}` : ""}
                              onChange={(e) => {
                                const updatedQuestion = {
                                  ...question,
                                  options: parseScaleOptions(e.target.value),
                                };
                                saveEditedQuestion(updatedQuestion);
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.preventDefault();
                                setEditingQuestionId(null);
                              }}
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </>
                      ) : (
                        // ** View mode **
                        <>
                          <TableCell>{question.order}</TableCell>
                          <TableCell>{question.text}</TableCell>
                          <TableCell>{question.options.length > 0 ? `1 - ${question.options[question.options.length - 1]}` : "N/A"}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.preventDefault();
                                startEditingQuestion(question);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}

                  {newQuestions.map((question, index) => (
                    <TableRow key={`new-${index}`} className="border-[1px]">
                      <TableCell>
                        <Input type="number" value={question.order} onChange={(e) => handleNewQuestionChange(index, "order", e.target.value)} />
                      </TableCell>
                      <TableCell>
                        <Input type="text" value={question.text} onChange={(e) => handleNewQuestionChange(index, "text", e.target.value)} />
                      </TableCell>
                      <TableCell>
                        <Input type="text" value={question.options} onChange={(e) => handleNewQuestionChange(index, "options", e.target.value)} placeholder="Enter scale (e.g., 5)" />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => saveNewQuestion(index)}>
                          <Save className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-8 flex items-center justify-center border-2 p-4">
                <Button type="button" variant="outline" onClick={addNewQuestionRow}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <Button type="submit">Update</Button>
            </div>
          </form>
        </div>
      </ScrollArea>
    </>
  );
}
