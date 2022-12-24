import { BlogPostCard } from '@/components/BlogPostCard';
import { getPosts } from '@/lib/posts';
import { getTags } from '@/lib/tags';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

export default function Blog({ allPosts, tags }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [postNames, setPostNames] = useState(
    allPosts.map((post) => post.title)
  );
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isTag, setIsTag] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setIsTag(false);
    const posts = [...allPosts];

    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    setFilteredPosts(filteredPosts);
  }, [searchTerm]);

  const handleTagClick = (tag) => {
    setIsTag(true);
    const posts = [...allPosts];

    const filteredPosts = posts.filter((post) => post?.tags.includes(tag));

    setFilteredPosts(filteredPosts);
  };

  console.log(isTag);
  
  return (
    <section className="max-w-[860px] mx-auto">
      {/* {IS_POST_SEARCH_ENABLED && <PostSearch onSearch={handleSearch} />} */}
      <div className="mb-4 mt-2">
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
      <div className="flex flex-wrap">
        {tags?.map((tag, key) => (
          <div
            className="mr-3 cursor-pointer bg-green-400 rounded-md py-.5 px-2"
            key={key}
          >
            <button onClick={() => handleTagClick(tag)}>{tag}</button>
          </div>
        ))}
      </div>
      <div className="grid gap-1">
        {filteredPosts?.map((post, key) => (
          <BlogPostCard post={post} key={key} />
        ))}
      </div>
    </section>
  );
}

export async function getStaticProps() {
  const allPosts = getPosts();
  const tags = getTags();

  return {
    props: {
      allPosts,
      tags,
    },
  };
}
