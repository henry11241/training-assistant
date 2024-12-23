"use client";

import { Program } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Delete, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteProgram } from "@/lib/actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<Program>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Title</div>,
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
    id: "edit_delete",
    header: () => <div className="ml-1 text-left">Edit / Delete</div>,
    cell: ({ row }) => {
      const programId = row.original.id;
      return (
        <div>
          <Link
            href={`/training-assistant/programs/${programId}/edit`}
            passHref
          >
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Edit program</span>
              <SquarePen />
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="ml-1 h-8 w-8 p-0"
            onClick={async () => {
              await deleteProgram(programId);
            }}
          >
            <span className="sr-only">Edit program</span>
            <Delete />
          </Button>
        </div>
      );
    },
  },
];
