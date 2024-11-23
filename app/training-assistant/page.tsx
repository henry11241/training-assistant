import { Button } from "@/components/ui/button";
import Link from "next/link";
import DefaultContentLayout from "@/components/default-content-layout";

export default function Page() {
  return (
    <DefaultContentLayout title="My Training History">
      <h3 className="text-2xl font-bold tracking-tight">
        You have no training history
      </h3>
      <p className="text-sm text-muted-foreground">
        Start from adding a new training session.
      </p>
      <Link href="/training-assistant/create/training">
        <Button className="mt-4">Add Training</Button>
      </Link>
    </DefaultContentLayout>
  );
}
