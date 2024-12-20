import { fetchProgram } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const program = await fetchProgram(params.id);

  if (!program) {
    notFound();
  }

  return (
    <div>
      <h1>{program.name}</h1>
      <p>Total Time: {program.totalTime} minutes</p>
    </div>
  );
}
