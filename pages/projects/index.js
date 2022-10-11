import React from 'react';
import { MOCKED_PROJECTS } from '../../constants/projects';

export default function Projects({ projects }) {
  return (
    <>
      <div className="pt-20">Projects</div>
      {projects.map((project, key) => {
        return <p key={key}>{project.name}</p>;
      })}
    </>
  );
}

export async function getStaticProps() {
  return { props: { projects: MOCKED_PROJECTS } };
}
