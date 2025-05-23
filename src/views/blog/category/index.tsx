import PageHeader from "@/components/common/page-header";
import CommonMotionBox from "@/lib/motion/common-motion";
import paths from "@/router/paths";
import { TBlogCategory, TBlogPost } from "@/types/cms/blog";
import { Suspense } from "react";
import CategoriesSection from "../home/categories-section";
import LatestPostSection from "../home/latest-post-section";
import PaginationSection from "../home/pagination-section";
import PostsWithPagination from "../home/posts-with-pagination";
import PostsWrapper from "../home/posts-wrapper";

type Props = {
  category: TBlogCategory;
  posts: TBlogPost[];
};

const BlogCategoryView = (props: Props) => {
  const { category, posts } = props;

  return (
    <>
      <PageHeader
        title={category.title}
        description={category.description}
        links={[
          {
            title: "Blog",
            href: paths.blog.root,
          },
          {
            title: "Catgory",
            href: paths.blog.category(category.slug),
          },
        ]}
      />
      <div className="container md:py-[130px] py-[50px]">
        <div className="grid grid-cols-1 xl:grid-cols-3 md:gap-y-16 gap-x-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-16 @container/feed">
            <Suspense fallback={<PostsWrapper posts={posts} />}>
              <PostsWithPagination limit={6} posts={posts} />
              <PaginationSection limit={6} total={posts.length} />
            </Suspense>
          </div>

          {/* Sidebar */}
          <CommonMotionBox>
            <div className="space-y-8">
              <CategoriesSection />
              <LatestPostSection />
            </div>
          </CommonMotionBox>
        </div>
      </div>
    </>
  );
};

export default BlogCategoryView;
