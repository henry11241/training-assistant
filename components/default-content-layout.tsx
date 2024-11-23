import { ReactNode } from "react";

interface DefaultContentLayoutProps {
  children: ReactNode;
  title: string;
}

export default function DefaultContentLayout({
  children,
  title,
}: DefaultContentLayoutProps) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          {children}
        </div>
      </div>
    </main>
  );
}
