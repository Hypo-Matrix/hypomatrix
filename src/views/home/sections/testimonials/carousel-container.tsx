"use client";

import { Carousel } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CarouselContainer = (props: Props) => {
  const { children } = props;
  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
        skipSnaps: true,
        active: true,
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      {children}
    </Carousel>
  );
};

export default CarouselContainer;
