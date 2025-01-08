import { Metadata } from "next";
import CreateProgramForm from "./create-program-form";
import { fetchExerciseName } from "@/lib/data";

export const metadata: Metadata = {
  title: "Program",
};

export default async function Page() {
  const exerciseName = await fetchExerciseName()

  return (
    <main className="flex flex-1 items-center justify-center">
      <CreateProgramForm exerciseName={exerciseName} />
    </main>
  );
}
