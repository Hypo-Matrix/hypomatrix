import FeaturedButton from "@/components/buttons/FeaturedButton";
import NonFeaturedButton from "@/components/buttons/NonFeaturedButton";
import { Card, CardContent } from "@/components/ui/card";
import paths from "@/router/paths";
import { TCareer } from "@/types/cms/career";
import { formatPrice } from "@/utils/number";

type Props = {
  data: TCareer;
};

const CareerCard = async (props: Props) => {
  const { data } = props;
  return (
    <Card key={data.id} className="rounded-[22px] bg-card">
      <CardContent>
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">{data.position}</h3>
          {data.salary && <h2 className="border border-primary rounded-full px-[10px] py-[4px] text-sm">
            {formatPrice(data.salary, "BDT")}
          </h2>}
        </div>
        <p className="text-muted-foreground mt-3 mb-10">
          <span className="text-primary">{data.sector}</span>
          <span> | </span>
          {data.contractType}
          <span> & </span>
          {data.workType}
        </p>

        {data.featured === true ? (
          <FeaturedButton href={paths.careers.details(data.slug)}>
            Learn More
          </FeaturedButton>
        ) : (
          <NonFeaturedButton href={paths.careers.details(data.slug)}>
            Learn More
          </NonFeaturedButton>
        )}
      </CardContent>
    </Card>
  );
};

export default CareerCard;
