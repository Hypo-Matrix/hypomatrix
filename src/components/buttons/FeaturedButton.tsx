import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  href: string;
};

const FeaturedButton = ({ children, href }: Props) => {
  return (
    <Link href={href}>
      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] transform hover:-translate-y-1 transition duration-400">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          {children}
        </span>
      </button>
    </Link>
  );
};

export default FeaturedButton;
