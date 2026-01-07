import { getBlogPosts } from "@/services/apis/blog";
import { getCareers } from "@/services/apis/career";
import { getMembers } from "@/services/apis/member";
import { getProjects } from "@/services/apis/project";
import { getServices } from "@/services/apis/service";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/faq",
    "/blog",
    "/works",
    "/services",
    "/team",
    "/careers",
  ];

  const staticSitemap: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch dynamic data
  const [blogPosts, projects, services, members, careers] = await Promise.all([
    getBlogPosts(),
    getProjects(),
    getServices(),
    getMembers(null),
    getCareers(),
  ]);

  // Blog posts
  const blogPostsSitemap: MetadataRoute.Sitemap =
    (blogPosts.data ?? [])?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishDate),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) || [];

  // Projects/Works
  const projectsSitemap: MetadataRoute.Sitemap =
    projects?.data?.map((project) => ({
      url: `${baseUrl}/works/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })) || [];

  // Services
  const servicesSitemap: MetadataRoute.Sitemap =
    services?.data?.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })) || [];

  // Team members
  const teamSitemap: MetadataRoute.Sitemap =
    members?.data?.map((member) => ({
      url: `${baseUrl}/team/${member.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })) || [];

  // Careers
  const careersSitemap: MetadataRoute.Sitemap =
    careers?.data?.map((career) => ({
      url: `${baseUrl}/careers/${career.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) || [];

  return [
    ...staticSitemap,
    ...blogPostsSitemap,
    ...projectsSitemap,
    ...servicesSitemap,
    ...teamSitemap,
    ...careersSitemap,
  ];
}
