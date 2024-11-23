"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "Excercise name is required." }),
  reps: z.number().min(1, { message: "Reps must be at least 1." }), 
  sets: z.number().min(1, { message: "Sets must be at least 1." }), 
  minutes: z.number().nonnegative({ message: "Minutes cannot be negative." }),
  seconds: z
    .number()
    .int()
    .min(0)
    .max(59, { message: "Seconds must be between 0 and 59." }),
});

export default function CreateProgramForm() {
  const form = useForm();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Training session added",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    console.log(values);
    // Here you would typically send this data to your backend
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exercise Name</FormLabel>
                <FormControl>
                  <Input placeholder="exercise name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your exercise name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
