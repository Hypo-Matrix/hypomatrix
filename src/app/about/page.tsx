import paths from "@/router/paths";
import { getPage } from "@/services/apis/page";
import { generatePageMetadata } from "@/utils/page-metadata";
import AboutView from "@/views/about";
import { Metadata } from "next";
import { notFound } from "next/navigation";


type Props = {};

const AboutPage = async (props: Props) => {
  const pageRes = await getPage("about");

  if (!pageRes.data) {
    notFound();
  }

  return (
    <>
      <AboutView page={pageRes.data} />
    </>
  );
};

export default AboutPage;

// ----------------------------------------------------------------------

export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = await getPage("about");

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, paths.about),
  };
};
