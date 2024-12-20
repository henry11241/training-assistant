import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no training history
          </h3>
          <p className="text-sm text-muted-foreground">
            Start from adding a new training session.
          </p>
          <Link href="/training-assistant/create/training">
            <Button className="mt-4">Add Training</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
