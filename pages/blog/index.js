import { BlogPostCard } from '@/components/BlogPostCard';
import { getPosts } from '@/lib/posts';
import { getTags } from '@/lib/tags';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';

export default function Blog({ allPosts, initialTags }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [focused, setFocused] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [isAllTag, setIsAllTag] = useState(true);

  const POSTS_PER_PAGE = 2;
  const [tabulationData, setTabulationData] = useState({
    count: filteredPosts?.length,
    page: 1,
  });
  const [tabulationPosts, setTabulationPosts] = useState(null);

  useEffect(() => {
    const posts = [...allPosts];

    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    setFilteredPosts(filteredPosts);
  }, [searchTerm, focused]);

  const handleFocus = () => {
    setSelectedTag('');
    setFocused(true);
  };
  const handleBlur = () => setFocused(false);

  useEffect(() => {
    setTabulationData((prevState) => ({
      ...prevState,
      count: filteredPosts?.length,
      page: 1,
    }));
  }, [filteredPosts]);

  const handlePageChange = (e, page) => {
    setTabulationData((prevState) => ({
      ...prevState,
      page,
    }));
  };

  useEffect(() => {
    const start = (tabulationData?.page - 1) * POSTS_PER_PAGE + 1;
    const end = Math.min(
      tabulationData?.page * POSTS_PER_PAGE,
      tabulationData.count
    );

    setTabulationPosts(filteredPosts?.slice(start - 1, end));
  }, [filteredPosts, tabulationData]);

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
            color={!isAllTag && selectedTag === tag ? 'secondary' : 'default'}
            variant="outlined"
            key={key}
            label={tag}
            onClick={() => {
              setIsAllTag(false);
              setSelectedTag(tag);
              const posts = [...allPosts];

              const filteredPosts = posts.filter((post) =>
                post?.tags.includes(tag)
              );

              setFilteredPosts(filteredPosts);
            }}
          />
        ))}
      </div>
      <div className="grid gap-1">
        {tabulationPosts?.map((post, key) => {
          return <BlogPostCard post={post} key={key} />;
        })}
      </div>
      <div>
        <Pagination
          count={Math.ceil(tabulationData?.count / POSTS_PER_PAGE)}
          page={tabulationData?.page}
          onChange={handlePageChange}
        />
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
