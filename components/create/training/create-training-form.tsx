"use client";

import { useState } from "react";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";

const existingPrograms = [
  "Strength Training",
  "Cardio",
  "Yoga",
  "HIIT",
  "Flexibility",
];

const formSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  program: z.string({
    required_error: "Please select or create an exercise program.",
  }),
  duration: z
    .number({
      required_error: "Duration is required.",
      invalid_type_error: "Duration must be a number.",
    })
    .positive("Duration must be positive."),
  intensity: z.enum(["Low", "Medium", "High"], {
    required_error: "Please select an intensity level.",
  }),
});

export default function CreateTrainingForm() {
  const [programs, setPrograms] = useState(existingPrograms);
  const [newProgram, setNewProgram] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

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

  function handleAddProgram() {
    if (newProgram && !programs.includes(newProgram)) {
      setPrograms([...programs, newProgram]);
      form.setValue("program", newProgram);
      setNewProgram("");
      setIsDialogOpen(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1 text-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select the date of your training session.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="program"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exercise Program</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an exercise program" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program} value={program}>
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose your exercise program or create a new one.
                </FormDescription>
                <FormMessage />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline" className="mt-2">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Program
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Exercise Program</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={newProgram}
                        onChange={(e) => setNewProgram(e.target.value)}
                        placeholder="Enter new program name"
                      />
                      <Button type="button" onClick={handleAddProgram}>
                        Add
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Enter the duration of your training session in minutes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Add Training Session</Button>
        </form>
      </Form>
    </div>
  );
}
