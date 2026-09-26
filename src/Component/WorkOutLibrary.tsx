"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./WorkOutCard";
import type { Exercise } from "@/Types/Exercise";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          "https://api.api-store.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Exercise[] = await response.json();

        setWorkouts(data);
      } catch (error) {
        setError("Something went wrong while loading workouts.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#08090b] px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-zinc-400">
            Loading workouts...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#08090b] px-4 py-10">
        <p className="text-center text-red-400">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="bg-[#08090b] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tight text-white">
            The Library
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* 3 × 4 Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default WorkoutLibrary;