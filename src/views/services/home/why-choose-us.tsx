import img from "@/assets/ceo-square.jpg";
import SectionHeader from "@/components/common/section-header";
import CommonMotionBox from "@/lib/motion/common-motion";
import Image from "next/image";
import StatsSection from "../../about/hero/stats";

const WhyChooseUs = () => {
  const videoId = "dTo6Prv2asc";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  return (
    <CommonMotionBox>
      <section className="container md:py-[130px] py-[50px] grid grid-cols-1 lg:grid-cols-3 gap-y-12 max-xl:gap-x-32 px-4 md:px:0">
        <div className="col-span-1 lg:col-span-2">
          <SectionHeader
            subtitle={"Why Choose Us"}
            title={"Your Trusted Partner for Success & Innovation"}
            description={`At Hypomatrix, we specialize in delivering strategic growth
          solutions tailored to elevate your business to new heights. By
          combining innovative strategies, data-driven insights, and creativity.`}
            className="mb-10 lg:w-[600px]"
          />
          <StatsSection />
        </div>

        <div className="col-span-1 lg:col-span-1 hidden lg:block">
          <div className="aspect-square relative max-w-[500px] lg:ml-auto">
            <Image
              src={img}
              alt="image not found"
              fill
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>
    </CommonMotionBox>
  );
};

export default WhyChooseUs;
