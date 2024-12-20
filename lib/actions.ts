"use server";

import { prisma } from "@/lib/prisma";

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