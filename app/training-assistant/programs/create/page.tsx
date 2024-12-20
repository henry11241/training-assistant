import { Metadata } from "next";
import CreateProgramForm from "./create-program-form";

export const metadata: Metadata = {
  title: "Program",
};

export default function Page() {
  return (
    <main>
      <CreateProgramForm />
    </main>
  );
}
