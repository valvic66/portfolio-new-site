import { gql, GraphQLClient } from 'graphql-request';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { CreateUserMutation, getUserByEmailQuery } from '../../../lib/queries';

const { GRAPHCMS_URL, JWT_SECRET } = process.env;
const client = new GraphQLClient(GRAPHCMS_URL);

export default async function handler(req, res) {
  const defaultAuthentication = {
    authenticated: false,
    user: null,
  };

  const token = String(req?.headers?.authorization.replace('Bearer ', ''));
  const decodedUser = jwt.verify(token, JWT_SECRET);
  const userData = await client.request(getUserByEmailQuery, {
    email: decodedUser?.email,
  });
  const { userModel: user } = userData;

  if (!user) {
    res.status(400).json(defaultAuthentication);

    return;
  }

  res.status(200).json({
    authenticated: true,
    user,
  });
}
