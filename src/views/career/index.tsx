import PageHeader from "@/components/common/page-header";
import paths from "@/router/paths";

import { TPage } from "@/types/cms/page";
import React from "react";
import CareerCard from "./career-card";

type Props = {
  page: TPage;
};

const CareersView = async (props: Props) => {
  const { page } = props;

  return (
    <div>
      <PageHeader
        title={page.title}
        links={[
          {
            title: "Careers",
            href: paths.careers.root,
          },
        ]}
        description={page.description}
      />

      <CareerCard />
    </div>
  );
};

export default CareersView;
