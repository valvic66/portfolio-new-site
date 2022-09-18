import { gql, GraphQLClient } from 'graphql-request';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const {
  GRAPHCMS_URL,
  GRAPHCMS_PERMANENTAUTH_TOKEN,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;
const client = new GraphQLClient(GRAPHCMS_URL, {
  // headers: {
  //   Authorization: `Bearer ${GRAPHCMS_PERMANENTAUTH_TOKEN}`,
  // },
});

const CreateUserMutation = gql`
  mutation CreateUser($newUserData: UserModelCreateInput!) {
    createUserModel(data: $newUserData) {
      email
      password
      firstname
      lastname
      token
    }
  }
`;

export default async function handler(req, res) {
  const {
    email = 'test@gmail.com',
    password = 'Test_2022',
    firstname = 'Vali',
    lastname = 'Micu',
  } = req.body;

  if (!email || !password) {
    res.status(400).end();
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUserData = {
    email,
    password: hashedPassword,
    firstname,
    lastname,
  };

  const response = await client.request(CreateUserMutation, { newUserData });

  if (!response?.createUserModel?.id) {
    res.status(500);
  }

  res.status(200).json({ token });
}
