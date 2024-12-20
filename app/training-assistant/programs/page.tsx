import { Metadata } from "next";
import { fetchPrograms } from "@/lib/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";


export const metadata: Metadata = {
  title: "Programs",
};

export default async function Page() {
  const data = await fetchPrograms();

  return (
    <main>
        <DataTable columns={columns} data={data} />
    </main>
  );
}
