import React from "react";
import { getCareers } from "@/services/apis/career";
import paths from "@/router/paths";
import FeaturedButton from "@/components/buttons/FeaturedButton";
import NonFeaturedButton from "@/components/buttons/NonFeaturedButton";
import { Card, CardContent } from "@/components/ui/card";

type Props = {};

const CareerCard = async (props: Props) => {
  const careerRes = await getCareers();

  return (
    <div className="py-[50px] md:py-[100px] grid lg:grid-cols-2 xl:grid-cols-3 gap-6 container">
      {careerRes?.data?.map((career) => (
        <Card key={career.id} className="rounded-[22px] bg-card">
          <CardContent>
            <h3 className="text-2xl font-bold">{career.position}</h3>
            <p className="text-muted-foreground mt-3 mb-10">
              <span className="text-primary">{career.sector}</span>
              <span> | </span>
              {career.contractType}
              <span> & </span>
              {career.workType}
            </p>

            {career.featured === true ? (
              <FeaturedButton href={paths.careers.details(career.slug)}>
                Learn More
              </FeaturedButton>
            ) : (
              <NonFeaturedButton href={paths.careers.details(career.slug)}>
                Learn More
              </NonFeaturedButton>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CareerCard;
