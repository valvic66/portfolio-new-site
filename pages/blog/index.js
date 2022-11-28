import React, { useEffect, useState } from 'react';
import { BlogPost } from '../../components/BlogPost';
import { API_ROUTES } from '../../constants/routes';
import { SvgSpinner } from '../../components/SvgSpinner';
import { client } from '../../axios';

function AllPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await client({
          method: 'get',
          url: API_ROUTES.GET_ALL_BLOGS,
        });

        setBlogPosts(response.data.blogModels);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <SvgSpinner />
      </div>
    );
  }

  return (
    <>
      {/* {IS_POST_SEARCH_ENABLED && <PostSearch onSearch={handleSearch} />} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
        {blogPosts?.map((post, key) => {
          return (
            <div key={key}>
              <BlogPost post={post} />
            </div>
          );
        })}
      </div>
    </>
  );

  // const router = useRouter();
  // const setPosts = usePosts((state) => state.setPosts);
  // const handleSearch = (month, year) => {
  //   router.push({
  //     pathname: `/blog/${month}/${year}`,
  //   });
  // };
}

// export async function getServerSideProps() {
//   const response = await axios({
//     method: 'get',
//     url: API_ROUTES.GET_ALL_BLOGS,
//   });

//   return {
//     props: {
//       blogs: response?.data,
//     },
//   };
// }

export default AllPosts;
