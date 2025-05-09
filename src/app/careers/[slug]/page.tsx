import paths from "@/router/paths";
import { getCareer, getCareers } from "@/services/apis/career";
import { generatePageMetadata } from "@/utils/page-metadata";
import CareerDetailsView from "@/views/career-details";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

const CareerDetailsPage = async (props: Props) => {
  const { slug } = await props.params;
  const careerRes = await getCareer(slug);

  if (!careerRes.data) {
    notFound();
  }

  return (
    <>
      <CareerDetailsView career={careerRes.data} />
    </>
  );
};

export default CareerDetailsPage;

// ----------------------------------------------------------------------

export async function generateStaticParams() {
  const careersRes = await getCareers();

  if (!careersRes.data) {
    return [];
  }

  return careersRes.data.map((career) => ({
    slug: career.slug,
  }));
}

// ----------------------------------------------------------------------

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { slug } = await props.params;
  const { data } = await getCareer(slug);

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, paths.careers.details(slug)),
  };
};
