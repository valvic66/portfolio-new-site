import { gql, GraphQLClient } from 'graphql-request';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { withIronSessionApiRoute } from 'iron-session/next';

const {
  JWT_SECRET,
  GRAPHCMS_URL,
  JWT_EXPIRES_IN,
  COOKIE_NAME,
  COOKIE_PASSWORD,
} = process.env;
const client = new GraphQLClient(GRAPHCMS_URL, {
  // headers: {
  //   Authorization: `Bearer ${GRAPHCMS_PERMANENTAUTH_TOKEN}`,
  // },
});

const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

const getUserByEmailQuery = gql`
  query getUserByEmailQuery($email: String!) {
    userModel(where: { email: $email }, stage: DRAFT) {
      email
      password
      firstname
      lastname
      token
    }
  }
`;

const UpdateUserMutation = gql`
  mutation UpdateUser(
    $where: UserModelWhereUniqueInput!
    $data: UserModelUpdateInput!
  ) {
    updateUserModel(where: $where, data: $data) {
      token
      email
    }
  }
`;

export default withIronSessionApiRoute(async function handler(req, res) {
  const { password = 'Test_2022', email = 'test@gmail.com' } = req.body;

  if (!email || !password) {
    res.status(400).end();
  }

  // compare the password from user with password from db
  const userData = await client.request(getUserByEmailQuery, {
    email: 'test@gmail.com',
  });
  console.log({ userData });

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

  console.log({ updateUserModel });

  // store it inside the request session storage
  // return it back to the client

  req.session.user = {
    token: updateUserModel.token,
  };
  await req.session.save();

  return res.status(200).json({ token: updateUserModel.token });
}, cookie);
