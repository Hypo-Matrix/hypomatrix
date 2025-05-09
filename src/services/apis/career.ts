import { TCareer } from "@/types/cms/career";
import { asyncWrapper, cmsFetch } from "../common";
import { careerQuery, careersQuery } from "../queries/career";

export const careerServiceTag = {
  careers: "careers",
  career: (slug: string) => `career-${slug}`,
};

export const getCareers = asyncWrapper<TCareer[]>(async () => {
  const response = await cmsFetch<{ careers: TCareer[] }>({
    body: JSON.stringify({
      query: careersQuery,
    }),
    next: { tags: [careerServiceTag.careers] },
  });

  return response?.careers || [];
});

export const getCareer = asyncWrapper<TCareer, [string]>(async (slug) => {
  const response = await cmsFetch<{ career: TCareer }>({
    body: JSON.stringify({
      query: careerQuery,
      variables: { slug },
    }),
    next: { tags: [careerServiceTag.career(slug)] },
  });

  return response?.career || null;
});
