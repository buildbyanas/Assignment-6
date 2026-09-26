"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { useWorkout } from "@/Context/WorkOutContext";
import PlanWorkoutCard from "@/Component/PlanWorkoutCard";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function PlanPage() {
  const { plan, saved } = useWorkout();

  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  const activeTab: Tab = tab === "saved" ? "saved" : "plan";

  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const currentWorkouts = activeTab === "plan" ? plan : saved;

  const sortedWorkouts = useMemo(() => {
    return [...currentWorkouts].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });
  }, [currentWorkouts, sortBy]);

  const totalExercises = currentWorkouts.length;

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = currentWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <main className="min-h-screen bg-[#08090b] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-3xl font-black uppercase sm:text-4xl">
          My Plan
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* Stats */}
        <div className="mt-6 grid overflow-hidden rounded-xl border border-zinc-800 bg-[#14161b] sm:grid-cols-3">
          <div className="border-b border-zinc-800 p-6 sm:border-b-0 sm:border-r">
            <p className="text-xs text-zinc-500">Exercises</p>
            <p className="mt-1 text-3xl font-black text-lime-400">
              {totalExercises}
            </p>
          </div>

          <div className="border-b border-zinc-800 p-6 sm:border-b-0 sm:border-r">
            <p className="text-xs text-zinc-500">Minutes</p>
            <p className="mt-1 text-3xl font-black">
              {totalMinutes}
            </p>
          </div>

          <div className="p-6">
            <p className="text-xs text-zinc-500">Calories</p>
            <p className="mt-1 text-3xl font-black">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex items-center justify-between">

          <div className="flex rounded-lg border border-zinc-800 bg-[#14161b] p-1">

            <Link
              href="/Plan?tab=plan"
              className={`rounded-md px-5 py-2 text-xs transition ${
                activeTab === "plan"
                  ? "bg-[#242832] font-bold text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </Link>

            <Link
              href="/Plan?tab=saved"
              className={`rounded-md px-5 py-2 text-xs transition ${
                activeTab === "saved"
                  ? "bg-[#242832] font-bold text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              Saved
            </Link>

          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="rounded-lg border border-zinc-800 bg-[#14161b] px-4 py-2 text-xs text-white outline-none"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>

        </div>

        {/* Workouts */}
        <div className="mt-5">

          {sortedWorkouts.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 px-6 text-center">

              <h2 className="text-lg font-black uppercase">
                Nothing Here Yet
              </h2>

              <p className="mt-2 text-xs text-zinc-500">
                {activeTab === "plan"
                  ? "Browse the library and add a lift to get today moving."
                  : "Save workouts from the library to see them here."}
              </p>

              <Link
                href="/"
                className="mt-5 rounded-full bg-lime-400 px-6 py-2.5 text-xs font-bold text-black hover:bg-lime-300"
              >
                Go to workouts
              </Link>

            </div>
          ) : (
            <div className="grid gap-4">
              {sortedWorkouts.map((workout) => (
                <PlanWorkoutCard
                  key={workout.id}
                  workout={workout}
                  type={activeTab}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}