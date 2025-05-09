import { TAsset, TMetaTag } from "./common";

export type TCareer = {
  id: string;
  slug: string;
  applicationEndDate: string;
  sector: string;
  description: string;
  title: string;
  thumbnail: TAsset;
  content: {
    html: string;
  };
  position: string;
  contractType: string;
  workType: string;
  applyUrl: string;
  featured: boolean;
  metaTags?: TMetaTag;
};
// import { TMetaTag } from "./common";

// export type TCareer = {
//   id: string;
//   slug: string;
//   applicationEndDate: string;
//   sector: string;
//   content: {
//     html: string;
//   };
//   position: string;
//   contractType: "Full Time" | "Contact Basis" | "Part Time";
//   workType: "Remote" | "On-Site" | "Hybrid";
//   applyUrl: string;
//   metaTags?: TMetaTag;
// };
