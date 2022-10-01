import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { RoughNotationGroup } from 'react-rough-notation';
import { intersectionOptions } from '../constants';
import { contact } from '../constants/contact';
import { useIntersection } from '../hooks/useIntersection';
import { MediaIcons } from './MediaIcons';
import { RoughNotationWrapper } from './RoughNotationWrapper';
import { shimmer, toBase64 } from '../utils';

export const Contact = () => {
  const ref = useRef();
  const isIntersecting = useIntersection(ref, {
    threshold: intersectionOptions.DEFAULT_TRESHOLD,
    rootMargin: intersectionOptions.DEFAULT_ROOT_MARGIN,
  });

  return (
    <section id="contact" className="w-full p-3 py-20 bg-white">
      <div className="md:grid grid-cols-3 gap-3 max-w-5xl mx-auto">
        <div className="col-span-2 flex flex-col items-center justify-center">
          <RoughNotationGroup show={isIntersecting}>
            <RoughNotationWrapper color="#f5bdb2" type="highlight">
              <h1 ref={ref} className="text-gray-700 tracking-wide">
                Contact me
              </h1>
            </RoughNotationWrapper>
          </RoughNotationGroup>
          <p className="leading-5 text-sm py-5">{contact.MOTTO}</p>
          <div className="w-[200px] py-5">
            <MediaIcons />
          </div>
        </div>
        <div className="col-span-1 w-full h-auto mx-auto">
          <Image
            className="relative z-0 rounded-md"
            src="/static/images/contact-me.jpg"
            alt="contact image"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(1920, 1280)
            )}`}
            width="1920"
            height="1280"
            layout="responsive"
          />
        </div>
      </div>
    </section>
  );
};
