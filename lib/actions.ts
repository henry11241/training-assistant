"use server";

import { prisma } from "@/lib/prisma";
import { Program, Exercise } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ExtendedProgram = Program & {
  exercises: Exercise[]; // Exercise type from Prisma schema
};

export async function createProgram(data: ExtendedProgram) {
  await prisma.program.create({
    data: {
      id: data.id,
      name: data.name,
      userId: data.userId,
      totalTime: data.totalTime,
      exercises: {
        create: data.exercises.map((exercise) => ({
          id: exercise.id,
          title: exercise.title,
          reps: exercise.reps,
          sets: exercise.sets,
          restTimePerSetInSec: exercise.restTimePerSetInSec,
          restTimeBtwExInSec: exercise.restTimeBtwExInSec,
        })),
      },
    },
  });;
  revalidatePath("/training-assistant/programs");
  redirect('/training-assistant/programs')
}

async function updateProgramTotalTime(programId: string) {
  const exercises = await prisma.exercise.findMany({
    where: { programId },
  });

  const totalTime = exercises.reduce((sum, exercise) => {
    return (
      sum + exercise.restTimePerSetInSec + (exercise.restTimeBtwExInSec || 0)
    );
  }, 0);

  await prisma.program.update({
    where: { id: programId },
    data: { totalTime },
  });
}

export async function deleteProgram(programId: string) {
  await prisma.program.delete({
    where: { id: programId },
  });

  revalidatePath("/training-assistant/programs");
}
