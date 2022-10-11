import { gql, GraphQLClient } from 'graphql-request';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { CreateUserMutation } from '../../../../lib/queries';

const { GRAPHCMS_URL, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
const client = new GraphQLClient(GRAPHCMS_URL);

export default async function handler(req, res) {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUserData = {
    email,
    password: hashedPassword,
    firstname,
    lastname,
  };

  try {
    const response = await client.request(CreateUserMutation, { newUserData });
  } catch {
    return res
      .status(500)
      .json({ error: 'User already exists, please sign in' });
  }

  res.status(200).json({ token });
}
