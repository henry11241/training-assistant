import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Sample users array
const users = [
  {
    id: "some-uuid-1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    id: "some-uuid-2",
    name: "Jane Doe",
    email: "jane@example.com",
    password: "password456",
  },
];

async function seedUsers() {
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: {
          id: user.id,
          name: user.name,
          email: user.email,
          password: hashedPassword,
        },
      });
    }),
  );

  console.log("Users inserted:", insertedUsers);
  return insertedUsers;
}

seedUsers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
