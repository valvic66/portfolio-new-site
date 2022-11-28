import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { API_ROUTES } from '../../../constants/routes';
import axios from 'axios';
import { SvgSpinner } from '../../../components/SvgSpinner';
import { BlogPost } from '../../../components/BlogPost';

function PostDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [blogPost, setBlogPost] = useState([]);
  const router = useRouter();

  const {
    query: { slug },
  } = router;

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: API_ROUTES.GET_BLOG_BY_SLUG,
          data: {
            slug,
          },
        });

        setBlogPost(response.data.blogModel);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <SvgSpinner />
      </div>
    );
  }

  return <BlogPost post={blogPost} />;
}

export default PostDetailPage;
