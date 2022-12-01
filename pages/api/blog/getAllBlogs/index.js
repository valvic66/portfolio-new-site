/*
import { GraphQLClient } from 'graphql-request';
import { getAllBlogs } from '@/lib/queries';
const { GRAPHCMS_URL } = process.env;

const client = new GraphQLClient(GRAPHCMS_URL);

export default async function handler(req, res) {
  const blogData = await client.request(getAllBlogs);

  return res.status(200).json(blogData);
}
*/