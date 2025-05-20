import MemberCard from "@/components/cards/member-card";
import SectionHeader from "@/components/common/section-header";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import CommonMotionBox from "@/lib/motion/common-motion";
import { getMembers } from "@/services/apis/member";
import CarouselContainer from "./carousel-container";

async function TeamSection() {
  const membersRes = await getMembers("order_ASC");
  return (
    <section id="team" className="md:py-[130px] py-[50px]">
      <CommonMotionBox>
        <SectionHeader
          title={"Meet the Minds Behind the Magic"}
          subtitle={"Our Experts"}
          className="md:mb-[100px] mb-[50px] max-w-2xl mx-auto px-4 md:px-0"
          align="center"
        />

        <div className="min-[2000px]:container px-5">
          <CarouselContainer>
            <CarouselContent className="-ml-6">
              {membersRes.data?.map((member) => (
                <CarouselItem
                  key={member.id}
                  className="basis-[75%] md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 pl-6"
                >
                  <MemberCard data={member} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </CarouselContainer>
        </div>
      </CommonMotionBox>
    </section>
  );
}

export default TeamSection;
