import { Anchor } from '@/components/Anchor';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import ChevronRightIcon from 'lucide-react/dist/esm/icons/chevron-right';
import { T } from '@/components/ui/Typography';

type HeroSectionProps = {
  title: string;
  description: string;
  image?: string;
};

export default function HeroSection({
  title,
  description,
  image,
}: HeroSectionProps) {
  const imageSrc = image ? image : '/mockups/laptop.jpeg';
  return (
    <section className="bg-white dark:bg-gray-900 mt-20">
      <div className="px-4 md:px-6 grid mx-auto md:container lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="place-self-center max-w-2xl space-y-6 mr-auto mb-16 lg:col-span-7">
          <div className="flex flex-col gap-4 items-start justify-start">
            <div className="flex gap-x-2 md:gap-x-3 border group items-center pr-2 border-gray-300 dark:border-gray-700 rounded-xl shadow-sm p-[2px]">
              <div className="flex items-center border border-gray-300 bg-muted dark:bg-slate-800 dark:border-gray-700 rounded-lg shadow-sm px-2 py-[2px]">
                <T.Small className="text-xs md:text-sm text-gray-600 dark:text-slate-400">
                  What's new?
                </T.Small>
              </div>
              <div className="flex items-center">
                <T.Small className="text-xs md:text-sm text-gray-600 dark:text-slate-400">
                  New Feature now available
                </T.Small>
                <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition" />
              </div>
            </div>
            <h1 className="font-semibold max-w-2xl tracking-tight text-4xl leading-[44px] md:text-5xl xl:text-6xl xl:leading-[72px] text-gray-900 dark:text-slate-50">
              {title}
            </h1>
          </div>
          <p className="max-w-xl font-normal text-gray-600 lg:mb-8 md:text-lg lg:text-xl dark:text-slate-400">
            {description}
          </p>
          <div className="space-y-3 md:space-x-3">
            <Anchor href="/login" className="w-full lg:w-fit">
              <Button
                variant="default"
                size="lg"
                className="group mt-3 w-full md:w-fit "
              >
                Log In
                <svg
                  className="ml-2 -mr-1 w-5 h-5 group-hover:translate-x-1 transition"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Anchor>
            <Anchor href="/">
              <Button
                variant="outline"
                size="lg"
                className="group mt-3 px-6 w-full md:w-fit"
              >
                Learn More
                <ChevronRightIcon className="ml-2 group-hover:translate-x-1 transition" />
              </Button>
            </Anchor>
          </div>
        </div>
        <div className="lg:mt-0 lg:col-span-5 rounded-lg overflow-hidden h-[320px] md:h-[640px] md:w-full lg:flex">
          <Image
            src={imageSrc}
            layout="responsive"
            width={640}
            height={960}
            alt="mockup"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
