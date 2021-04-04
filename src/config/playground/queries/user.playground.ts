export const userQueries = /* GraphQL */ `
  query me {
    me {
      ...UserFragment
    }
  }

  mutation updateProfile {
    updateProfile(username: "", firstname: "", lastname: "") {
      ...UserFragment
    }
  }

  fragment UserFragment on User {
    uuid
    email
    username
    firstname
    lastname
    pictureUrl
    createdAt
    updatedAt
  }
`
