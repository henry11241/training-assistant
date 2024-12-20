// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Extend global types to include prisma property
declare global {
  // For TypeScript to recognize `global.prisma` as a PrismaClient instance
  var prisma: PrismaClient | undefined;
}

const prisma = new PrismaClient();

// Avoid creating multiple Prisma Client instances during hot reload in development
if (process.env.NODE_ENV === "development") {
  global.prisma = global.prisma || prisma;
}

export { prisma };
