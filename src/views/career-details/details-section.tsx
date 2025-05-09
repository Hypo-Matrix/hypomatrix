import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { TCareer } from "@/types/cms/career";
import Image from "next/image";

type Props = {
  career: TCareer;
};

const DetailsSection = (props: Props) => {
  const { career } = props;

  return (
    <section className="md:py-[130px] py-[50px] container px-4 md:px:0">
      {/* Banner Image */}
      <div className="lg:flex justify-between">
        <div className="relative w-full xl:w-[700px] aspect-square mb-16">
          <Image
            src={career.thumbnail.url}
            alt={career.position}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div className="lg:px-14">
          <h2 className="text-heading-3 md:text-heading-2 font-heading font-bold mb-5">
            {career.position}
          </h2>
          {/* Title and Description */}
          <div className="max-w-[600px] xl:max-w-[700px]">
            <p className="text-muted-foreground">{career.description}</p>
          </div>
          <div className="mb-16 mt-10">
            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 sm:gap-y-4 gap-x-16">
              <div>
                <span className="text-muted-foreground">Category</span>
                <p className="font-heading text-heading-5 font-bold">
                  {career.sector}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Apply Before</span>
                <p className="font-heading text-heading-5 font-bold">
                  {format(career.applicationEndDate, "dd-MM-yyyy")}
                </p>
              </div>
            </div>
            <Button
              variant="default"
              asChild
              size={"xl"}
              className="mt-12 max-w-[300px] w-full"
            >
              <Link href={career.applyUrl} target="_blank">
                <span>Apply Now</span>
                <LinkIcon />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div
        className="prose prose-invert text-muted-foreground w-full max-w-full"
        dangerouslySetInnerHTML={{ __html: career.content.html }}
      />
    </section>
  );
};

export default DetailsSection;
