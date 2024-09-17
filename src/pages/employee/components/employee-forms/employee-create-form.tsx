import Heading from "@/components/shared/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departments } from "@/constants/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const employeeFormSchema = z
  .object({
    fullname: z
      .string({ required_error: "Full name is required" })
      .min(1, { message: "firstname is should be at least 1 character" }),
    username: z.string().min(1, { message: "username is required" }),
    departement: z.string().min(1, { message: "departement is required" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    position: z.string().min(1, { message: "position is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type EmployeeFormSchemaType = z.infer<typeof employeeFormSchema>;

const EmployeeCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const form = useForm<EmployeeFormSchemaType>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {},
  });

  const onSubmit = (values: EmployeeFormSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Form values", form.getValues());
    console.log(values);
  };

  return (
    <div className='px-2'>
      <div className='flex items-center justify-center text-2xl font-bold'>
        <img
          className='w-12 h-12 mr-2'
          src='https://locallead.id/favicon.svg'
          alt='Logo'
        />
      </div>

      <Heading
        title={"Add New Employee"}
        description={""}
        className='space-y-2 py-4 text-center'
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4'
          autoComplete='off'
        >
          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Enter your full name'
                    {...field}
                    className=' px-4 py-6 shadow-inner drop-shadow-xl'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Enter your username'
                      {...field}
                      className=' px-4 py-6 shadow-inner drop-shadow-xl'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='departement'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("departement", value)
                      } // Set the form value here
                    >
                      <SelectTrigger className='px-4 py-6 shadow-inner drop-shadow-xl'>
                        <SelectValue placeholder='Select a departement' />
                      </SelectTrigger>
                      <SelectContent className='max-h-60 overflow-y-auto'>
                        <SelectGroup>
                          <SelectLabel>Departement</SelectLabel>
                          {departments.map((department) => (
                            <SelectItem value={department}>
                              {department}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Enter your email'
                      {...field}
                      className=' px-4 py-6 shadow-inner drop-shadow-xl'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='position' 
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Enter your position'
                      {...field}
                      className=' px-4 py-6 shadow-inner drop-shadow-xl'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-1 gap-x-8 gap-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Enter your password'
                      {...field}
                      className=' px-4 py-6 shadow-inner drop-shadow-xl'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Enter your confirmPassword'
                      {...field}
                      className=' px-4 py-6 shadow-inner drop-shadow-xl'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex items-center justify-center gap-4'>
            <Button
              type='button'
              variant='secondary'
              className='rounded-full '
              size='lg'
              onClick={modalClose}
            >
              Cancel
            </Button>
            <Button type='submit' className='rounded-full' size='lg'>
              Add Employee
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeCreateForm;
