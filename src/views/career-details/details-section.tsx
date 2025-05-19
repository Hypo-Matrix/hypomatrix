import { Button } from "@/components/ui/button";
import { TCareer } from "@/types/cms/career";
import { format } from "date-fns";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FormSection from "./form-section";

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
            priority
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
            <div className="flex justify-start items-center gap-y-5 sm:gap-y-4 gap-x-16">
              <div>
                <span className="text-muted-foreground">Salary</span>
                <p className="font-heading text-heading-5 font-bold">
                  {career.salary} BDT
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
              <Link href="#apply-form" className="scroll-smooth duration-100">
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

      <FormSection applyUrl={career.applyUrl} />
    </section>
  );
};

export default DetailsSection;
