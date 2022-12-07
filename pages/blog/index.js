import React, { useState } from 'react';
import { BlogPost } from '@/components/BlogPost';
import { getPaginatedBlogs } from '@/lib/data';
import useSWR from 'swr';
import request from 'graphql-request';
import Button from '@mui/material/Button';

const fetchData = (endpoint, query, params) => request(endpoint, query, params);
const API_URL =
  'https://api-eu-central-1.hygraph.com/v2/cl7qpydxj5mv601t78887184a/master';

function AllPosts({ blogs }) {
  const [first, setFirst] = useState(2);
  const [skip, setSkip] = useState(0);

  const { data, err } = useSWR(
    [
      API_URL,
      `
    query paginatedBlogs($first: Int, $skip: Int) {
      blogModels(first: $first, skip: $skip) {
        id
        slug
        title
        subheading
        tags
        content {
          html
          markdown
        }
        bannerImage {
          height
          size
          width
          url
          fileName
        }
        date
      }
    }
    `,
      first,
      skip,
    ],
    (endpoint, query) => fetchData(endpoint, query, { first, skip }),
    { initialData: blogs, revalidateOnFocus: false }
  );
  console.table(data?.blogModels);

  const handlePrevClick = () => {
    setSkip(skip - 2);
  };

  const handleNextClick = () => {
    setSkip(skip + 2);
  };

  return (
    <>
      {/* {IS_POST_SEARCH_ENABLED && <PostSearch onSearch={handleSearch} />} */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
        {data?.blogModels.map((post, key) => {
          return (
            <div key={key}>
              <BlogPost post={post} />
            </div>
          );
        })}
      </div>
      <Button onClick={handlePrevClick}>Previous</Button>
      <Button onClick={handleNextClick}>Next</Button>
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

export async function getStaticProps() {
  // const data = await getAllBlogs();
  const initialData = await getPaginatedBlogs(2, 0);

  return {
    props: {
      blogs: initialData.blogModels,
    },
  };
}

export default AllPosts;
