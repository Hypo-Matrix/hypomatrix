import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: "img.youtube.com" },
      { hostname: "html.pixelfit.agency" },
      { hostname: "picsum.photos" },
      {
        protocol: "https",
        hostname: "**.graphassets.com",
      },
      {
        protocol: "https",
        hostname: "**.hypomatrix.com",
      },
      {
        protocol: "https",
        hostname: "hypomatrix.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
