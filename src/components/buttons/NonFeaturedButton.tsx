import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

const NonFeaturedButton = ({ children, href, className }: Props) => {
  return (
    <Link href={href} className={className}>
      <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white dark:border-white dark:text-white text-white rounded-full font-bold transform hover:-translate-y-1 transition duration-400 cursor-pointer">
        {children}
      </button>
    </Link>
  );
};

export default NonFeaturedButton;
