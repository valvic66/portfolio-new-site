import React, { useRef } from 'react';
import { RoughNotationGroup } from 'react-rough-notation';
import { intersectionOptions } from '../constants';
import { MOCKED_PROJECTS } from '../constants/projects';
import { useIntersection } from '../hooks/useIntersection';
import { ProjectCard } from './ProjectCard';
import { RoughNotationWrapper } from './RoughNotationWrapper';

export const Projects = () => {
  const ref = useRef();
  const isIntersecting = useIntersection(ref, {
    threshold: intersectionOptions.DEFAULT_TRESHOLD,
    rootMargin: intersectionOptions.DEFAULT_ROOT_MARGIN,
  });

  return (
    <section id="projects" className="w-full p-3 py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col justify-center items-start">
          <RoughNotationGroup show={isIntersecting}>
            <RoughNotationWrapper color="#f5bdb2" type="highlight">
              <h1 ref={ref} className="text-gray-700 tracking-wide">
                My projects
              </h1>
            </RoughNotationWrapper>
          </RoughNotationGroup>
          <div className="py-5">
            <p className="leading-5 text-sm">
              Please find a selection of my work created in the past years.
            </p>
            <p className="leading-5 text-sm">
              Click or tap for more details about each project.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-3 max-w-5xl mx-auto">
        {MOCKED_PROJECTS.map((project, index) => {
          return <ProjectCard key={index} {...project} />;
        })}
      </div>
    </section>
  );
};
