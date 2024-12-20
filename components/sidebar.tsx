"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LineChart,
  NotebookPen,
  Plus,
  Timer,
  Weight,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const links = [
  { name: "Diary", href: "/training-assistant", icon: NotebookPen },
  { name: "Programs", href: "/training-assistant/programs", icon: Workflow },
  {
    name: "Timer",
    href: "/training-assistant/timer",
    icon: Timer,
  },
  { name: "Analytics", href: "/training-assistant/analytics", icon: LineChart },
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Weight className="h-6 w-6" />
            <span className="block lg:hidden">Training A.</span>
            <span className="hidden lg:block">Training Assistant</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {links.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === `${link.href}` ? "bg-muted text-primary" : "",
                  )}
                >
                  <LinkIcon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Add New Training</CardTitle>
              <CardDescription>
                Start a new session of training.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Link href="/training-assistant/create">
                <Button size="sm" className="w-full">
                  <Plus className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
