import { Metadata } from "next";
import CreateTrainingForm from "./create-training-form";

export const metadata: Metadata = {
  title: "Create Training",
};

export default function Page() {
  return (
    <main className="flex flex-1">
      <CreateTrainingForm />
    </main>
  );
}
