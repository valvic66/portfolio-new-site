import { useEffect, useReducer, useState } from 'react';
import Router from 'next/router';
import { BlogPostCard } from '@/components/BlogPostCard';
import { getPosts } from '@/lib/posts';
import { getTags } from '@/lib/tags';
import { TextField, Pagination, Chip } from '@mui/material';
import { POSTS_PER_PAGE } from '@/constants/blog';
import { initialState, reducer } from '@/lib/blog/store';
import { useController } from '../../lib/blog/controller';
import Link from 'next/link';
import { RiArrowGoBackFill, RiFindReplaceLine } from 'react-icons/ri';

export default function Blog({ allPosts, initialTags }) {
  const [blogStore, dispatch] = useReducer(reducer, initialState);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
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
  }, [searchTerm, focused, allPosts]);

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

  const toggleSearchInput = () => {
    setIsSearchInputVisible(!isSearchInputVisible);
  };

  return (
    <section className="max-w-[860px] mx-auto p-1 px-2">
      <header className="flex flex-wrap w-full items-center p-2 md:h-20">
        <div
          className={`basis-1/2 order-1 cursor-pointer ${
            isSearchInputVisible && 'md:basis-1/12'
          }`}
        >
          <img
            src="/static/images/logo.png"
            alt="logo image"
            width="50"
            onClick={() => Router.push('/')}
          />
        </div>
        {isSearchInputVisible && (
          <div className="order-last md:order-2 w-full md:basis-7/12 mt-3 md:mt-0">
            <label htmlFor="search" />
            <TextField
              sx={{
                // width: { sm: 200, md: 300 },
                '& .MuiInputBase-root': {
                  height: { xs: 50, sm: 40, md: 40 },
                },
              }}
              fullWidth
              id="search"
              name="search"
              value={searchTerm}
              onChange={(e) =>
                dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
              }
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        )}
        <div
          className={`basis-1/2 order-3 ${
            isSearchInputVisible && 'md:basis-4/12'
          } flex justify-end`}
        >
          <RiFindReplaceLine
            className="text-4xl cursor-pointer hover:bg-gray-300 hover:p-0.5 hover:rounded-md"
            onClick={toggleSearchInput}
          />
        </div>
      </header>
      <div className='px-2'>
        <Link href={'/'} className="no-underline">
          <RiArrowGoBackFill className="text-sm text-[#05192f] fixed bg-white hover:bg-[#05192f] hover:text-white z-10 right-4 bottom-4 py-1 px-3 shadow-md rounded-full w-12 h-12 flex justify-center align-center hover:border-white hover:border" />
        </Link>
        <div className="flex flex-wrap mt-3">
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

                dispatch({
                  type: 'SET_FILTERED_POSTS',
                  payload: filteredPosts,
                });
              }}
            />
          ))}
        </div>
        <div className="grid gap-6 mt-6">
          {tabulationPosts?.map((post, key) => {
            return <BlogPostCard post={post} key={key} />;
          })}
        </div>
        <div className="mt-6">
          <Pagination
            count={Math.ceil(postsCount / POSTS_PER_PAGE)}
            page={tabulationPage}
            onChange={handlePageChange}
          />
        </div>
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
