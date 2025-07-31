"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// Zod schema
const apiFormSchema = z.object({
  apiName: z.string().min(1, "API Name is required"),
  apiDescription: z.string().min(1, "Description is required"),
  apiExpiry: z.string().min(1, "Expiry Date is required"),
});

type ApiFormData = z.infer<typeof apiFormSchema>;

export default function APIForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: ApiFormData) => void;
  defaultValues?: Partial<ApiFormData>;
}) {
  const form = useForm<ApiFormData>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: defaultValues || {
      apiName: "",
      apiDescription: "",
      apiExpiry: "",
    },
  });

  // List of form fields to render
  const formList: {
    name: keyof ApiFormData;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    {
      name: "apiName",
      label: "API Name",
      type: "text",
      placeholder: "e.g. My App Key",
    },
    {
      name: "apiDescription",
      label: "Description",
      type: "text",
      placeholder: "What is this key used for?",
    },
    {
      name: "apiExpiry",
      label: "Expiry Date",
      type: "date",
      placeholder: "",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 py-2 w-[40vw]">
          {formList.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={item.type}
                      placeholder={item.placeholder}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="block ml-auto mt-4">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Form>
  );
}
