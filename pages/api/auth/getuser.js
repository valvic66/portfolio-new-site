import { gql, GraphQLClient } from 'graphql-request';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { CreateUserMutation } from '../../../lib/queries';
import { getFromLocalStorage } from '../../../lib/common';

const { GRAPHCMS_URL, JWT_SECRET } = process.env;
const client = new GraphQLClient(GRAPHCMS_URL);

export default async function handler(req, res) {
  // get token from local storage
  console.log(req?.headers);
  const token = String(req?.headers?.authorization.replace('Bearer ', ''));
  console.log({ token });

  // decode with jwt using token and get the user, we need here the email
  const decodedUser = jwt.verify(token, JWT_SECRET);
  console.log({ token, decodedUser });
  // using email get the user from db using gql query we already have
  // if not user then authenticated false
  // if user then authenticated true

  res.status(200).json({ name: 'vali' });
}
