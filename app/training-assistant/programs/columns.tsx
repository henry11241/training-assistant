"use client";

import { Program } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<Program>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => {
      const title = row.original.name;
      return <div className="text-left font-medium">{title}</div>;
    },
  },
  {
    accessorKey: "totalTime",
    header: () => <div className="text-left">Total Training Time</div>,
    cell: ({ row }) => {
      const formattedTime = `${Math.floor(row.original.totalTime / 60)}m ${row.original.totalTime % 60}s`;
      return <div className="text-left font-medium">{formattedTime}</div>;
    },
  },
  {
    id: "edit",
    cell: ({ row }) => {
      const programId = row.original.id;
      return (
        <Link href={`/training-assistant/programs/${programId}`} passHref>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Edit program</span>
            <SquarePen />
          </Button>
        </Link>
      );
    },
  },
];
