import { GraphQLClient } from 'graphql-request';
import { getBlogBySlug } from '../../../../lib/queries';
const { GRAPHCMS_URL } = process.env;

const client = new GraphQLClient(GRAPHCMS_URL);

export default async function handler(req, res) {
  const { slug } = req.body;
  const blogData = await client.request(getBlogBySlug, { slug });

  return res.status(200).json(blogData);
}
