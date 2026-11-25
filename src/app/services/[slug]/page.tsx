import paths from "@/router/paths";
import { getService, getServices } from "@/services/apis/service";
import { generatePageMetadata } from "@/utils/page-metadata";
import ServiceDetailsView from "@/views/services/details";
import { Metadata } from "next";
import { notFound } from "next/navigation";


type Props = {
  params: Promise<{ slug: string }>;
};

const ServiceDetailsPage = async (props: Props) => {
  const { slug } = await props.params;
  const serviceRes = await getService(slug);

  if (!serviceRes.data) {
    notFound();
  }

  return (
    <>
      <ServiceDetailsView service={serviceRes.data} />
    </>
  );
};

export default ServiceDetailsPage;

// ----------------------------------------------------------------------

export async function generateStaticParams() {
  const servicesRes = await getServices();

  if (!servicesRes.data) {
    return [];
  }

  return servicesRes.data.map((service) => ({
    slug: service.slug,
  }));
}

// ----------------------------------------------------------------------

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { slug } = await props.params;
  const { data } = await getService(slug);

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, paths.services.details(slug)),
  };
};
