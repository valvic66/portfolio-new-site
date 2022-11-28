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
      date
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
        width
        url
        fileName
      }
    }
  }
`;

export const getBlogBySlug = gql`
  query getBlogBySlug($slug: String!) {
    blogModel(where: { slug: $slug }, stage: DRAFT) {
      id
      date
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
        width
        url
        fileName
      }
    }
  }
`;
