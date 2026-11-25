import paths from "@/router/paths";
import { getProject, getProjects } from "@/services/apis/project";
import { generatePageMetadata } from "@/utils/page-metadata";
import ProjectDetailsView from "@/views/projects/details";
import { Metadata } from "next";
import { notFound } from "next/navigation";


type Props = {
  params: Promise<{ slug: string }>;
};

const ProjectDetailsPage = async (props: Props) => {
  const { slug } = await props.params;
  const projectRes = await getProject(slug);

  if (!projectRes.data) {
    notFound();
  }

  return (
    <>
      <ProjectDetailsView project={projectRes.data} />
    </>
  );
};

export default ProjectDetailsPage;

// ----------------------------------------------------------------------

export async function generateStaticParams() {
  const dataRes = await getProjects();

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
  const { data } = await getProject(slug);

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, paths.works.details(slug)),
  };
};
