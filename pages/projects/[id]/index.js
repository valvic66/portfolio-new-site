import React, { useEffect } from 'react';
import { MOCKED_PROJECTS } from '../../../constants/projects';
import Image from 'next/image';
import { Stack } from '../../../components/Stack';

import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Projects({ project }) {
  const { name, description, imageSrc, width, height, stack } = project;

  return (
    <div className="w-full py-14">
      <div className="max-w-5xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
          slidesPerView={1}
          navigation
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          effect={'cube'}
          cubeEffect={{
            shadow: false,
            slideShadows: false,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
        >
          {imageSrc?.map((src, key) => (
            <SwiperSlide key={key}>
              <Image
                className=""
                src={src}
                alt={name}
                width={width}
                height={height}
                layout="responsive"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="w-full h-auto mx-auto p-5">
          <div>
            <p className="text-2xl tracking-wide md:tracking-widest">{name}</p>
            <div className="py-2">
              <Stack stack={stack} />
            </div>
            <p className="text-sm pt-5">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = MOCKED_PROJECTS.map((project) => {
    return { params: { id: project.id } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(paths) {
  const {
    params: { id },
  } = paths;

  const project = MOCKED_PROJECTS.find((project) => project.id === id);

  return { props: { project } };
}
