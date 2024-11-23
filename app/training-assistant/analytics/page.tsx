import { Metadata } from "next";
import DefaultContentLayout from "@/components/default-content-layout";

export const metadata: Metadata = {
  title: "Analytics",
};

export default function Page() {
  return (
    <DefaultContentLayout title="Analytics">
      <h2>Analytics</h2>
    </DefaultContentLayout>
  );
}
