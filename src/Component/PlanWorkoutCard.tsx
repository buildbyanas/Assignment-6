"use client";

import Image from "next/image";
import Link from "next/link";

import type { Exercise } from "@/Types/Exercise";
import { useWorkout } from "@/Context/WorkOutContext";

interface Props {
  workout: Exercise;
  type: "plan" | "saved";
}

export default function PlanWorkoutCard({
  workout,
  type,
}: Props) {
  const {
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    isCompleted,
  } = useWorkout();

  const completed = isCompleted(workout.id);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-[#14161b] p-3 sm:flex-row sm:items-center">

      {/* Image */}
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg sm:w-28">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">

        <h2 className="text-sm font-black uppercase text-white">
          {workout.name}
        </h2>

        <p className="text-xs text-zinc-500">
          {workout.equipment}
        </p>

        <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-400">

          <span>
            ◷ {workout.duration} min
          </span>

          <span>
            🔥 {workout.caloriesBurned} kcal
          </span>

          <span>
            ☆ {workout.rating}
          </span>

        </div>

      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">

        {/* View Details */}
        <Link
          href={`/WorkOut/${workout.id}`}
          className="rounded-full border border-zinc-700 px-4 py-2 text-xs text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          View Details
        </Link>

        {/* Mark Done - Plan only */}
        {type === "plan" && (
          <button
            onClick={() => markAsDone(workout.id)}
            disabled={completed}
            className={`rounded-full px-4 py-2 text-xs font-bold ${
              completed
                ? "bg-zinc-700 text-zinc-400"
                : "bg-lime-400 text-black hover:bg-lime-300"
            }`}
          >
            {completed
              ? "✓ Completed"
              : "✓ Mark as Done"}
          </button>
        )}

        {/* Remove */}
        <button
          onClick={() => {
            if (type === "plan") {
              removeFromPlan(workout.id);
            } else {
              removeFromSaved(workout.id);
            }
          }}
          className="px-2 text-lg text-zinc-500 transition hover:text-red-400"
        >
          ×
        </button>

      </div>
    </div>
  );
}