import { TBlogCategory, TBlogPost } from "@/types/cms/blog";
import { asyncWrapper, cmsFetch } from "../common";
import {
  blogCategoriesQuery,
  blogCategoryQuery,
  blogPostQuery,
  blogPostsQuery,
  blogPostsQueryWithFeatured,
} from "../queries/blog";

// ----------------------------------------------------------------------

export const blogServiceTags = {
  blogPosts: "blog-posts",
  blogPostsFeatured: "blog-posts-featured",
  blogPost: (slug: string) => `blog-post-${slug}`,
  blogCategories: "blog-categories",
  blogCategory: (slug: string) => `blog-category-${slug}`,
};

// ----------------------------------------------------------------------

export const getBlogPosts = asyncWrapper<TBlogPost[]>(async () => {
  const response = await cmsFetch<{ blogPosts: TBlogPost[] }>({
    body: JSON.stringify({
      query: blogPostsQuery,
    }),
    next: { tags: [blogServiceTags.blogPosts] },
  });

  return response?.blogPosts || [];
});

export const getFeaturedBlogPosts = asyncWrapper<
  TBlogPost[],
  [boolean | undefined]
>(async (isFeatured) => {
  const response = await cmsFetch<{ blogPosts: TBlogPost[] }>({
    body: JSON.stringify({
      query: blogPostsQueryWithFeatured,
      variables: { featured: isFeatured },
    }),
    next: { tags: [blogServiceTags.blogPostsFeatured] },
  });

  return response?.blogPosts || [];
});

export const getBlogPost = asyncWrapper<TBlogPost, [string]>(async (slug) => {
  const response = await cmsFetch<{ blogPost: TBlogPost }>({
    body: JSON.stringify({
      query: blogPostQuery,
      variables: { slug },
    }),
    next: { tags: [blogServiceTags.blogPost(slug)] },
  });

  return response?.blogPost || null;
});

// ----------------------------------------------------------------------

export const getBlogCategories = asyncWrapper<TBlogCategory[]>(async () => {
  const response = await cmsFetch<{ blogCategories: TBlogCategory[] }>({
    body: JSON.stringify({
      query: blogCategoriesQuery,
    }),
    next: { tags: [blogServiceTags.blogCategories] },
  });

  return response?.blogCategories || [];
});

export const getBlogCategory = asyncWrapper<TBlogCategory, [string]>(
  async (slug) => {
    const response = await cmsFetch<{ blogCategory: TBlogCategory }>({
      body: JSON.stringify({
        query: blogCategoryQuery,
        variables: { slug },
      }),
      next: { tags: [blogServiceTags.blogCategory(slug)] },
    });

    return response?.blogCategory || null;
  }
);
