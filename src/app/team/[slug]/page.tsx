import { getMember, getMembers } from "@/services/apis/member";
import { generatePageMetadata } from "@/utils/page-metadata";
import TeamDetailsView from "@/views/team/details";
import { Metadata } from "next";
import { notFound } from "next/navigation";


type Props = {
  params: Promise<{ slug: string }>;
};

const TeamDetailsPage = async (props: Props) => {
  const { slug } = await props.params;
  const memberRes = await getMember(slug);

  if (!memberRes.data) {
    notFound();
  }

  return (
    <>
      <TeamDetailsView member={memberRes.data} />
    </>
  );
};

export default TeamDetailsPage;

// ----------------------------------------------------------------------

export async function generateStaticParams() {
  const dataRes = await getMembers(null);

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
  const { data } = await getMember(slug);

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, "/"),
  };
};
