import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DefaultContentLayout from "@/components/default-content-layout";

export const metadata: Metadata = {
  title: "Programs",
};

export default function Page() {
  return (
    <DefaultContentLayout title="My Training Programs">
      <h3 className="text-2xl font-bold tracking-tight">
        You have no training program
      </h3>
      <p className="text-sm text-muted-foreground">
        Start from adding a new training program.
      </p>
      <Link href="/training-assistant/create/program">
        <Button className="mt-4">Add Program</Button>
      </Link>
    </DefaultContentLayout>
  );
}
