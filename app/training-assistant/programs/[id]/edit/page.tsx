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
      <p>Total Time: {program.totalTime} seconds</p>
      {program.exercises.map((exercise, index) => (
        <div key={exercise.id}>
          <p>
            Exercise {index + 1}: {exercise.title}
          </p>
          <p>
            Exercise {index + 1}: {exercise.id}
          </p>
          <p>
            Exercise {index + 1} Bind with Program: {exercise.programId}
          </p>
          <p>Reps: {exercise.reps}</p>
          <p>Sets: {exercise.sets}</p>
          <p>Rest Time Per Set: {exercise.restTimePerSetInSec} seconds</p>
          <p>Rest Time Between Exercises: {exercise.restTimeBtwExInSec} seconds</p>
          <br />
        </div>
        
      ))}
    </div>
  );
}
