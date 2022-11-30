import React from 'react';
import { BlogPost } from '@/components/BlogPost';
import { API_ROUTES } from '@/constants/routes';
import { client } from '../../axios';
import { getAllBlogs } from '@/lib/data';

function AllPosts({ blogs }) {
  return (
    <>
      {/* {IS_POST_SEARCH_ENABLED && <PostSearch onSearch={handleSearch} />} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
        {blogs?.map((post, key) => {
          return (
            <div key={key}>
              <BlogPost post={post} />
            </div>
          );
        })}
      </div>
    </>
  );
  const router = useRouter();
  const setPosts = usePosts((state) => state.setPosts);
  const handleSearch = (month, year) => {
    router.push({
      pathname: `/blog/${month}/${year}`,
    });
  };
}

export async function getStaticProps() {
  const data = await getAllBlogs();

  return {
    props: {
      blogs: data.blogModels,
    },
  };
}

export default AllPosts;
