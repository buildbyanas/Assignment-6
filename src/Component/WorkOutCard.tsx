import Image from "next/image";
import Link from "next/link";
import type { Exercise } from "@/Types/Exercise";

interface WorkoutCardProps {
  workout: Exercise;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/WorkOut/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-zinc-800 bg-[#14161b] transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/40 hover:shadow-xl hover:shadow-black/20"
    >
      {/* Image */}
      <div className="relative h-100 w-full overflow-hidden">
        <Image src={workout.image} alt={workout.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Muscle Groups */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold uppercase text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Name */}
        <h2 className="text-base font-black uppercase tracking-wide text-white">
          {workout.name}
        </h2>

        {/* Equipment */}
        <p className="mt-1 text-xs text-zinc-500">
          {workout.equipment}
        </p>

        {/* Divider */}
        <div className="my-4 border-t border-zinc-800" />

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span>◷</span>
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>●</span>
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>☆</span>
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default WorkoutCard;