import Image from "next/image";
import Link from "next/link";
import type { Exercise } from "@/Types/Exercise";
import AddWorkoutButtons from "@/Component/AddWorkButton";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getWorkout = async (id: string): Promise<Exercise | undefined>  => {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const workouts: Exercise[] = await response.json();

  return workouts.find((workout) => String(workout.id) === String(id));
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#08090b] px-4">
        <div className="text-center">
          <h1 className="text-3xl font-black text-white">
            Workout Not Found
          </h1>

          <Link
            href="/"
            className="mt-5 inline-block rounded-md bg-lime-400 px-5 py-3 text-sm font-bold text-black"
          >
            Back to Library
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090b] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Main Details */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* LEFT - IMAGE */}
          <div className="relative h-[400px] overflow-hidden rounded-xl sm:h-[500px] lg:h-[750px] my-4">
            <Image
              src={workout.image}
              alt={workout.name}
              
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* RIGHT - CONTENT */}
          <div className="flex flex-col">

            {/* Title */}
            <h1 className="text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-lime-400 px-4 py-1.5 text-xs font-bold uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Stats Box */}
            <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800 bg-[#15181e]">

              <DetailRow
                label="Equipment"
                value={workout.equipment}
              />

              <DetailRow
                label="Difficulty"
                value={workout.difficulty}
              />

              <DetailRow
                label="Sets"
                value={String(workout.sets)}
              />

              <DetailRow
                label="Reps"
                value={workout.reps}
              />

              <DetailRow
                label="Duration"
                value={`${workout.duration} min`}
              />

              <DetailRow
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <DetailRow
                label="Rating"
                value={String(workout.rating)}
                last
              />

            </div>

            {/* Instructions */}
            <div className="mt-7">
              <h2 className="text-sm font-black uppercase tracking-wide text-white">
                Instructions
              </h2>

              <ol className="mt-4 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-5 text-zinc-400"
                  >
                    <span className="text-zinc-500">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <AddWorkoutButtons workout={workout} />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}


/* Reusable detail row */
function DetailRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-5 py-4 ${
        !last ? "border-b border-zinc-800" : ""
      }`}
    >
      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </span>

      <span className="text-sm text-zinc-200">
        {value}
      </span>
    </div>
  );
}