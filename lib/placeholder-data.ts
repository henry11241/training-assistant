import { Prisma } from "@prisma/client"; // For input type check
import { v4 as uuidv4 } from "uuid";

// Placeholder data for the `users` model
export const userData: Prisma.UserCreateInput[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000", // Replace with real UUIDs if necessary
    email: "user1@example.com",
    name: "Alice Smith",
    password: "123456", // Use a real hashed password in production
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    email: "user2@example.com",
    name: "Bob Johnson",
    password: "123456",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Placeholder data for the `programs` model
export const programData: Prisma.ProgramCreateInput[] = Array.from(
  { length: 15 },
  (_, index) => {
    if (index === 0) {
      // Replace the 10th program (index 9)
      return {
        id: "223e4567-e89b-12d3-a456-426614174000", // Custom program ID
        name: "Custom Strength Training Program", // Custom program name
        user: {
          connect: { id: "123e4567-e89b-12d3-a456-426614174000" }, // Connect to the same user
        },
        totalTime: 300, // Custom total time
      };
    }

    return {
      id: uuidv4(), // Generate unique IDs for other programs
      name: `Strength Training Program ${index + 1}`,
      user: {
        connect: { id: "123e4567-e89b-12d3-a456-426614174000" }, // Connect to the same user
      },
      totalTime: 230 + index * 10, // Example: increasing totalTime by 10 for each program
    };
  },
);

// Placeholder data for the `exercises` model
export const exerciseData: Prisma.ExerciseCreateInput[] = [
  {
    id: "323e4567-e89b-12d3-a456-426614174000",
    title: "Push-ups",
    reps: 20,
    sets: 3,
    restTimePerSetInSec: 60,
    restTimeBtwExInSec: null,
    program: {
      connect: { id: "223e4567-e89b-12d3-a456-426614174000" }, // Connect to existing program
    },
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174001",
    title: "Pull-ups",
    reps: 15,
    sets: 4,
    restTimePerSetInSec: 90,
    restTimeBtwExInSec: 120,
    program: {
      connect: { id: "223e4567-e89b-12d3-a456-426614174000" }, // Connect to existing program
    },
  },
];

// Placeholder data for the `training` model
export const trainingData: Prisma.TrainingCreateInput[] = [
  {
    id: "423e4567-e89b-12d3-a456-426614174000",
    name: "Morning Session",
    createdAt: new Date(),
    user: {
      connect: { id: "123e4567-e89b-12d3-a456-426614174000" }, // Connect to existing user
    },
    program: {
      connect: { id: "223e4567-e89b-12d3-a456-426614174000" }, // Connect to existing program
    },
  },
];

// Placeholder data for the `exercise_name` model
export const exerciseNameData: Prisma.ExerciseNameCreateInput[] = [
  {
    id: "523e4567-e89b-12d3-a456-426614174000",
    name: "Push-ups",
    user: {
      connect: { id: "123e4567-e89b-12d3-a456-426614174000" }, // Connect to existing user
    },
  },
  {
    id: "523e4567-e89b-12d3-a456-426614174001",
    name: "Pull-ups",
    user: {
      connect: { id: "123e4567-e89b-12d3-a456-426614174000" }, // Connect to existing user
    },
  },
];
