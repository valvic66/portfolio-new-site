import React, { useEffect, useState } from 'react';
import { SvgSpinner } from '@/components/SvgSpinner';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { BlogPost } from '@/components/BlogPost';
import { getPosts } from '@/lib/posts';
import md from 'markdown-it';

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
        <div className="text-sm text-[#05192f] fixed bg-white hover:bg-slate-100 z-1 right-1 bottom-1 py-1 px-2">
          <span>{String.fromCharCode(8592)}</span>
          &nbsp;
          <span className="">Go back</span>
        </div>
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
