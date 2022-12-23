import React from 'react';
import { SvgSpinner } from '@/components/SvgSpinner';
import { BlogPost } from '@/components/BlogPost';
import { getPosts } from '@/lib/posts';

function PostDetailPage({ postBySlug }) {
  console.log(postBySlug);
  return (
    <main className="w-full bg-slate-50">
      <BlogPost post={postBySlug} />
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

  return {
    props: {
      postBySlug,
    },
  };
}

export default PostDetailPage;
