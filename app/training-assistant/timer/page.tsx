import { Metadata } from "next";
import DefaultContentLayout from "@/components/default-content-layout";

export const metadata: Metadata = {
  title: "Timer",
};

export default function Timer() {
  return (
    <DefaultContentLayout title="Timer">
      <h2>Timer</h2>
    </DefaultContentLayout>
  );
}
