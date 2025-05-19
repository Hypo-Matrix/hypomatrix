import Script from "next/script";

type Props = { id: string; applyUrl: string };

const CoreForm = (props: Props) => {
  const { id, applyUrl } = props;

  return (
    <div
      className="px-10 lg:px-14 bg-white mt-10 md:mt-20 py-10 lg:py-12 rounded-lg"
      id={id}
    >
      <h1 className="text-card text-xl sm:text-4xl font-semibold mb-8">
        Please complete the form below to apply:
      </h1>
      <iframe
        data-tally-src={applyUrl}
        width="100%"
        frameBorder="0"
        // @ts-expect-error you should not do error
        marginHeight="0"
        // @ts-expect-error you should not do error
        marginWidth="0"
        title="Contact form"
      ></iframe>

      <Script
        id="tally-js"
        src="https://tally.so/widgets/embed.js"
        onLoad={() => {
          window?.Tally.loadEmbeds();
        }}
      />
    </div>
  );
};

export default CoreForm;
