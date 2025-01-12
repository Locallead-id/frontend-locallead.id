import Heading from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const moduleFormSchema = z.object({
  name: z.string({ required_error: "Module name is required" }).min(1, { message: "firstname is should be at least 1 character" }),
  description: z.string().min(1, { message: "Description is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  price: z.string().min(1, { message: "Enter a valid price" }),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    })
    .optional(),
});

type ModuleFormSchemaType = z.infer<typeof moduleFormSchema>;

const ModuleCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const form = useForm<ModuleFormSchemaType>({
    resolver: zodResolver(moduleFormSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      duration: "",
      image: undefined,
    },
  });
  const navigate = useNavigate();

  const onSubmit = (values: ModuleFormSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("price", values.price.toString());
    formData.append("description", values.description);
    formData.append("duration", values.duration.toString());

    if (values.image) formData.append("image", values.image);

    axios("/admin/assessments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => res)
      .catch((err) => console.log(err));
    console.log(formData);
    navigate("");
  };

  return (
    <div className="px-2">
      <div className="flex items-center justify-center text-2xl font-bold">
        <img className="w-12 h-12 mr-2" src="https://locallead.id/favicon.svg" alt="Logo" />
      </div>

      <Heading title={"Add New Module"} description={""} className="space-y-2 py-4 text-center" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col items-center justify-center gap-2 w-full">
                    <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center w-1/2 bg-gray-200 text-gray-800 p-8 rounded-xl hover:bg-gray-400 hover:text-white transition">
                      <Plus className="h-10 w-10 mb-2 text-center" />
                      <h3 className="text-center text-sm font-medium">Add Cover</h3>
                    </label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...field}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                      }}
                    />
                    {value && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">Selected file: {value.name}</p>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter module name" {...field} className=" px-4 py-6 shadow-inner drop-shadow-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter module price" {...field} className=" px-4 py-6 shadow-inner drop-shadow-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter module duration in minutes" {...field} className=" px-4 py-6 shadow-inner drop-shadow-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter module description" {...field} className=" px-4 py-6 shadow-inner drop-shadow-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-end justify-between gap-4">
            <Button type="button" variant="secondary" className="rounded-full border-[##F6517D] border-2" size="lg" onClick={modalClose}>
              Cancel
            </Button>
            <Button type="submit" className="rounded-full bg-[#F6517D]" size="lg">
              Create Module
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ModuleCreateForm;
