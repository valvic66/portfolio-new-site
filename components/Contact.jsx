// import Image from 'next/image';
import React, { useRef } from 'react';
import { RoughNotationGroup } from 'react-rough-notation';
import { intersectionOptions } from '../constants';
import { contact } from '../constants/contact';
import { MediaIcons } from './MediaIcons';
import { RoughNotationWrapper } from './RoughNotationWrapper';
import { shimmer, toBase64 } from '../utils';
import { useIntersection } from 'react-use';
import Flip from 'react-reveal/Flip';

export const Contact = () => {
  const ref = useRef(null);
  const intersection = useIntersection(ref, {
    root: intersectionOptions.DEFAULT_ROOT,
    threshold: intersectionOptions.DEFAULT_THRESHOLD,
    rootMargin: intersectionOptions.DEFAULT_ROOT_MARGIN,
  });

  return (
    <section id="contact" className="w-full p-3 py-20 bg-white">
      <div className="md:grid grid-cols-3 gap-3 max-w-5xl mx-auto">
        <div className="col-span-2 flex flex-col items-center justify-center">
          <RoughNotationGroup show={intersection?.isIntersecting}>
            <RoughNotationWrapper color="#f5bdb2" type="highlight">
              <h1 ref={ref} className="text-gray-700 tracking-wide">
                Contact me
              </h1>
            </RoughNotationWrapper>
          </RoughNotationGroup>
          <Flip left>
            <p className="leading-5 text-sm py-5">{contact.MOTTO}</p>
          </Flip>
          <div className="w-[200px] py-5">
            <MediaIcons />
          </div>
        </div>
        <div className="col-span-1 w-full h-auto mx-auto">
          <img
            className="relative z-0 rounded-md"
            src="/static/images/contact-me.jpg"
            alt="contact image"
            width="1920"
            height="1280"
          />
        </div>
      </div>
    </section>
  );
};
