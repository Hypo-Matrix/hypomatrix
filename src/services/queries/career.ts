import { assetImageQuery, metaTagsQuery } from "./common";

const commonQuery = `
    applicationEndDate
    applyUrl
    contractType
    slug
    workType
    title
    thumbnail ${assetImageQuery}
    position
    description
    id
    sector
    featured
`;

export const careersQuery = `
query CareersQuery {
  careers(stage: PUBLISHED) {
    ${commonQuery}
  }
}
`;

export const careerQuery = `
query CareerQuery($slug: String = "") {
  career(stage: PUBLISHED, where: {slug: $slug}) {
    ${commonQuery}
    content {
      html
    }
    metaTags ${metaTagsQuery}
  }
}
`;
