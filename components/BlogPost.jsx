import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { shimmer, toBase64 } from '../utils';
import { ContentRenderer } from './ContentRenderer';
import { PostTag } from './PostTag';

export const BlogPost = ({ post }) => {
  const { slug, title, date } =
    // subheading,
    // tags,
    // content,
    //  bannerImage
    post;

  // const { url, width, height, fileName } = bannerImage ?? {};

  return (
    <article className="grid grid-cols-1 p-5 font-lato max-w-[860px] mx-auto">
      <div className="flex flex-col md:justify-between md:p-3">
        <header>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-sm sm:text-sm text-right mr-1 uppercase text-gray-500">
              {new Date(date).toDateString()}
            </p>
            {/* <PostTag tags={tags} /> */}
          </div>
          <p className="text-xl sm:text-4xl font-semibold tracking-tight mt-5">
            {/* <Link
              href={{
                pathname: '/blog/[slug]',
                query: {
                  slug,
                },
              }}
            > */}
              {title}
            {/* </Link> */}
          </p>
          {/* <p className="text-lg mt-2">{subheading}</p> */}
        </header>
      </div>
      {/* <div className="w-full relative mt-5">
        <Image
          className="z-0"
          src={url}
          alt={fileName}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(width, height)
          )}`}
          layout="responsive"
          objectFit="content"
          width={width}
          height={height}
        />
      </div> */}
      {/* {!isDetailed && (
          <Link
            href={{
              pathname: '/blog/[slug]',
              query: {
                slug,
              },
            }}
          >
            <button className="text-sm bg-black text-white py-2 rounded-sm">
              Read more
            </button>
          </Link>
        )} */}

      {/* <div className="mt-10">
        <ContentRenderer contentHtml={content?.html} />
      </div> */}
    </article>
  );
};
