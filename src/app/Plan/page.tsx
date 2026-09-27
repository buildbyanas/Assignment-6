import { Suspense } from "react";
import PlanContent from "./PlanContent";

export default function PlanPage() {
  return (
    <Suspense fallback={<PlanLoading />}>
      <PlanContent />
    </Suspense>
  );
}

function PlanLoading() {
  return (
    <main className="min-h-screen bg-[#08090b] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[400px] max-w-7xl items-center justify-center">
        <p className="text-sm text-zinc-500">
          Loading...
        </p>
      </div>
    </main>
  );
}