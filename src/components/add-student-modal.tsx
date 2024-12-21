"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addStudent } from "@/lib/redux/studentSlice";
import { AppDispatch } from "@/lib/redux/store";

const courses = [
  { id: "cbse9-maths", label: "CBSE9 MATHS" },
  { id: "cbse9-science", label: "CBSE9 SCIENCE" },
  { id: "cbse10-maths", label: "CBSE10 MATHS" },
  { id: "cbse10-science", label: "CBSE10 SCIENCE" },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  cohort: z.string().min(1, {
    message: "Please select a cohort.",
  }),
  status: z.enum(["active", "inactive"]),
  courses: z
    .array(z.string())
    .min(1, { message: "Please select at least one course." })
    .max(2, { message: "You can select up to 2 courses." }),
});

export function AddStudentModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cohort: "",
      status: "active",
      courses: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(
      addStudent({
        ...values,
        dateJoined: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      })
    );
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add new Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new student</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Student name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cohort"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cohort</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a cohort" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
                      <SelectItem value="AY 2023-24">AY 2023-24</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courses"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Courses</FormLabel>
                  </div>
                  {courses.map((course) => (
                    <FormField
                      key={course.id}
                      control={form.control}
                      name="courses"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={course.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(course.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        course.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== course.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {course.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add Student</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}