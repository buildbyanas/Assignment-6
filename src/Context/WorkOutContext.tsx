"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { toast } from "react-toastify";

import type { Exercise } from "@/Types/Exercise";

interface WorkoutContextType {
  plan: Exercise[];
  saved: Exercise[];

  addToPlan: (workout: Exercise) => void;
  removeFromPlan: (id: number) => void;

  saveWorkout: (workout: Exercise) => void;
  removeFromSaved: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;

  markAsDone: (id: number) => void;
  isCompleted: (id: number) => boolean;
}

const WorkoutContext = createContext<
  WorkoutContextType | undefined
>(undefined);

export function WorkoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  // =========================
  // PLAN STATE
  // =========================

  const [plan, setPlan] = useState<Exercise[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedPlan =
        localStorage.getItem("fitlog-plan");

      return storedPlan
        ? JSON.parse(storedPlan)
        : [];
    } catch {
      return [];
    }
  });

  // =========================
  // SAVED STATE
  // =========================

  const [saved, setSaved] = useState<Exercise[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedSaved =
        localStorage.getItem("fitlog-saved");

      return storedSaved
        ? JSON.parse(storedSaved)
        : [];
    } catch {
      return [];
    }
  });

  // =========================
  // COMPLETED STATE
  // =========================

  const [completed, setCompleted] = useState<number[]>(
    []
  );

  // =========================
  // SAVE PLAN TO LOCAL STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan]);

  // =========================
  // SAVE SAVED WORKOUTS
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved]);

  // =========================
  // ADD TO PLAN
  // =========================

  const addToPlan = (workout: Exercise) => {
    // Maximum 5 exercises
    if (plan.length >= 5) {
      toast.warning(
        "You can only add 5 exercises to today's plan."
      );

      return;
    }

    // Already exists
    if (
      plan.some(
        (item) => item.id === workout.id
      )
    ) {
      toast.info(
        `${workout.name} is already in today's plan.`
      );

      return;
    }

    // Show toast BEFORE state update
    toast.success(
      `${workout.name} added to today's plan!`
    );

    setPlan((current) => [
      ...current,
      workout,
    ]);
  };

  // =========================
  // REMOVE FROM PLAN
  // =========================

  const removeFromPlan = (id: number) => {
    const workout = plan.find(
      (item) => item.id === id
    );

    if (!workout) {
      return;
    }

    toast.success(
      `${workout.name} removed from plan.`
    );

    setPlan((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  };

  // =========================
  // SAVE WORKOUT
  // =========================

  const saveWorkout = (workout: Exercise) => {
    // Already saved
    if (
      saved.some(
        (item) => item.id === workout.id
      )
    ) {
      toast.info(
        `${workout.name} is already saved.`
      );

      return;
    }

    toast.success(
      `${workout.name} saved for later!`
    );

    setSaved((current) => [
      ...current,
      workout,
    ]);
  };

  // =========================
  // REMOVE FROM SAVED
  // =========================

  const removeFromSaved = (id: number) => {
    const workout = saved.find(
      (item) => item.id === id
    );

    if (!workout) {
      return;
    }

    toast.success(
      `${workout.name} removed from saved.`
    );

    setSaved((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  };

  // =========================
  // CHECK IF IN PLAN
  // =========================

  const isInPlan = (id: number) => {
    return plan.some(
      (workout) => workout.id === id
    );
  };

  // =========================
  // CHECK IF SAVED
  // =========================

  const isSaved = (id: number) => {
    return saved.some(
      (workout) => workout.id === id
    );
  };

  // =========================
  // MARK AS DONE
  // =========================

  const markAsDone = (id: number) => {
    if (completed.includes(id)) {
      return;
    }

    toast.success(
      "Workout marked as done! 💪"
    );

    setCompleted((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  };

  // =========================
  // CHECK IF COMPLETED
  // =========================

  const isCompleted = (id: number) => {
    return completed.includes(id);
  };

  // =========================
  // PROVIDER
  // =========================

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,

        addToPlan,
        removeFromPlan,

        saveWorkout,
        removeFromSaved,

        isInPlan,
        isSaved,

        markAsDone,
        isCompleted,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

// =========================
// CUSTOM HOOK
// =========================

export function useWorkout() {
  const context = useContext(
    WorkoutContext
  );

  if (!context) {
    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );
  }

  return context;
}