"use client";

import dynamic from "next/dynamic";

const CoreForm = dynamic(() => import("./core-form"), { ssr: false });

type Props = {
  applyUrl: string;
};

const FormSection = (props: Props) => {
  const { applyUrl } = props;

  return <CoreForm id="apply-form" applyUrl={applyUrl} />;
};

export default FormSection;
