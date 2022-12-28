import { BlogPostCard } from '@/components/BlogPostCard';
import { getPosts } from '@/lib/posts';
import { getTags } from '@/lib/tags';
import { TextField, Pagination, Chip } from '@mui/material';
import { useEffect, useState, useReducer } from 'react';
import { POSTS_PER_PAGE } from '@/constants/blog';
import { initialState, reducer } from './store';
import { useController } from './controller';

export default function Blog({ allPosts, initialTags }) {
  const [blogStore, dispatch] = useReducer(reducer, initialState);
  const {
    searchTerm,
    filteredPosts,
    focused,
    selectedTag,
    isAllTag,
    postsCount,
    tabulationPage,
    tabulationPosts,
  } = blogStore;

  const controllerOptions = {
    blogStore,
    dispatch,
  };
  const { handlePageChange, handleFocus, handleBlur } =
    useController(controllerOptions);

  useEffect(() => {
    const posts = [...allPosts];

    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    dispatch({ type: 'SET_FILTERED_POSTS', payload: filteredPosts });
  }, [searchTerm, focused]);

  useEffect(() => {
    const start = (tabulationPage - 1) * POSTS_PER_PAGE + 1;
    const end = Math.min(tabulationPage * POSTS_PER_PAGE, postsCount);

    dispatch({
      type: 'SET_TABULATION_POSTS',
      payload: filteredPosts?.slice(start - 1, end),
    });
  }, [filteredPosts, postsCount, tabulationPage]);

  useEffect(() => {
    dispatch({ type: 'SET_POSTS_COUNT', payload: filteredPosts.length });
    dispatch({ type: 'SET_TABULATION_PAGE', payload: 1 });
  }, [filteredPosts]);

  return (
    <section className="max-w-[860px] mx-auto p-2">
      <div className="mb-4 mt-2">
        <label htmlFor="search" />
        <TextField
          fullWidth
          id="search"
          name="search"
          value={searchTerm}
          onChange={(e) =>
            dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
          }
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
            dispatch({ type: 'SET_FILTERED_POSTS', payload: allPosts });
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
              dispatch({ type: 'SET_IS_ALL_TAG', payload: false });
              dispatch({ type: 'SET_SELECTED_TAG', payload: tag });

              const posts = [...allPosts];
              const filteredPosts = posts.filter((post) =>
                post?.tags.includes(tag)
              );

              dispatch({ type: 'SET_FILTERED_POSTS', payload: filteredPosts });
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
          count={Math.ceil(postsCount / POSTS_PER_PAGE)}
          page={tabulationPage}
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
