import { TAsset, TMetaTag } from "./common";

export type TCareer = {
  id: string;
  slug: string;
  applicationEndDate: string;
  sector: string;
  salary:number;
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