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

export const getPaginatedPosts = gql`
  query paginatedBlogs($first: Int, $skip: Int) {
    blogModels(first: $first, skip: $skip) {
      id
      slug
      title
      subheading
      tags
      content {
        html
        markdown
      }
      bannerImage {
        height
        size
        width
        url
        fileName
      }
      date
    }
  }
`;
