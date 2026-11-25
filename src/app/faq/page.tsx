import paths from "@/router/paths";
import { getPage } from "@/services/apis/page";
import { generatePageMetadata } from "@/utils/page-metadata";
import FaqView from "@/views/faq";
import { Metadata } from "next";
import { notFound } from "next/navigation";


const FaqPage = async () => {
  const pageRes = await getPage("faq");

  if (!pageRes.data) {
    notFound();
  }

  return (
    <>
      <FaqView page={pageRes.data} />
    </>
  );
};

export default FaqPage;

// ----------------------------------------------------------------------

export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = await getPage("faq");

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, paths.faq),
  };
};
