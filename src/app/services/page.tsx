import paths from "@/router/paths";
import { getPage } from "@/services/apis/page";
import { generatePageMetadata } from "@/utils/page-metadata";
import ServicesView from "@/views/services/home";
import { Metadata } from "next";
import { notFound } from "next/navigation";


const ServicesPage = async () => {
  const pageRes = await getPage("services");

  if (!pageRes.data) {
    notFound();
  }

  return (
    <>
      <ServicesView page={pageRes.data} />
    </>
  );
};

export default ServicesPage;

// ----------------------------------------------------------------------

export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = await getPage("services");

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, paths.services.root),
  };
};
