import { BlogPostCard } from '@/components/BlogPostCard';
import { getPosts } from '@/lib/posts';
import { getTags } from '@/lib/tags';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

export default function Blog({ allPosts, initialTags }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [focused, setFocused] = useState(false);
  const [tags, setTags] = useState([]);
  const [isAllTag, setIsAllTag] = useState(true);

  useEffect(() => {
    const posts = [...allPosts];

    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    setFilteredPosts(filteredPosts);
  }, [searchTerm, focused]);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <section className="max-w-[860px] mx-auto p-2">
      <div className="mb-4 mt-2">
        <label htmlFor="search" />
        <TextField
          fullWidth
          id="search"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div className="flex flex-wrap">
        <Chip
          style={{ marginRight: 10 }}
          color={isAllTag ? 'secondary' : 'default'}
          variant="outlined"
          label="all"
          onClick={() => {
            setIsAllTag(true);
            setFilteredPosts(allPosts);
          }}
        />
        {initialTags?.map((tag, key) => (
          <Chip
            style={{ marginRight: 10 }}
            variant="outlined"
            key={key}
            label={tag}
            onClick={() => {
              setIsAllTag(false);
              const posts = [...allPosts];
          
              const filteredPosts = posts.filter((post) => post?.tags.includes(tag));
          
              setFilteredPosts(filteredPosts);
            }}
          />
        ))}
      </div>
      <div className="grid gap-1">
        {filteredPosts?.map((post, key) => {
          if (!isAllTag) {
            return <BlogPostCard post={post} key={key} />;
          } else {
            return <BlogPostCard post={post} key={key} />;
          }
        })}
      </div>
    </section>
  );
}

export async function getStaticProps() {
  const allPosts = getPosts();
  const initialTags = getTags();

  return {
    props: {
      allPosts,
      initialTags,
    },
  };
}
