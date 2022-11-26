import { gql } from 'graphql-request';

export const CreateUserMutation = gql`
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

export const getUserByEmailQuery = gql`
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

export const UpdateUserMutation = gql`
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

export const getAllBlogs = gql`
  query getAllBlogs() {
    blogModels {
      id
      slug
      title
    }
  }
`;
