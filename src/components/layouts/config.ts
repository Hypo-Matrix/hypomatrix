import paths from "@/router/paths";
import path from "path";

export type LinkItem = {
  title: string;
  href: string;
};

export type LinkItemDropdown = {
  title: string;
  items: LinkItem[];
};

export type Link = LinkItem | LinkItemDropdown;

// Desktop Links ----------------------------------------------------------------------

export const desktopLinks: Link[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Pages",
    items: [
      { title: "About Us", href: paths.about },
      { title: "Our Services", href: paths.services.root },
      { title: "Service Details", href: paths.services.details("slug") },
      { title: "Careers", href: paths.careers.root },
      { title: "Career Details", href: paths.careers.details("slug") },
      { title: "Our Team", href: paths.team.root },
      { title: "Team Details", href: paths.team.details("slug") },
      { title: "Pricing", href: "/pricing" },
      { title: "FAQ", href: paths.faq },
      { title: "Contact Us", href: paths.contact },
      { title: "404", href: "/404" },
    ],
  },
  {
    title: "works",
    items: [
      { title: "Projects", href: "/works" },
      { title: "Project Details", href: paths.works.details("slug") },
      { title: "Web Design", href: "/web-design" },
      { title: "Graphic Design", href: "/graphic-design" },
      { title: "UI/UX", href: "/ui-ux" },
      { title: "Branding", href: "/branding" },
    ],
  },
  {
    title: "Blogs",
    href: "/",
    items: [
      { title: "Latest News", href: "/blog" },
      { title: "Blogs Card", href: "/blog-card" },
      { title: "Blog-Details", href: "/blog-details" },
      { title: "Technology", href: "/technology" },
      { title: "Business", href: "/business" },
      { title: "Lifestyle", href: "/lifestyle" },
    ],
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
];

// ----------------------------------------------------------------------
