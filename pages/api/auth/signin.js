import { GraphQLClient } from 'graphql-request';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUserByEmailQuery, UpdateUserMutation } from '../../../lib/queries';

const { JWT_SECRET, GRAPHCMS_URL, JWT_EXPIRES_IN } = process.env;
const client = new GraphQLClient(GRAPHCMS_URL);

export default async function handler(req, res) {
  const { password = '1234', email = 'test@test.com' } = req.body;

  if (!email || !password) {
    res.status(400).end();
  }

  const userData = await client.request(getUserByEmailQuery, {
    email,
  });

  if (!userData) {
    console.log('no user');
    res.status(400).end();
    return;
  }
  const { password: hashedPassword } = userData.userModel;
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordCorrect) {
    res.status(400).end();

    return;
  }

  // create a new token and return it if passwords match
  const newToken = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  // store the new token to db if passwords match
  const updateUserResponse = await client.request(UpdateUserMutation, {
    where: { email },
    data: { token: newToken },
  });
  const { updateUserModel } = updateUserResponse;
  if (!updateUserModel.token) {
    res.status(500).end();
    return;
  }

  return res.status(200).json({ token: updateUserModel.token });
}
