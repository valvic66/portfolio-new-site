import React, { useRef } from 'react';
import { FaCss3Alt, FaHtml5, FaReact, FaGitAlt } from 'react-icons/fa';
import { TbBrandJavascript } from 'react-icons/tb';
import { SiTestinglibrary } from 'react-icons/si';
import { DiResponsive } from 'react-icons/di';
import { VscDebugAll } from 'react-icons/vsc';
import { ImAccessibility } from 'react-icons/im';
import { CgPerformance } from 'react-icons/cg';
import { GrGraphQl } from 'react-icons/gr';
import { AiOutlineApi } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { RoughNotationWrapper } from './RoughNotationWrapper';
import { RoughNotationGroup } from 'react-rough-notation';
import { intersectionOptions } from '../constants';
import { skills } from '../constants/skills';
import { useIntersection } from 'react-use';
import { Slide } from 'react-awesome-reveal';

export const Skills = () => {
  const ref = useRef(null);
  const intersection = useIntersection(ref, {
    root: intersectionOptions.DEFAULT_ROOT,
    threshold: intersectionOptions.DEFAULT_THRESHOLD,
    rootMargin: intersectionOptions.DEFAULT_ROOT_MARGIN,
  });

  return (
    <section id="skills" className="w-full p-3 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-start">
          <RoughNotationGroup show={intersection?.isIntersecting}>
            <RoughNotationWrapper color="#f5bdb2" type="highlight">
              <h1 ref={ref} className="text-gray-700 tracking-wide">
                My skills
              </h1>
            </RoughNotationWrapper>
          </RoughNotationGroup>
          <Slide triggerOnce duration={500}>
            <p className="leading-5 text-sm py-5">{skills.DESCRIPTION}</p>
          </Slide>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-4">
          <div className="grid grid-cols-2 place-items-center bg-white rounded-md py-1">
            <FaHtml5 className="text-blue-400 text-[64px]" />
            <p className="text-sm">HTML</p>
          </div>
          <div className="grid grid-cols-2 place-items-center bg-white rounded-md py-1">
            <FaCss3Alt className="text-orange-500 text-[64px]" />
            <p className="text-sm">CSS</p>
          </div>
          <div className="grid grid-cols-2 place-items-center bg-white rounded-md py-1">
            <DiResponsive className="text-[64px]" />
            <p className="text-sm">Responsive Design</p>
          </div>
          <div className="grid grid-cols-2 place-items-center bg-white rounded-md py-1">
            <FaReact className="text-blue-500 text-[64px]" />
            <p className="text-sm">{'React & React Native'}</p>
          </div>
          <div className="grid grid-cols-2 place-items-center bg-white rounded-md py-1">
            <TbBrandJavascript className="text-orange-500 text-[64px]" />
            <p className="text-sm">JavaScript</p>
          </div>
          <div className="grid grid-cols-2 place-items-center bg-white rounded-md py-1">
            <FaGitAlt className="text-[64px]" />
            <p className="text-sm">Git</p>
          </div>
          <div className="grid grid-cols-2 place-items-center  bg-white rounded-md py-1">
            <VscDebugAll className="text-[64px]" />
            <p className="text-sm">Debugging</p>
          </div>
          <div className="grid grid-cols-2 place-items-center  bg-white rounded-md py-1">
            <SiTestinglibrary className="text-red-500 text-[64px]" />
            <p className="text-sm">Testing</p>
          </div>
          <div className="grid grid-cols-2 place-items-center  bg-white rounded-md py-1">
            <ImAccessibility className="text-orange-400 text-[64px]" />
            <p className="text-sm">Accessibility</p>
          </div>
          <div className="grid grid-cols-2 place-items-center  bg-white rounded-md py-1">
            <CgPerformance className="text-[64px]" />
            <p className="text-sm">Web Performance</p>
          </div>
          <div className="grid grid-cols-2 place-items-center  bg-white rounded-md py-1">
            <GrGraphQl className="text-red-500 text-[64px]" />
            <p className="text-sm">GraphQL</p>
          </div>
          <div className="grid grid-cols-2 place-items-center  bg-white rounded-md py-1">
            <AiOutlineApi className="text-[64px]" />
            <p className="text-sm">Rest API</p>
          </div>
        </div>
      </div>
    </section>
  );
};
