import React, { useRef } from 'react';
import { RoughNotationGroup } from 'react-rough-notation';
import { intersectionOptions, MY_NAME } from '../constants';
import { main } from '../constants/main';
import { MediaIcons } from './MediaIcons';
import { RoughNotationWrapper } from './RoughNotationWrapper';
import { useIntersection } from 'react-use';
import Flip from 'react-reveal/Flip';

export const Main = () => {
  const ref = useRef(null);
  const intersection = useIntersection(ref, {
    root: intersectionOptions.DEFAULT_ROOT,
    threshold: intersectionOptions.DEFAULT_THRESHOLD,
    rootMargin: intersectionOptions.DEFAULT_ROOT_MARGIN,
  });

  return (
    <div id="main" className="w-full h-screen bg-white text-center p-3 pt-20">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <section className="pb-10">
          <p className="text-sm pb-10 tracking-wide uppercase text-gray-500">
            {main.MOTTO}
          </p>
          <h1 className="text-gray-700 tracking-wide">
            Hi. I am <span className="text-blue-400">{main.NAME}</span>
          </h1>
          <RoughNotationGroup show={intersection?.isIntersecting}>
            <RoughNotationWrapper
              color="#f5bdb2"
              type="underline"
              iterations={2}
            >
              <h3 ref={ref}>{main.TITLE}</h3>
            </RoughNotationWrapper>
          </RoughNotationGroup>
        </section>
        <Flip left>
          <p className="leading-5 text-sm">{main.DESCRIPTION}</p>
        </Flip>
        <section className="absolute top-[85%] landscape:hidden lg:landscape:block">
          <p className="pb-3 text-xs uppercase text-gray-500">
            {main.MEDIA_MOTTO}
          </p>
          <div className="w-[200px]">
            <MediaIcons />
          </div>
        </section>
      </div>
    </div>
  );
};
