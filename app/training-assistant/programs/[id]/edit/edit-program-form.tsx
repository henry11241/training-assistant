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
  name: z.string().min(1, { message: "Program name is required." }),
  totalTime: z.number().nonnegative({ message: "Minutes cannot be negative." }),
  
});

export default function EditProgramForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Program Created!",
          description: `Program: ${result.name} was successfully created.`,
        });
      } else {
        throw new Error("Failed to create program");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while creating the program.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program Name</FormLabel>
                <FormControl>
                  <Input placeholder="program name" {...field} />
                </FormControl>
                <FormDescription>This is your program name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 lg:gap-6">
            <FormField
              control={form.control}
              name="reps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reps</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sets</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 lg:gap-6">
            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minutes</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seconds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seconds</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormDescription className="relative -top-8">This </FormDescription>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
