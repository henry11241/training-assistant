"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Exercise = {
  id: number;
  name: string;
  reps: number;
  sets: number;
  minutes: number;
  seconds: number;
};

export default function Program() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<Exercise>({
    id: 0,
    name: "",
    reps: 0,
    sets: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentExercise((prev) => ({
      ...prev,
      [name]: name === "name" ? value : parseInt(value) || 0,
    }));
  };

  const handleTimeChange = (type: "minutes" | "seconds", value: string) => {
    setCurrentExercise((prev) => ({ ...prev, [type]: parseInt(value) || 0 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentExercise.name && currentExercise.reps > 0) {
      if (isEditing) {
        setExercises(
          exercises.map((ex) =>
            ex.id === currentExercise.id ? currentExercise : ex,
          ),
        );
        setIsEditing(false);
      } else {
        setExercises([...exercises, { ...currentExercise, id: Date.now() }]);
      }
      setCurrentExercise({
        id: 0,
        name: "",
        reps: 0,
        sets: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };

  const handleEdit = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-1 items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Create Training Program</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <div className="max-w-40 flex-1">
                  <Label htmlFor="exercise-name">Exercise Name</Label>
                  <Input
                    id="exercise-name"
                    name="name"
                    value={currentExercise.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Squats"
                    required
                  />
                </div>
                <div className="w-24">
                  <Label htmlFor="reps">Reps</Label>
                  <Input
                    id="reps"
                    name="reps"
                    type="number"
                    value={currentExercise.reps || ""}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
              </div>
              <div className="max-w-40 flex-1">
                <Label htmlFor="sets">Sets</Label>
                <Input
                  id="sets"
                  name="sets"
                  type="number"
                  value={currentExercise.sets || ""}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
              <div className="flex items-end space-x-4">
                <div className="w-24">
                  <Label>Minutes</Label>
                  <Select
                    value={currentExercise.minutes.toString()}
                    onValueChange={(value) =>
                      handleTimeChange("minutes", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 15 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-24">
                  <Label>Seconds</Label>
                  <Select
                    value={currentExercise.seconds.toString()}
                    onValueChange={(value) =>
                      handleTimeChange("seconds", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sec" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">
                {isEditing ? "Update Exercise" : "Add Exercise"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <h3 className="mb-2 text-lg font-semibold">Exercises:</h3>
            <ul className="w-full space-y-2">
              {exercises.map((exercise) => (
                <li
                  key={exercise.id}
                  className="flex items-center justify-between rounded bg-secondary p-2"
                >
                  <span>
                    {exercise.name} - {exercise.reps} reps, {exercise.sets}{" "}
                    sets, {exercise.minutes}m {exercise.seconds}s
                  </span>
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(exercise)}
                      aria-label="Edit exercise"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(exercise.id)}
                      aria-label="Delete exercise"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
