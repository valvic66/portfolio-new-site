import React, { useEffect, useState } from 'react';
import { BlogPost } from '@/components/BlogPost';
import { getPaginatedBlogs } from '@/lib/data';
import useSWR from 'swr';
import request from 'graphql-request';
import Button from '@mui/material/Button';
import { SvgSpinner } from '@/components/SvgSpinner';

const fetchData = (endpoint, query, params) => request(endpoint, query, params);
const API_URL =
  'https://api-eu-central-1.hygraph.com/v2/cl7qpydxj5mv601t78887184a/master';

function AllPosts({ blogs }) {
  const [first, setFirst] = useState(2);
  const [skip, setSkip] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

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
      blogModelsConnection {
        pageInfo {
          pageSize
        }
      }
    }
    `,
      first,
      skip,
    ],
    (endpoint, query) => fetchData(endpoint, query, { first, skip }),
    { initialData: blogs, revalidateOnFocus: false }
  );

  const handlePrevClick = () => {
    setSkip(skip - first);
    setPageNumber(pageNumber - 1);
  };

  const handleNextClick = () => {
    setSkip(skip + first);
    setPageNumber(pageNumber + 1);
  };

  if (err) return <div>failed to load</div>;

  if (!data) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <SvgSpinner />
      </div>
    );
  }

  return (
    <section>
      {/* {IS_POST_SEARCH_ENABLED && <PostSearch onSearch={handleSearch} />} */}
      <div className="">
        {data?.blogModels?.map((post, key) => {
          return <BlogPost post={post} key={key} />;
        })}
      </div>
      <Button onClick={handlePrevClick} disabled={pageNumber === 1}>
        Previous
      </Button>
      <Button
        onClick={handleNextClick}
        disabled={
          pageNumber ===
          Math.ceil(data?.blogModelsConnection?.pageInfo?.pageSize / first)
        }
      >
        Next
      </Button>
    </section>
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
