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
import { useIntersection } from '../hooks/inView';
import { RoughNotationWrapper } from './RoughNotationWrapper';
import { RoughNotationGroup } from 'react-rough-notation';
import { intersectionOptions } from '../constants';
import { skills } from '../constants/skills';

export const Skills = () => {
  const ref = useRef();
  const isIntersecting = useIntersection(ref, {
    threshold: intersectionOptions.DEFAULT_TRESHOLD,
    rootMargin: intersectionOptions.DEFAULT_ROOT_MARGIN,
  });

  return (
    <section id="skills" className="w-full p-3 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-start">
          <RoughNotationGroup show={isIntersecting}>
            <RoughNotationWrapper color="#f5bdb2" type="highlight">
              <h1 ref={ref} className="text-gray-700 tracking-wide">
                My skills
              </h1>
            </RoughNotationWrapper>
          </RoughNotationGroup>
          <p className="leading-5 text-sm py-5">
            {skills.DESCRIPTION}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-4">
          <div className="grid grid-cols-2 place-items-center bg-white rounded-md py-1">
            <IconContext.Provider
              value={{
                color: 'blue',
                size: '64px',
              }}
            >
              <FaHtml5 />
            </IconContext.Provider>
            <p className="text-sm">HTML</p>
          </div>
          <div className="grid grid-cols-2 place-items-center bg-white rounded-md py-1">
            <IconContext.Provider
              value={{
                color: 'orange',
                size: '64px',
              }}
            >
              <FaCss3Alt />
            </IconContext.Provider>
            <p className="text-sm">CSS</p>
          </div>
          <div className="grid grid-cols-2 place-items-center bg-white rounded-md py-1">
            <IconContext.Provider
              value={{
                color: 'black',
                size: '64px',
              }}
            >
              <DiResponsive />
            </IconContext.Provider>
            <p className="text-sm">Responsive Design</p>
          </div>
          <div className="grid grid-cols-2 place-items-center bg-white rounded-md py-1">
            <IconContext.Provider
              value={{
                color: 'blue',
                size: '64px',
              }}
            >
              <FaReact />
            </IconContext.Provider>
            <p className="text-sm">{"React & React Native"}</p>
          </div>
          <div className="grid grid-cols-2 place-items-center bg-white rounded-md py-1">
            <IconContext.Provider
              value={{
                color: 'orange',
                size: '64px',
              }}
            >
              <TbBrandJavascript />
            </IconContext.Provider>
            <p className="text-sm">JavaScript</p>
          </div>
          <div className="grid grid-cols-2 place-items-center bg-white rounded-md py-1">
            <IconContext.Provider
              value={{
                color: 'black',
                size: '64px',
              }}
            >
              <FaGitAlt />
            </IconContext.Provider>
            <p className="text-sm">Git</p>
          </div>
          <div className="grid grid-cols-2 place-items-center  bg-white rounded-md py-1">
            <IconContext.Provider
              value={{
                color: 'black',
                size: '64px',
              }}
            >
              <VscDebugAll />
            </IconContext.Provider>
            <p className="text-sm">Debugging</p>
          </div>
          <div className="grid grid-cols-2 place-items-center  bg-white rounded-md py-1">
            <IconContext.Provider
              value={{
                color: 'red',
                size: '64px',
              }}
            >
              <SiTestinglibrary />
            </IconContext.Provider>
            <p className="text-sm">Testing</p>
          </div>
          <div className="grid grid-cols-2 place-items-center  bg-white rounded-md py-1">
            <IconContext.Provider
              value={{
                color: 'orange',
                size: '64px',
              }}
            >
              <ImAccessibility />
            </IconContext.Provider>
            <p className="text-sm">Accessibility</p>
          </div>
          <div className="grid grid-cols-2 place-items-center  bg-white rounded-md py-1">
            <IconContext.Provider
              value={{
                color: 'black',
                size: '64px',
              }}
            >
              <CgPerformance />
            </IconContext.Provider>
            <p className="text-sm">Web Performance</p>
          </div>
          <div className="grid grid-cols-2 place-items-center  bg-white rounded-md py-1">
            <IconContext.Provider
              value={{
                color: 'red',
                size: '64px',
              }}
            >
              <GrGraphQl />
            </IconContext.Provider>
            <p className="text-sm">GraphQL</p>
          </div>
          <div className="grid grid-cols-2 place-items-center  bg-white rounded-md py-1">
            <IconContext.Provider
              value={{
                color: 'black',
                size: '64px',
              }}
            >
              <AiOutlineApi />
            </IconContext.Provider>
            <p className="text-sm">Rest API</p>
          </div>
        </div>
      </div>
    </section>
  );
};
