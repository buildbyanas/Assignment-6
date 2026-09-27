"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import logo from "@/assets/logo.png";
import { useWorkout } from "@/Context/WorkOutContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const { plan, saved } = useWorkout();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isWorkoutsActive = pathname === "/";
  const isPlanPage = pathname === "/Plan";

  return (
    <nav className="border-b border-zinc-800 bg-[#0b0c0f] text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <Image
            src={logo}
            alt="FITLOG logo"
            width={28}
            height={28}
          />

          <span className="text-xl font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Workouts */}
          <Link
            href="/"
            className={`rounded-full px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isWorkoutsActive
                ? "bg-lime-400 text-black"
                : "bg-black text-zinc-200 hover:bg-lime-200/20 hover:text-lime-300"
            }`}
          >
            Workouts
          </Link>

          {/* My Plan */}
          <Link
            href="/Plan?tab=plan"
            className={`rounded-full px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isPlanPage
                ? "bg-lime-400 text-black"
                : "bg-black text-zinc-200 hover:bg-lime-200/20 hover:text-lime-300"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-2 md:flex">

          {/* Plan */}
          <Link
            href="/Plan?tab=plan"
            className={`group flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${
              isPlanPage
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/Plan?tab=saved"
            className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-zinc-700 px-1 text-xs text-zinc-400 transition group-hover:border-lime-400 group-hover:text-lime-400">
              {saved.length}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-md p-2 text-zinc-300 transition hover:bg-zinc-800 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-zinc-800 bg-[#0b0c0f] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">

            {/* Workouts */}
            <Link
              href="/"
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                isWorkoutsActive
                  ? "bg-lime-400/10 text-lime-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              Workouts
            </Link>

            {/* My Plan */}
            <Link
              href="/Plan?tab=plan"
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                isPlanPage
                  ? "bg-lime-400/10 text-lime-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              My Plan
            </Link>

            <div className="my-2 border-t border-zinc-800" />

            {/* Plan */}
            <Link
              href="/Plan?tab=plan"
              onClick={closeMenu}
              className={`flex items-center justify-between rounded-lg px-4 py-3 transition ${
                isPlanPage
                  ? "bg-zinc-800"
                  : "hover:bg-zinc-800"
              }`}
            >
              <span
                className={`text-sm ${
                  isPlanPage
                    ? "text-white"
                    : "text-zinc-400"
                }`}
              >
                Plan
              </span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-xs font-bold text-black">
                {plan.length}
              </span>
            </Link>

            {/* Saved */}
            <Link
              href="/Plan?tab=saved"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              <span className="text-sm">
                Saved
              </span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-zinc-700 px-1 text-xs text-zinc-400">
                {saved.length}
              </span>
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;