import paths from "@/router/paths";
import {
  getBlogCategories,
  getBlogCategory,
  getBlogPosts,
} from "@/services/apis/blog";
import { generatePageMetadata } from "@/utils/page-metadata";
import BlogCategoryView from "@/views/blog/category";

import { Metadata } from "next";
import { notFound } from "next/navigation";


type Props = {
  params: Promise<{ slug: string }>;
};

async function BlogCategoryPage(props: Props) {
  const { slug } = await props.params;
  const blogCategoryRes = await getBlogCategory(slug);
  const blogRes = await getBlogPosts();

  if (!blogCategoryRes.data) {
    notFound();
  }

  return (
    <>
      <BlogCategoryView
        category={blogCategoryRes.data}
        posts={(blogRes.data || []).filter(
          (item) => item?.category?.slug === slug
        )}
      />
    </>
  );
}

export default BlogCategoryPage;

// ----------------------------------------------------------------------

export async function generateStaticParams() {
  const dataRes = await getBlogCategories();

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
  const { data } = await getBlogCategory(slug);

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, paths.blog.category(slug)),
  };
};
