import { Metadata } from "next";
import { Suspense } from "react";
import { fetchPrograms } from "@/lib/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "Programs",
};

export default async function Page() {
  const data = await fetchPrograms()

  return (
    <>
      <main className="flex flex-1">
        <Suspense fallback={<></>}>
          <DataTable columns={columns} data={data} />
        </Suspense>
      </main>
    </>
  );
}
