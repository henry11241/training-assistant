import { prisma } from "@/lib/prisma";
import {
  userData,
  programData,
  exerciseData,
  trainingData,
  exerciseNameData,
} from "@/lib/placeholder-data";

async function seedUsers() {
  await prisma.user.createMany({
    data: userData,
  });
}

async function seedPrograms() {
  await Promise.all(
    programData.map((program) => {
      const userId = program.user?.connect?.id;
      if (!userId || typeof userId !== "string") {
        throw new Error(`Invalid userId provided for program: ${program.id}`);
      }

      return prisma.program.create({
        data: {
          id: program.id,
          name: program.name,
          userId: userId,
          totalTime: program.totalTime,
        },
      });
    }),
  );
}

async function seedExercises() {
  await Promise.all(
    exerciseData.map((exercise) => {
      const programId = exercise.program?.connect?.id;
      if (!programId || typeof programId !== "string") {
        throw new Error(
          `Invalid programId provided for exercise: ${exercise.id}`,
        );
      }

      return prisma.exercise.create({
        data: {
          id: exercise.id,
          title: exercise.title,
          reps: exercise.reps,
          sets: exercise.sets,
          restTimePerSetInSec: exercise.restTimePerSetInSec,
          restTimeBtwExInSec: exercise.restTimeBtwExInSec,
          programId: programId,
        },
      });
    }),
  );
}

async function seedTraining() {
  await Promise.all(
    trainingData.map((training) => {
      const userId = training.user?.connect?.id;
      const programId = training.program?.connect?.id;

      if (!userId || typeof userId !== "string") {
        throw new Error(`Invalid userId provided for training: ${training.id}`);
      }

      if (!programId || typeof programId !== "string") {
        throw new Error(
          `Invalid programId provided for training: ${training.id}`,
        );
      }

      return prisma.training.create({
        data: {
          id: training.id,
          name: training.name,
          createdAt: training.createdAt,
          userId: userId,
          programId: programId,
        },
      });
    }),
  );
}

async function seedExerciseNames() {
  await Promise.all(
    exerciseNameData.map((exerciseName) => {
      const userId = exerciseName.user?.connect?.id;
      if (!userId || typeof userId !== "string") {
        throw new Error(
          `Invalid userId provided for exerciseName: ${exerciseName.id}`,
        );
      }

      return prisma.exerciseName.create({
        data: {
          id: exerciseName.id,
          name: exerciseName.name,
          userId: userId,
        },
      });
    }),
  );
}

export async function GET() {
  try {
    await prisma.exerciseName.deleteMany();
    await prisma.training.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.program.deleteMany();
    await prisma.user.deleteMany();
    console.log("All data erased successfully.");
    await prisma.$transaction(async (tx) => {
        // Seed new data
        await seedUsers(); // Pass transaction client to seed functions
        await seedPrograms();
        await seedExercises();
        await seedTraining();
        await seedExerciseNames();
    }, {
      maxWait: 5000,
      timeout: 10000,
    });

    return new Response(
      JSON.stringify({ message: "Database seeded successfully" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error during seeding:", error);
    return new Response(JSON.stringify({ error: "Error seeding database" }), {
      status: 500,
    });
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}
