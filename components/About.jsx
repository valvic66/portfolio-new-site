import React, { useRef } from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import { RoughNotationWrapper } from './RoughNotationWrapper';
import { RoughNotationGroup } from 'react-rough-notation';
import { about } from '../constants/about';
import { intersectionOptions } from '../constants';
// import { shimmer, toBase64 } from '../utils';
import { useIntersection } from 'react-use';
import { Slide } from 'react-awesome-reveal';

export const About = () => {
  const ref = useRef(null);
  const intersection = useIntersection(ref, {
    root: intersectionOptions.DEFAULT_ROOT,
    threshold: intersectionOptions.DEFAULT_THRESHOLD,
    rootMargin: intersectionOptions.DEFAULT_ROOT_MARGIN,
  });

  return (
    <section id="about" className="w-full p-3 py-20">
      <div className="max-w-5xl mx-auto md:grid grid-cols-3 gap-3">
        <div className="col-span-2 flex flex-col justify-center items-start">
          <RoughNotationGroup show={intersection?.isIntersecting}>
            <RoughNotationWrapper color="#f5bdb2" type="highlight">
              <h1 ref={ref} className="text-gray-700 tracking-wide">
                Who am I?
              </h1>
            </RoughNotationWrapper>
          </RoughNotationGroup>
          <Slide triggerOnce duration={500}>
            <p className="leading-5 text-sm py-5">{about.DESCRIPTION}</p>
          </Slide>
          <div className="pb-6">
            <Link href="/#projects">
              <li className="underline text-sd text-gray-600 list-none">
                Check some of my projects
              </li>
            </Link>
          </div>
        </div>
        <div className="col-span-1 w-full h-auto">
          <img
            className="relative z-0 rounded-md"
            src="/static/images/me-image-1.jpg"
            alt="my own image"
            width="970"
            height="1296"
          />
        </div>
      </div>
    </section>
  );
};
