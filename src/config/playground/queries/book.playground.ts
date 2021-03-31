export const bookQueries = /* GraphQL */ `
  query book {
    book(bookUuid: "db98efac-3f1d-4cf4-973c-a99df81f1e64") {
      ...BookFragment
    }
  }

  query books {
    books {
      pageInfos {
        hasNextPage
      }
      aggregate {
        count
      }
      edges {
        node {
          ...BookFragment
        }
      }
    }
  }

  mutation createBook {
    createBook(
      uuid: "db98efac-3f1d-4cf4-973c-a99df81f1e64"
      isbn: "isbn"
      title: "title"
      author: "author"
      description: "description"
    ) {
      ...BookFragment
    }
  }

  fragment BookFragment on Book {
    uuid
    title
    author
    description
    pictureUrl
    status
    createdAt
    updatedAt
  }
`
