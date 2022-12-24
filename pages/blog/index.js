import { BlogPostCard } from '@/components/BlogPostCard';
import { getPosts } from '@/lib/posts';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

export default function Blog({ allPosts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [postNames, setPostNames] = useState(
    allPosts.map((post) => post.title)
  );
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const posts = [...allPosts];

    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    setFilteredPosts(filteredPosts);
  }, [searchTerm]);

  const activePosts = searchTerm.length < 0 ? allPosts : filteredPosts;

  return (
    <section className="max-w-[860px] mx-auto">
      {/* {IS_POST_SEARCH_ENABLED && <PostSearch onSearch={handleSearch} />} */}
      <div className="mb-4">
        <label htmlFor="search" />
        <TextField
          fullWidth
          id="search"
          name="search"
          value={searchTerm}
          onChange={handleChange}
          placeholder="search"
        />
      </div>
      <div className="grid gap-1">
        {activePosts?.map((post, key) => (
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
