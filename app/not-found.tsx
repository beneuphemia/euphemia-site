import Link from "next/link";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080A10] text-[#FAFBFF] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="text-4xl font-bold font-mono text-[#C9A84C]">404</div>
      <h1 className="text-xl font-bold text-[#FAFBFF]">Page Not Found</h1>
      <p className="text-xs text-[#8B91B0] max-w-sm">
        The page you are looking for could not be found.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-[#1B4FD8] hover:bg-[#3B6EF5] text-[#FAFBFF] text-xs uppercase font-mono tracking-wider rounded-sm transition-all"
      >
        Return to {site.brand.name}
      </Link>
    </div>
  );
}
