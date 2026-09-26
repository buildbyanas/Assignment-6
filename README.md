# 🏋️ FitLog

A modern and responsive workout tracking application built with **Next.js, TypeScript, and Tailwind CSS**.

FitLog helps users discover workouts, view detailed exercise information, create a daily workout plan, save favorite workouts, and track completed exercises — all through a clean and responsive interface.

---

## ✨ Features

### 🏋️ Workout Library
- Browse a collection of workouts.
- View workout information in clean, responsive cards.
- Workout cards include:
  - Exercise name
  - Image
  - Muscle groups
  - Equipment
  - Difficulty
  - Duration
  - Calories burned
  - Rating

### 🔎 Workout Details
- Dedicated details page for every workout.
- Large workout image.
- Full workout description.
- Step-by-step instructions.
- Exercise statistics.
- Add workouts directly to your plan.
- Save workouts for later.

### 📋 My Plan
- Create your daily workout plan.
- Maximum of **5 exercises** can be added.
- View:
  - Total exercises
  - Total duration
  - Total calories
- Remove exercises from your plan.
- Mark workouts as completed.

### ❤️ Saved Workouts
- Save workouts for later.
- View all saved workouts from the Saved tab.
- Remove saved workouts whenever needed.
- Saved workout count updates dynamically in the navbar.

### 🔃 Sorting
Workouts can be sorted by:

- Duration
- Calories
- Rating

### 🔔 Toast Notifications
FitLog uses toast notifications to provide instant feedback when users:

- Add a workout
- Remove a workout
- Save a workout
- Remove a saved workout
- Mark a workout as completed
- Reach the 5-workout plan limit

### 💾 Local Storage
Your plan and saved workouts are stored in the browser using `localStorage`, so they remain available after refreshing the page.

### 📱 Responsive Design
The application is designed to work across:

- 📱 Mobile
- 📲 Tablet
- 💻 Desktop

The navigation also includes a responsive mobile menu.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | React framework |
| React | UI development |
| TypeScript | Type safety |
| Tailwind CSS | Styling and responsive design |
| React Toastify | Toast notifications |
| Next/Image | Image optimization |
| Context API | Global workout state |
| LocalStorage | Persistent plan and saved data |

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── WorkOut/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── Plan/
│   │   └── page.tsx
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── Component/
│   ├── Navbar.tsx
│   ├── PlanWorkoutCard.tsx
│   └── ...
│
├── Context/
│   └── WorkOutContext.tsx
│
├── Types/
│   └── Exercise.ts
│
└── assets/
    └── logo.png