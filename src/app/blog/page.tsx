import paths from "@/router/paths";
import { getBlogPosts } from "@/services/apis/blog";
import { getPage } from "@/services/apis/page";
import { generatePageMetadata } from "@/utils/page-metadata";
import BlogView from "@/views/blog/home";
import { Metadata } from "next";
import { notFound } from "next/navigation";


type Props = {};

const BlogPage = async (props: Props) => {
  const pageRes = await getPage("blog");
  const blogRes = await getBlogPosts();

  if (!pageRes.data) {
    notFound();
  }
  return (
    <>
      <BlogView page={pageRes.data} posts={blogRes?.data || []} />
    </>
  );
};

export default BlogPage;

// ----------------------------------------------------------------------

export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = await getPage("blog");

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, paths.blog.root),
  };
};
