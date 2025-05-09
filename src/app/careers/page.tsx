import paths from "@/router/paths";
import { getPage } from "@/services/apis/page";
import { generatePageMetadata } from "@/utils/page-metadata";
import CareersView from "@/views/career";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const CareersPage = async () => {
  const pageRes = await getPage("careers");

  if (!pageRes.data) {
    notFound();
  }

  return (
    <>
      <CareersView page={pageRes.data} />
    </>
  );
};

export default CareersPage;

// ----------------------------------------------------------------------

export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = await getPage("careers");

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, paths.careers.root),
  };
};
