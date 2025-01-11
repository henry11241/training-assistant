"use client";

import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
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
import { Pencil, X } from "lucide-react";
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

type FormFields = z.infer<typeof formSchema>;
type Props = {
  exerciseName: ExerciseName[];
};

export default function CreateProgramForm({ exerciseName }: Props) {
  const { toast } = useToast();
  const programId = uuidv4();

  // States for managing exercise options
  const defaultOptions = exerciseName.map((item) => item.name);
  const [options, setOptions] = useState<string[]>(defaultOptions);
  const [newOption, setNewOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([""]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      id: programId,
      userId: "123e4567-e89b-12d3-a456-426614174000", // Replace with actual user id
      totalTime: 0,
      exercises: [
        {
          id: uuidv4(),
          title: "",
          reps: 0,
          sets: 0,
          restTimePerSetInSec: 0,
          restTimeBtwExInSec: null,
          programId: programId,
        },
      ],
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "exercises",
    control,
    rules: { required: "You must select at least one exercise." },
  });

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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
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

  return (
    <div className="m-4 w-3/4 rounded-md border">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-4 flex flex-col space-y-8"
        >
          {/* Program Name */}
          <FormField
            control={control}
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

          {fields.map((item, index) => (
            <div className="rounded-md border p-4 shadow-md" key={item.id}>
              <FormItem>
                <FormLabel className="flex justify-between">
                  <span>Exercise {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </FormLabel>

                <FormField
                  control={control}
                  name={`exercises.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            if (value === "add-option") {
                              setIsDialogOpen(true);
                            } else {
                              field.onChange(value);
                            }
                          }}
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`exercises.${index}.reps`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reps</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Reps"
                          {...field}
                          value={field.value === null ? "" : field.value}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`exercises.${index}.sets`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sets</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Sets"
                          {...field}
                          value={field.value === null ? "" : field.value}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`exercises.${index}.restTimePerSetInSec`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rest Time Per Set (seconds)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Rest Time Per Set"
                          {...field}
                          value={field.value === null ? "" : field.value}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`exercises.${index}.restTimeBtwExInSec`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Rest Time Between Exercises (seconds)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Rest Time Between Exercises"
                          value={field.value === null ? "" : field.value}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                reps: 0,
                sets: 0,
                restTimePerSetInSec: 0,
                restTimeBtwExInSec: null,
                programId: programId,
              })
            }
            type="button"
          >
            Add Another Exercise
          </Button>

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
            control={control}
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

          <p className="text-red-500">{errors.exercises?.root?.message}</p>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
