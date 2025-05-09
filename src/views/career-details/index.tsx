import PageHeader from "@/components/common/page-header";
import paths from "@/router/paths";
import { TCareer } from "@/types/cms/career";
import React from "react";
import DetailsSection from "./details-section";

type Props = {
  career: TCareer;
};
const CareerDetailsView = (props: Props) => {
  const { career } = props;

  return (
    <div>
      <PageHeader
        title={career.position}
        description={career.title}
        links={[
          { title: "Careers", href: paths.careers.root },
          { title: "Details", href: paths.careers.details(career.slug) },
        ]}
      />
      <DetailsSection career={career} />
    </div>
  );
};

export default CareerDetailsView;
