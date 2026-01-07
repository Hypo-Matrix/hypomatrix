import { Roboto, Source_Sans_3 } from "next/font/google";

export const headingFont = Source_Sans_3({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const bodyFont = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});
