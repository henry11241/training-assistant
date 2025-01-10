"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createProgram } from "@/lib/actions";
import { ExerciseName } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(1, { message: "Program name is required." }),
  id: z.string(),
  userId: z.string(),
  totalTime: z.number().min(1, { message: "Program total time is required." }),
  exercises: z
    .array(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1, { message: "Exercise title is required." }),
        reps: z.number().int().min(1, { message: "Reps must be at least 1." }),
        sets: z.number().int().min(1, { message: "Sets must be at least 1." }),
        restTimePerSetInSec: z
          .number()
          .int()
          .min(0, { message: "Rest time per set must be non-negative." }),
        restTimeBtwExInSec: z.number().int().nullable(),
        programId: z.string(),
      }),
    )
    .min(1, { message: "You must select at least one exercise." }),
});

type FormData = z.infer<typeof formSchema>;
type Props = {
  exerciseName: ExerciseName[];
};

export default function CreateProgramForm({ exerciseName }: Props) {
  const defaultOptions = exerciseName.map((item) => item.name);
  const [options, setOptions] = useState<string[]>(defaultOptions);
  const [newOption, setNewOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([""]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddOption = () => {
    if (newOption && !options.includes(newOption)) {
      setOptions((prev) => [...prev, newOption]);
      setSelectedOptions((prev) => {
        const updated = [...prev];
        const emptyIndex = updated.findIndex((item) => item === "");
        if (emptyIndex !== -1) {
          updated[emptyIndex] = newOption;
        } else {
          updated.push(newOption);
        }
        return updated;
      });

      setNewOption("");
      setIsDialogOpen(false);
    }
  };

  const handleSelectChange = (value: string, index: number) => {
    if (value === "add-option") {
      setIsDialogOpen(true);
    } else {
      setSelectedOptions((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
    }
  };

  const { toast } = useToast();
  const programId = uuidv4();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      id: programId,
      userId: "123e4567-e89b-12d3-a456-426614174000",
      totalTime: 0,
      exercises: [
        {
          id: uuidv4(),
          title: "",
          reps: "",
          sets: "",
          restTimePerSetInSec: "",
          restTimeBtwExInSec: null,
          programId: programId,
        },
      ],
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createProgram(data);
      toast({
        title: "Success",
        description: "Program created successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Server error",
        description: "Something went wrong, try contacting the provider.",
        variant: "destructive",
      });
    }
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  return (
    <div className="m-4 w-3/4 rounded-md border">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="m-4 flex flex-col space-y-8"
        >
          {/* Program Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  Enter a name for your program.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Exercise */}
          <FormField
            control={form.control}
            name="exercises"
            render={({ field }) => (
              <>
                {fields.map((item, index) => (
                  <div
                    className="rounded-md border p-4 shadow-md"
                    key={item.id}
                  >
                    <FormItem>
                      <FormLabel>Exercise {index + 1}</FormLabel>
                      <Select
                        value={selectedOptions[index]}
                        onValueChange={(value) =>
                          handleSelectChange(value, index)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {options.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="group"
                              >
                                {option}
                              </SelectItem>
                            ))}
                            <SelectItem
                              value="add-option"
                              className="text-blue-500"
                            >
                              <span className="flex items-center">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit My Exercises
                              </span>
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select from existing list or create a new exercise.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>

                    <div className="flex gap-2">
                      {/* Reps Input */}
                      <FormItem className="flex-1">
                        <FormLabel>Reps</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Reps"
                            defaultValue=""
                            {...form.register(`exercises.${index}.reps`)} // using field for reps
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>

                      {/* Sets Input */}
                      <FormItem className="flex-1">
                        <FormLabel>Sets</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Sets"
                            {...form.register(`exercises.${index}.sets`)} // using field for sets
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>

                    {/* Rest Time per Set (in seconds) */}
                    <FormItem>
                      <FormLabel>Rest Time per Set (in seconds)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Rest Time per Set"
                          {...form.register(
                            `exercises.${index}.restTimePerSetInSec`,
                          )} // using field for restTimePerSetInSec
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    {/* Rest Time Between Exercises (in seconds) */}
                    <FormItem>
                      <FormLabel>
                        Rest Time Between Exercises (in seconds)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Rest Time Between Exercises"
                          {...form.register(
                            `exercises.${index}.restTimeBtwExInSec`,
                          )} // using field for restTimeBtwExInSec
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() =>
                    append({
                      id: uuidv4(),
                      title: "",
                      reps: "",
                      sets: "",
                      restTimePerSetInSec: "",
                      restTimeBtwExInSec: null,
                      programId: programId,
                    })
                  }
                  type="button"
                >
                  Add Another Exercise
                </Button>
              </>
            )}
          />

          {/* Add New Exercise Name Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Exercise</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-option" className="text-right">
                    Exercise Name
                  </Label>
                  <Input
                    id="new-option"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddOption}>Add Exercise</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Total Time */}
          <FormField
            control={form.control}
            name="totalTime"
            render={({ field }) => {
              // Get the current value of totalTime (in seconds)
              const minutes = Math.floor(field.value / 60);
              const seconds = field.value % 60;

              return (
                <FormItem>
                  <FormLabel>Program Total Time</FormLabel>
                  <FormControl>
                    <div className="flex space-x-2">
                      <div className="flex flex-1 flex-col">
                        <FormLabel className="pb-2">Minutes</FormLabel>
                        <Input
                          type="number"
                          placeholder="Minutes"
                          value={minutes || ""}
                          onChange={(e) => {
                            const newMinutes = Number(e.target.value) || 0;
                            const newTotalTime = newMinutes * 60 + seconds; // Calculate total time in seconds
                            field.onChange(newTotalTime);
                          }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <FormLabel className="pb-2">Seconds</FormLabel>
                        <Input
                          type="number"
                          placeholder="Seconds"
                          value={seconds || ""}
                          onChange={(e) => {
                            const newSeconds = Number(e.target.value) || 0;
                            const newTotalTime = minutes * 60 + newSeconds; // Calculate total time in seconds
                            field.onChange(newTotalTime);
                          }}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Program total time in minutes and seconds.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
