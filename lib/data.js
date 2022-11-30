import { GraphQLClient, gql } from 'graphql-request';

export const getAllBlogs = async () => {
  const client = new GraphQLClient(process.env.GRAPHCMS_URL);
  const query = gql`
    query allBlogs {
      blogModels {
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
  `;

  return await client.request(query);
};

export const getBlogBySlug = async (slug) => {
  const client = new GraphQLClient(process.env.GRAPHCMS_URL);
  const query = gql`
    query blogBySlug($slug: String!) {
      blogModel(where: { slug: $slug }) {
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
  `;

  const _slug = {
    slug,
  };

  return await client.request(query, _slug);
};

export const getBlogSlugs = async () => {
  const client = new GraphQLClient(process.env.GRAPHCMS_URL);

  const query = gql`
    query allBlogSlugs {
      blogModels {
        slug
      }
    }
  `;

  return await client.request(query);
};
