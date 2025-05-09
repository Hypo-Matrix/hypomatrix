import { getPage, getPages } from "@/services/apis/page";
import { generatePageMetadata } from "@/utils/page-metadata";
import PageDetailsView from "@/views/page-details";
import { Metadata } from "next";
import { notFound } from "next/navigation";
type Props = {
  params: Promise<{ slug: string }>;
};

async function PageDetails(props: Props) {
  const { slug } = await props.params;
  const pageRes = await getPage(slug);

  if (!pageRes.data) {
    notFound();
  }

  return (
    <>
      <PageDetailsView page={pageRes.data} />
    </>
  );
}

export default PageDetails;

// ----------------------------------------------------------------------

export async function generateStaticParams() {
  const dataRes = await getPages();

  if (!dataRes.data) {
    return [];
  }

  return dataRes.data
    .filter(
      (item) =>
        ![
          "about",
          "blog",
          "contact",
          "faq",
          "works",
          "services",
          "careers",
          "team",
        ].includes(item.slug)
    )
    .map((item) => ({
      slug: item.slug,
    }));
}

// ----------------------------------------------------------------------

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { slug } = await props.params;
  const { data } = await getPage(slug);

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, "/" + slug),
  };
};
