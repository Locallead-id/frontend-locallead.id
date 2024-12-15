import Heading from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";

const employeeFormSchema = z
  .object({
    fullname: z.string({ required_error: "Full name is required" }).min(1, { message: "firstname is should be at least 1 character" }),
    isPremium: z.boolean({ required_error: "Premium status is required" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type EmployeeFormSchemaType = z.infer<typeof employeeFormSchema>;

const EmployeeCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const form = useForm<EmployeeFormSchemaType>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      fullname: "",
      isPremium: false,
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values: EmployeeFormSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    axios("/admin/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: { email: values.email, password: values.password, isPremium: values.isPremium, fullName: values.fullname },
    })
      .then((res) => res)
      .catch((err) => console.log(err));
    navigate("");
  };

  return (
    <div className="px-2">
      <div className="flex items-center justify-center text-2xl font-bold">
        <img className="w-12 h-12 mr-2" src="https://locallead.id/favicon.svg" alt="Logo" />
      </div>

      <Heading title={"Add New Employee"} description={""} className="space-y-2 py-4 text-center" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter user full name" {...field} className=" px-4 py-6 shadow-inner drop-shadow-xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="isPremium"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => form.setValue("isPremium", value === "true")} // Set the form value here
                    >
                      <SelectTrigger className="px-4 py-6 shadow-inner drop-shadow-xl">
                        <SelectValue placeholder="Select user account premium status" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        <SelectGroup>
                          <SelectLabel>Premium Status</SelectLabel>

                          <SelectItem value={"true"}>{"Premium"}</SelectItem>

                          <SelectItem value={"false"}>{"Basic"}</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter user email" {...field} className=" px-4 py-6 shadow-inner drop-shadow-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter user password" {...field} className=" px-4 py-6 shadow-inner drop-shadow-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter user password again" {...field} className=" px-4 py-6 shadow-inner drop-shadow-xl" />
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
              Add Employee
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeCreateForm;
