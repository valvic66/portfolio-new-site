import { BlogPostCard } from '@/components/BlogPostCard';
import { getPosts } from '@/lib/posts';

export default function B({ allPosts }) {
  console.log({ allPosts });

  return (
    <section className="max-w-[860px] mx-auto">
      {/* {IS_POST_SEARCH_ENABLED && <PostSearch onSearch={handleSearch} />} */}
      <div className="grid gap-1">
        {allPosts?.map((post, key) => (
          <BlogPostCard post={post} key={key} />
        ))}
      </div>
    </section>
  );
}

export async function getStaticProps() {
  const allPosts = getPosts();

  return {
    props: {
      allPosts,
    },
  };
}
