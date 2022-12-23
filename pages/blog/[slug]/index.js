import React from 'react';
import { SvgSpinner } from '@/components/SvgSpinner';
import { BlogPost } from '@/components/BlogPost';
import { getPosts } from '@/lib/posts';
import md from 'markdown-it';

function PostDetailPage({ postBySlug }) {
  return (
    <main className="prose max-w-[860px] mx-auto">
      <BlogPost post={postBySlug} />
      <div
        dangerouslySetInnerHTML={{ __html: md().render(postBySlug?.content) }}
      />
    </main>
  );
}

export async function getStaticPaths() {
  const slugs = getPosts().map((post) => post.slug);

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
