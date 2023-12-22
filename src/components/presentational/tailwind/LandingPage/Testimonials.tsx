'use client';

import { T } from '@/components/ui/Typography';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import acmeDarkLogo from '@public/logos/acme-logo-dark.png';
import acmeLightLogo from '@public/logos/acme-logo-light.png';
import Image from 'next/image';
import Avatar1 from '@public/assets/avatar_1.jpg';
import Avatar2 from '@public/assets/avatar_2.jpg';
import Avatar3 from '@public/assets/avatar_3.jpg';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const testimonials = [
    {
      name: 'Mark Zuckerberg',
      position: 'CEO, Facebook',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
      image: Avatar1,
    },
    {
      name: 'Sed Cursus',
      position: 'Senior Developer, Google',
      text: 'Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
      image: Avatar2,
    },
    {
      name: 'John Doe',
      position: 'Product Manager, Amazon',
      text: 'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.',
      image: Avatar3,
    },
    // add more testimonials as needed
  ];

  return (
    <section className="bg-gray-50 dark:bg-slate-800 my-24 mt-40">
      <div className="max-w-screen-lg mx-auto text-center py-16 sm:py-20 px-4 lg:py-24">
        <figure className=" mx-auto">
          <svg
            className="h-12 mx-auto mb-3 text-gray-400 dark:text-slate-600"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>

          <Transition
            key={activeTestimonial}
            show={true}
            enter="transition-all ease-in-out duration-700"
            enterFrom="opacity-0 transform scale-90"
            enterTo="opacity-100 transform scale-100"
            leave="transition-all ease-in-out duration-700"
            leaveFrom="opacity-100 transform scale-100"
            leaveTo="opacity-0 transform scale-90"
          >
            <Transition.Child unmount>
              <blockquote>
                <T.P className="text-3xl leading-[38px] font-medium text-gray-900 md:text-4xl md:leading-[44px] tracking-normal md:tracking-tight dark:text-slate-50">
                  {testimonials[activeTestimonial].text}
                </T.P>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <div className="w-8 h-8 border rounded-full overflow-hidden">
                  <Image
                    width={48}
                    height={48}
                    src={testimonials[activeTestimonial].image}
                    alt="profile picture"
                  />
                </div>
                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-slate-700">
                  <T.P className="pr-3 font-medium text-gray-600 dark:text-slate-400">
                    {testimonials[activeTestimonial].name}
                  </T.P>
                  <T.P className="pl-3 text-sm font-light text-gray-500 dark:text-slate-400">
                    {testimonials[activeTestimonial].position}
                  </T.P>
                </div>
              </figcaption>
            </Transition.Child>
          </Transition>

          <div className="flex justify-center space-x-4 mt-10">
            {testimonials.map((_, index) => (
              <div
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  activeTestimonial === index
                    ? 'bg-gray-500 dark:bg-slate-400'
                    : 'bg-gray-300 dark:bg-slate-700'
                }`}
              ></div>
            ))}
          </div>
        </figure>
      </div>
      <div></div>
    </section>
  );
};

export default Testimonials;
