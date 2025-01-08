"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { deleteProgram } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

type Props = {
  programId: string;
};

export default function DeleteProgramButton({ programId }: Props) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    await deleteProgram(programId);
    setIsDialogOpen(false); // Close the dialog after deletion
    toast({
      title: "Success",
      description: "Program deleted successfully.",
      variant: "default",
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        className="ml-1 h-8 w-8 p-0"
        onClick={() => setIsDialogOpen(true)}
      >
        <span className="sr-only">Delete program</span>
        <Delete />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this program?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
