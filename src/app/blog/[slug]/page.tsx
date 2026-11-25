import paths from "@/router/paths";
import { getBlogPost, getBlogPosts } from "@/services/apis/blog";
import { generatePageMetadata } from "@/utils/page-metadata";
import BlogDetailsView from "@/views/blog/details";

import { Metadata } from "next";
import { notFound } from "next/navigation";


type Props = {
  params: Promise<{ slug: string }>;
};

async function BlogDetailsPage(props: Props) {
  const { slug } = await props.params;
  const blogPostRes = await getBlogPost(slug);

  if (!blogPostRes.data) {
    notFound();
  }

  return (
    <>
      <BlogDetailsView post={blogPostRes.data} />
    </>
  );
}

export default BlogDetailsPage;

// ----------------------------------------------------------------------

export async function generateStaticParams() {
  const dataRes = await getBlogPosts();

  if (!dataRes.data) {
    return [];
  }

  return dataRes.data.map((item) => ({
    slug: item.slug,
  }));
}

// ----------------------------------------------------------------------

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { slug } = await props.params;
  const { data } = await getBlogPost(slug);

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, paths.blog.details(slug)),
  };
};
