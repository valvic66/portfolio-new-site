import React, { useEffect } from 'react';
import { BlogPost } from '../../components/BlogPost';
import { PostSearch } from '../../components/PostSearch';
import { useRouter } from 'next/router';
import usePosts from '../../store/blog';
import { IS_POST_SEARCH_ENABLED } from '../../constants/env';
import axios from 'axios';
import { API_ROUTES } from '../../constants/routes';
import { getAllBlogs } from '../../lib/queries';

// const getBlogs = async () => {
//   try {
//     const response = await axios({
//       method: 'get',
//       url: API_ROUTES.GET_ALL_BLOGS,
//     });
//   } catch (error) {
//   } finally {
//   }
// };
// getBlogs();

function AllPosts({ blogs: { blogModels } }) {
  console.log(blogModels);
  // const router = useRouter();
  // const setPosts = usePosts((state) => state.setPosts);
  // const handleSearch = (month, year) => {
  //   router.push({
  //     pathname: `/blog/${month}/${year}`,
  //   });
  // };
  // useEffect(() => {
  //   setPosts(posts);
  // }, []);
  // return (
  //   <>
  //     {IS_POST_SEARCH_ENABLED && <PostSearch onSearch={handleSearch} />}
  //     <div className="pt-20 pb-10">Blog Section from md files on server</div>
  //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
  //       {blogModels?.map((post, key) => {
  //         return (
  //           <div key={key}>
  //             <BlogPost post={post} />
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </>
  // );
}

export async function getServerSideProps() {
  const response = await axios({
    method: 'get',
    url: API_ROUTES.GET_ALL_BLOGS,
  });

  return {
    props: {
      blogs: response?.data,
    },
  };
}

export default AllPosts;
