import { FaLinkedin } from "react-icons/fa6";
import { SocialIconsType } from "@/types/cms/common";
import { IconType } from "react-icons/lib";
import { Earth } from "lucide-react";
import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiX,
  SiYoutube,
} from "react-icons/si";

const socialIcons: Record<SocialIconsType, IconType> = {
  facebook: SiFacebook,
  x: SiX,
  linkedin: FaLinkedin,
  github: SiGithub,
  instagram: SiInstagram,
  youtube: SiYoutube,
  portfolio: Earth,
};

export default socialIcons;
