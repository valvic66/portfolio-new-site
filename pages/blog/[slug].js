import React from 'react';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import { shimmer, toBase64 } from '../../utils';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

export default function PostPage({
  data: { title, date, cover_image, isRed },
  slug,
  mdxSource,
}) {
  return (
    <div className="pt-20 grid grid-cols-1 gap-2">
      <h1>{title}</h1>
      <p>{`Posted on: ${date}`}</p>
      <Image
        className="relative rounded-md"
        src={cover_image}
        alt={title}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          shimmer(6000, 4000)
        )}`}
        width={6000}
        height={4000}
        layout="responsive"
        priority
      />
      <MDXRemote {...mdxSource} />
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.mdx', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(paths) {
  const {
    params: { slug },
  } = paths;

  const mdx = fs.readFileSync(path.join('posts', slug + '.mdx'), 'utf-8');
  const { data, content } = matter(mdx);
  const mdxSource = await serialize(content);
  return {
    props: {
      data,
      slug,
      mdxSource,
    },
  };
}
