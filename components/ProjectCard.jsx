import React from 'react';
// import Image from 'next/image';
// import { shimmer, toBase64 } from '../utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const ProjectCard = ({
  name,
  imageSrc,
  demoUrl,
  codeUrl,
  description,
  width,
  height,
  id,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: '/projects/[id]',
      query: { id },
    });
  };

  return (
    <div className="w-full shadow-md p-3">
      <div className="group hover:bg-blue-900 relative rounded-md">
        <img
          className="group-hover:opacity-40 relative w-full h-auto"
          src={imageSrc[0]}
          alt={name}
          width={width}
          height={height}
          // placeholder="blur"
          // blurDataURL={`data:image/svg+xml;base64,${toBase64(
          //   shimmer(width, height)
          // )}`}
        />
        <div className="hidden absolute group-hover:flex top-0 text-center flex-col justify-around items-center w-full h-full">
          <h3 className="text-white">{name}</h3>
          <button
            onClick={handleClick}
            className="text-sd text-black rounded-2xl px-4 py-1 bg-white"
          >
            More info
          </button>
        </div>
      </div>
    </div>
  );
};
