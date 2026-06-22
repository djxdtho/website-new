import { SplineSceneBasic } from "@/components/ui/demo";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SplineSceneBasic />
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <Link
          href="/shop"
          className="px-5 py-2.5 bg-[#C4956A] backdrop-blur-md rounded-full text-[#1A0F0A] text-xs tracking-wider uppercase hover:bg-[#D4A87A] transition-all font-semibold shadow-lg"
        >
          $300 Shop &rarr;
        </Link>
        <Link
          href="/coffee"
          className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-white text-xs tracking-wider uppercase hover:bg-white/20 transition-all"
        >
          $120 Demo &rarr;
        </Link>
      </div>
    </>
  );
}
