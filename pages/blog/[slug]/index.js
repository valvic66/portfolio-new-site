import React, { useEffect, useState } from 'react';
import { SvgSpinner } from '@/components/SvgSpinner';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { BlogPost } from '@/components/BlogPost';
import { getPosts } from '@/lib/posts';
import md from 'markdown-it';
import { RiArrowGoBackFill } from 'react-icons/ri';

function PostDetailPage({ postBySlug }) {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const progressBarScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;

      setScroll(scroll);
    };

    window.addEventListener('scroll', progressBarScroll);

    return () => window.removeEventListener('scroll', progressBarScroll);
  }, []);

  const content = postBySlug?.content ?? '';

  return (
    <main className="prose max-w-[860px] mx-auto">
      <div id="progressBarContainer">
        <div
          id="progressBar"
          style={{
            transform: `scale(${scroll}, 1)`,
            // opacity: `${scroll}`,
          }}
        />
      </div>
      <Link href={'/blog'} className="no-underline">
        <RiArrowGoBackFill className="text-sm text-[#05192f] fixed bg-white hover:bg-[#05192f] hover:text-white z-1 right-3 bottom-3 py-1 px-3 shadow-md rounded-full w-11 h-11 flex justify-center align-center" />
      </Link>
      <BlogPost post={postBySlug} />
      <div
        className="p-5"
        dangerouslySetInnerHTML={{ __html: md().render(content) }}
      />
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
