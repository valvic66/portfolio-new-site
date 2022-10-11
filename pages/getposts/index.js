import React from 'react';
import prisma from '../../lib/prisma';

export default function GetPosts({ mappedPosts }) {
  return (
    <ul className="pt-20">
      {JSON.parse(mappedPosts)?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const posts = await prisma.post.findMany();
  const mappedPosts = JSON.stringify(posts);

  return {
    props: {
      mappedPosts,
    },
  };
}
