import React from 'react';
import { useRouter } from 'next/router';
import { SvgSpinner } from '@/components/SvgSpinner';
import { BlogPost } from '@/components/BlogPost';
import { getBlogBySlug, getBlogSlugs } from '@/lib/data';

function PostDetailPage({ blog }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <SvgSpinner />
      </div>
    );
  }

  return <BlogPost post={blog} />;
}

export async function getStaticPaths() {
  const blogSlugs = await getBlogSlugs();

  const slugPaths = blogSlugs?.blogModels?.map((_slug) => ({
    params: { slug: _slug.slug },
  }));

  return {
    paths: slugPaths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await getBlogBySlug(params.slug);

  return {
    props: {
      blog: data.blogModel,
    },
  };
}

export default PostDetailPage;
