import { cn } from "@/lib/utils";
import { TClient } from "@/types/cms/clients";
import { Star } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

type Props = {
  data: TClient;
} & React.ComponentProps<"article">;

const ReviewCard = (props: Props) => {
  const { data, className, ...others } = props;

  return (
    <Card className={cn("bg-accent", className)} {...others}>
      <CardContent>
        <div className="flex items-center gap-4 mb-8">
          <Image
            src={data.avatar.url}
            alt="Image not found"
            className="aspect-square rounded-2xl"
            height={70}
            width={70}
          />
          <div>
            <h3 className="font-bold text-lg">{data.name}</h3>
            <p className="text-muted-foreground">
              {data.position}, {data.company}
            </p>
          </div>
        </div>

        <div className="flex mb-4 gap-x-0.5">
          {[...Array(data.rating)].map((_, i) => (
            <Star key={i} className="size-5 fill-primary text-primary" />
          ))}
        </div>

        <blockquote className="">{data.review}</blockquote>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
