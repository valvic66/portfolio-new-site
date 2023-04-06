import React, { useEffect, useState } from 'react';
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
    <div className="max-w-4xl mx-auto font-roboto bg-white/95">
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
      <section className='p-3 pt-10'>
        <BlogPost post={postBySlug} />
        <article
          className="prose prose-slate lg:prose-lg max-w-4xl mx-auto px-5 pt-6"
          dangerouslySetInnerHTML={{ __html: md().render(content) }}
        />
      </section>
      {!!scroll && (
        <RiArrowUpLine
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
          className="text-sm text-[#05192f] fixed bg-white hover:bg-[#05192f] hover:text-white z-10 right-4 bottom-4 py-1 px-3 shadow-md rounded-full w-12 h-12 flex justify-center align-center hover:border-white hover:border cursor-pointer"
        />
      )}
    </div>
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
