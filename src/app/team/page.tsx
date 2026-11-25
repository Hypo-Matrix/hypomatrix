import paths from "@/router/paths";
import { getPage } from "@/services/apis/page";
import { generatePageMetadata } from "@/utils/page-metadata";
import TeamView from "@/views/team/home";
import { Metadata } from "next";
import { notFound } from "next/navigation";


const TeamPage = async () => {
  const pageRes = await getPage("team");

  if (!pageRes.data) {
    notFound();
  }

  return (
    <>
      <TeamView page={pageRes.data} />
    </>
  );
};

export default TeamPage;

// ----------------------------------------------------------------------

export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = await getPage("team");

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, paths.team.root),
  };
};
