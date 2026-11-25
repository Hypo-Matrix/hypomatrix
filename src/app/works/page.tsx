import paths from "@/router/paths";
import { getPage } from "@/services/apis/page";
import { generatePageMetadata } from "@/utils/page-metadata";
import ProjectsView from "@/views/projects/home";
import { Metadata } from "next";
import { notFound } from "next/navigation";


type Props = {};

const WorksPage = async (props: Props) => {
  const pageRes = await getPage("works");

  if (!pageRes.data) {
    notFound();
  }

  return (
    <>
      <ProjectsView page={pageRes.data} />
    </>
  );
};

export default WorksPage;

// ----------------------------------------------------------------------

export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = await getPage("works");

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, paths.works.root),
  };
};
