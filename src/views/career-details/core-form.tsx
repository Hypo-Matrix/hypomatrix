import { useEffect } from "react";

type Props = { id: string; applyUrl: string };

const CoreForm = (props: Props) => {
  const { id, applyUrl } = props;

  useEffect(() => {
    if (typeof window !== "undefined" && "Tally" in window) {
      window.Tally.loadEmbeds();
    }
  }, []);

  return (
    <div
      className="px-10 lg:px-14 bg-foreground mt-10 md:mt-20 py-10 lg:py-12 rounded-lg"
      id={id}
    >
      <h1 className="text-card text-xl sm:text-4xl font-semibold mb-8">
        Please complete the form below to apply:
      </h1>

      <iframe
        data-tally-src={applyUrl}
        loading="lazy"
        width="100%"
        height="300"
        // @ts-expect-error - props from tally
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title="null"
        onError={(e) => console.log(e)}
      ></iframe>
    </div>
  );
};

export default CoreForm;
