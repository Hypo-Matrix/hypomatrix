import paths from "@/router/paths";
import { getPage } from "@/services/apis/page";
import { generatePageMetadata } from "@/utils/page-metadata";
import ContactView from "@/views/contact";
import { Metadata } from "next";
import { notFound } from "next/navigation";


const ContactPage = async () => {
  const pageRes = await getPage("contact");

  if (!pageRes.data) {
    notFound();
  }

  return (
    <>
      <ContactView page={pageRes.data} />
    </>
  );
};

export default ContactPage;

// ----------------------------------------------------------------------

export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = await getPage("contact");

  if (!data) {
    return {};
  }

  return {
    ...generatePageMetadata(data?.metaTags, paths.contact),
  };
};
