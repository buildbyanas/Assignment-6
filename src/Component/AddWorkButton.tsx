"use client";

import { useWorkout } from "@/Context/WorkOutContext";
import type { Exercise } from "@/Types/Exercise";

interface Props {
  workout: Exercise;
}

export default function AddWorkoutButtons({
  workout,
}: Props) {
  const {
    addToPlan,
    saveWorkout,
    removeFromSaved,
    isInPlan,
    isSaved,
  } = useWorkout();

  const added = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <div className="mt-7 flex flex-wrap gap-3">

      {/* Plan Button */}
      <button
        onClick={() => addToPlan(workout)}
        disabled={added}
        className={`rounded-lg px-5 py-3 text-sm font-bold transition ${
          added
            ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
            : "bg-lime-400 text-black hover:bg-lime-300"
        }`}
      >
        {added
          ? "✓ Added to today's plan"
          : "+ Add to today's plan"}
      </button>

      {/* Saved Button */}
      <button
        onClick={() => {
          if (saved) {
            removeFromSaved(workout.id);
          } else {
            saveWorkout(workout);
          }
        }}
        className="rounded-lg border border-zinc-700 px-12 py-3 text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
      >
        {saved ? "✓ Saved" : "♡ Save for later"}
      </button>

    </div>
  );
}