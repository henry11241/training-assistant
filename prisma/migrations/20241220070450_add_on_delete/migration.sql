-- DropForeignKey
ALTER TABLE "training" DROP CONSTRAINT "training_program_id_fkey";

-- AddForeignKey
ALTER TABLE "training" ADD CONSTRAINT "training_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
