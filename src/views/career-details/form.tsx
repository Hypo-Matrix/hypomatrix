"use client";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Props = { id: string; applyUrl: string };

const Form = (props: Props) => {
  const { id, applyUrl } = props;
  const pathname = usePathname(); 

  useEffect(() => {
    if (window.Tally) {
      window.Tally.loadEmbeds();
    }
  }, [pathname]); 

  return (
    <div
      className="px-10 lg:px-14 bg-white mt-10 md:mt-20 py-10 lg:py-12 rounded-lg"
      id={id}
    >
      <h1 className="text-card text-xl sm:text-4xl font-semibold mb-8">
        Please complete the form below to apply:
      </h1>
      <iframe
        data-tally-src="https://tally.so/embed/mVdOog?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="987"
        // @ts-expect-error you should not do error
        rameborder="0"
        marginheight="0"
        marginwidth="0"
        title="Form"
      ></iframe>

      <Script
        id="tally-js"
        src={applyUrl}
        onLoad={() => {
          window.Tally?.loadEmbeds();
        }}
      />
    </div>
  );
};

export default Form;