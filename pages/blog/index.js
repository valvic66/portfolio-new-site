import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '../../components/BlogPost';

export default function Blog({ posts }) {
  return (
    <>
      <div className="pt-20 pb-10">Blog Section from md files on server</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
        {posts.map((post, key) => {
          return (
            <div key={key}>
              <BlogPost post={post} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    const md = fs.readFileSync(path.join('posts', fileName), 'utf-8');
    const { data } = matter(md);

    return { slug, data };
  });

  return {
    props: {
      posts,
    },
  };
}
