import { GraphQLClient } from 'graphql-request';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUserByEmailQuery, UpdateUserMutation } from '../../../lib/queries';

const { JWT_SECRET, GRAPHCMS_URL, JWT_EXPIRES_IN } = process.env;
const client = new GraphQLClient(GRAPHCMS_URL);

export default async function handler(req, res) {
  const { password, email } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  const userData = await client.request(getUserByEmailQuery, {
    email,
  });

  if (!userData?.userModel) {
    return res.status(400).send({ error: 'Invalid email address' });
  }

  const { password: hashedPassword } = userData.userModel;
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordCorrect) {
    return res.status(400).send({ error: 'Incorrect password' });
  }

  const newToken = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const updateUserResponse = await client.request(UpdateUserMutation, {
    where: { email },
    data: { token: newToken },
  });

  const { updateUserModel } = updateUserResponse;

  if (!updateUserModel.token) {
    return res.status(500).end();
  }

  return res.status(200).json({ token: updateUserModel.token });
}
