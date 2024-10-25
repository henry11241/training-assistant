"use client";

import Link from "next/link";
import {
  CircleUser,
  LineChart,
  Menu,
  NotebookPen,
  Plus,
  Search,
  Timer,
  Weight,
  Workflow,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetHeader>
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/"
              className="relative flex items-center gap-2 text-lg font-semibold"
            >
              <Weight className="h-6 w-6" />
              <span className="sr-only">Training Assistant</span>
              <SheetClose className="absolute inset-0 h-full w-full"></SheetClose>
            </Link>
            <Link
              href="/"
              className={cn(
                "relative mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                pathname === "/" ? "bg-muted text-foreground" : "",
              )}
            >
              <NotebookPen className="h-5 w-5" />
              Diary
              <SheetClose className="absolute inset-0 h-full w-full"></SheetClose>
            </Link>
            <Link
              href="/timer"
              className={cn(
                "relative mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                pathname === "/timer" ? "bg-muted text-foreground" : "",
              )}
            >
              <Timer className="h-5 w-5" />
              Timer
              <SheetClose className="absolute inset-0 h-full w-full"></SheetClose>
            </Link>
            <Link
              href="/program"
              className={cn(
                "relative mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                pathname === "/program" ? "bg-muted text-foreground" : "",
              )}
            >
              <Workflow className="h-5 w-5" />
              Program
              <SheetClose className="absolute inset-0 h-full w-full"></SheetClose>
            </Link>
            <Link
              href="/analytics"
              className={cn(
                "relative mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                pathname === "/analytics" ? "bg-muted text-foreground" : "",
              )}
            >
              <LineChart className="h-5 w-5" />
              Analytics
              <SheetClose className="absolute inset-0 h-full w-full"></SheetClose>
            </Link>
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Add New Training</CardTitle>
                <CardDescription>
                  Start a new session of training.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <Link href="/create">
                  <Button size="sm" className="w-full">
                    <Plus className="h-5 w-5" />
                  </Button>
                  <SheetClose className="absolute inset-x-6 inset-y-3 -translate-y-3"></SheetClose>
                </Link>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="my-account">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
