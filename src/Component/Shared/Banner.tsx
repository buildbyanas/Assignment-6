import Image from "next/image";
import pic from "@/assets/banner.png"

 const Hero = () => {
  return (
    <section className="bg-[#08090b] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center overflow-hidden rounded-xl border border-zinc-800 bg-[#14161b] px-6 py-10 sm:px-10 lg:flex-row lg:px-12 lg:py-12">

        {/* Left Content */}
        <div className="w-full lg:w-1/2">

          {/* Small Heading */}
          <p className="mb-5 text-xs font-bold uppercase tracking-widest text-lime-400">
            Workout Library
          </p>

          {/* Main Heading */}
          <h1 className="max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[45px]">
            Train With Intent.
            Log <br />  Every Set.
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br />
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* Button */}
          <button
            className="mt-6 rounded-md bg-lime-400 px-5 py-3 text-xs font-bold
            uppercase text-black transition-all duration-200
            hover:bg-lime-300 hover:shadow-lg hover:shadow-lime-400/20
            active:scale-95"
          >
            Browse Workouts
          </button>
        </div>

        {/* Right Image */}
        <div className="mt-10 flex w-full justify-center lg:mt-0 lg:w-1/2 lg:justify-end">
          <div className="relative h-65 w-65 sm:h-80 sm:w-[320px] lg:h-82.5 lg:w-82.5">

            <Image
              src={pic} alt="Banner pic" fill className="object-contain" priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
export default Hero;