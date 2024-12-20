"use server";

import { prisma } from "@/lib/prisma";
import { Program } from "@prisma/client";

export async function fetchPrograms() {
  try {
    const programs = await prisma.program.findMany();
    return programs;
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw new Error("Failed to fetch programs");
  }
}

export async function fetchProgram(programId: Program['id']) {
  try {
    const programWithExercises = await prisma.program.findUnique({
      where: {
        id: programId, 
      },
      include: {
        exercises: true, 
      },
    });
    return programWithExercises
  } catch (error) {
    console.error("Error fetching program:", error);
    throw new Error("Failed to fetch program");
  }
}
