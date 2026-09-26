import Image from "next/image";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-900 bg-[#08090b]">
      <div className="mx-auto flex min-h-[76px] max-w-7xl flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row sm:px-8">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />

          <span className="text-xs font-black tracking-wide text-white">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-center text-[10px] text-zinc-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}
export default Footer;