import { blogServiceTags } from "@/services/apis/blog";
import { careerServiceTag } from "@/services/apis/career";
import { clientServiceTags } from "@/services/apis/client";
import { faqServiceTags } from "@/services/apis/faq";
import { memberServiceTags } from "@/services/apis/member";
import { pageServiceTags } from "@/services/apis/page";
import { projectServiceTags } from "@/services/apis/project";
import { serviceServiceTags } from "@/services/apis/service";
import { websiteServiceTags } from "@/services/apis/website";
import { TBlogPost } from "@/types/cms/blog";
import { TCareer } from "@/types/cms/career";
import { CmsContentType } from "@/types/cms/enums";
import { TPage } from "@/types/cms/page";
import { TProject } from "@/types/cms/project";
import { TService } from "@/types/cms/service";
import { TMember } from "@/types/cms/team";
import { verifyWebhookSignature } from "@hygraph/utils";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const SECRET = process.env.CMS_REVALIDATE_SECRET as string;
  const headers = req.headers;
  const receivedSecret = headers.get("gcms-signature");

  if (!receivedSecret) {
    return Response.json(
      { message: "Missing GCMS signature" },
      { status: 400 }
    );
  }

  const body = await req.json();

  const isValidRequest = verifyWebhookSignature({
    body,
    secret: SECRET,
    signature: receivedSecret,
  });

  if (!isValidRequest) {
    return Response.json(
      { message: "Invalid GCMS signature" },
      { status: 401 }
    );
  }

  const type = body?.data?.__typename as CmsContentType | null;

  if (!type) {
    return Response.json({ message: "Invalid type" }, { status: 400 });
  }

  try {
    switch (type) {
      case CmsContentType.BlogCategory: {
        revalidateTag(blogServiceTags.blogCategories);
        break;
      }
      case CmsContentType.BlogPost: {
        const data = body.data as TBlogPost;
        revalidateTag(blogServiceTags.blogPosts);
        revalidateTag(blogServiceTags.blogPostsFeatured);
        revalidateTag(blogServiceTags.blogPost(data.slug));
        break;
      }
      case CmsContentType.Client: {
        revalidateTag(clientServiceTags.clients);
        break;
      }
      case CmsContentType.Faq: {
        revalidateTag(faqServiceTags.faqs);
        break;
      }
      case CmsContentType.Member: {
        const data = body.data as TMember;
        revalidateTag(memberServiceTags.members);
        revalidateTag(memberServiceTags.member(data.slug));
        break;
      }
      case CmsContentType.Page: {
        const data = body.data as TPage;
        revalidateTag(pageServiceTags.pages);
        revalidateTag(pageServiceTags.page(data.slug));
        break;
      }
      case CmsContentType.Project: {
        const data = body.data as TProject;
        revalidateTag(projectServiceTags.projects);
        revalidateTag(projectServiceTags.projectsFeatured);
        revalidateTag(projectServiceTags.project(data.slug));
        break;
      }
      case CmsContentType.Service: {
        const data = body.data as TService;
        revalidateTag(serviceServiceTags.services);
        revalidateTag(serviceServiceTags.service(data.slug));
        break;
      }
      case CmsContentType.Career: {
        const data = body.data as TCareer;
        revalidateTag(careerServiceTag.careers);
        revalidateTag(careerServiceTag.career(data.slug));
        break;
      }
      case CmsContentType.Website: {
        revalidateTag(websiteServiceTags.website);
        break;
      }
      default:
        return Response.json({ message: "Invalid type" }, { status: 400 });
    }
  } catch (err) {
    return Response.json({ message: "Revalidation failed" }, { status: 500 });
  }

  return Response.json({ message: "Revalidation successful" });
}
