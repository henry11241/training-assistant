import { Metadata } from "next";
import DefaultContentLayout from "@/components/default-content-layout";
import CreateProgramForm from "@/components/create/program/create-program-form";

export const metadata: Metadata = {
  title: "Program",
};

export default function Page() {
  return (
    <DefaultContentLayout title="Create Program">
      <CreateProgramForm />
    </DefaultContentLayout>
  );
}
