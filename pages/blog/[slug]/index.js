import React, { useEffect, useState } from 'react';
import { SvgSpinner } from '@/components/SvgSpinner';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { BlogPost } from '@/components/BlogPost';
import { getPosts } from '@/lib/posts';
import md from 'markdown-it';
import { RiArrowGoBackFill, RiArrowUpLine } from 'react-icons/ri';

function PostDetailPage({ postBySlug }) {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const progressBarScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = Number(`${totalScroll / windowHeight}`);

      setScroll(scroll);
    };

    window.addEventListener('scroll', progressBarScroll);

    return () => window.removeEventListener('scroll', progressBarScroll);
  }, []);

  const content = postBySlug?.content ?? '';

  return (
    <main className="prose max-w-[860px] mx-auto">
      {!!scroll && (
        <div id="progressBarContainer">
          <div
            id="progressBar"
            style={{
              transform: `scale(${scroll}, 1)`,
              // opacity: `${scroll}`,
            }}
          />
        </div>
      )}
      <Link href={'/blog'} className="no-underline">
        <RiArrowGoBackFill className="text-sm text-[#05192f] fixed bg-white hover:bg-[#05192f] hover:text-white z-10 right-4 top-4 py-1 px-3 shadow-md rounded-full w-12 h-12 flex justify-center align-center hover:border-white hover:border" />
      </Link>
      <div className="pt-10">
        <BlogPost post={postBySlug} />
      </div>
      <div
        className="p-5"
        dangerouslySetInnerHTML={{ __html: md().render(content) }}
      />
      {!!scroll && (
        <RiArrowUpLine
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
          className="text-sm text-[#05192f] fixed bg-white hover:bg-[#05192f] hover:text-white z-10 right-4 bottom-4 py-1 px-3 shadow-md rounded-full w-12 h-12 flex justify-center align-center hover:border-white hover:border"
        />
      )}
    </main>
  );
}

export async function getStaticPaths() {
  const slugs = getPosts()?.map((post) => post.slug);

  const slugPaths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths: slugPaths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const postBySlug = getPosts().filter((post) => post.slug === params.slug)[0];
  // const { content, ...other } = postBySlug;

  return {
    props: {
      postBySlug,
    },
  };
}

export default PostDetailPage;
