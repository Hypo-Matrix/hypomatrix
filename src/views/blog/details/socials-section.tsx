import { Button } from "@/components/ui/button";
import { FaLinkedin } from "react-icons/fa6";
import { SiFacebook, SiX } from "react-icons/si";

type Props = {
  url: string;
};

const SocialsSection = ({ url }: Props) => {
  const encodedURL = encodeURIComponent(url);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedURL}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`,
  };

  return (
    <div className="flex flex-col gap-2 xl:flex-row xl:items-center flex-wrap">
      <h3 className="text-lg font-heading font-semibold uppercase text-muted-foreground">
        Share:
      </h3>
      <div className="flex items-center flex-wrap gap-1">
        <Button size="icon" variant="foreground" asChild>
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiFacebook size={18} />
          </a>
        </Button>
        <Button size="icon" variant="foreground" asChild>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiX size={18} />
          </a>
        </Button>
        <Button size="icon" variant="foreground" asChild>
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={18} />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default SocialsSection;
