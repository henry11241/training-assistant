import { Metadata } from "next";
import DefaultContentLayout from "@/components/default-content-layout";
import CreateTrainingForm from "@/components/create/training/create-training-form";

export const metadata: Metadata = {
  title: "Create Training",
};

export default function Page() {
  return (
    <DefaultContentLayout title="Create New Training">
      <CreateTrainingForm />
    </DefaultContentLayout>
  );
}
