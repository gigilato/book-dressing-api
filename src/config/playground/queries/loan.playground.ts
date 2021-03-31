export const loanQueries = /* GraphQL */ `
  query loans {
    loans {
      pageInfos {
        hasNextPage
      }
      aggregate {
        count
      }
      edges {
        node {
          ...LoanFragment
        }
      }
    }
  }

  query requests {
    requests {
      pageInfos {
        hasNextPage
      }
      aggregate {
        count
      }
      edges {
        node {
          ...LoanFragment
        }
      }
    }
  }

  mutation requestLoan {
    requestLoan(bookUuid: "") {
      ...LoanFragment
    }
  }

  mutation acceptLoan {
    acceptLoan(loanUuid: "") {
      ...LoanFragment
    }
  }

  mutation rejectLoan {
    rejectLoan(loanUuid: "") {
      ...LoanFragment
    }
  }

  mutation finishLoan {
    rejectLoan(loanUuid: "") {
      ...LoanFragment
    }
  }

  fragment LoanFragment on Loan {
    uuid
    status
    createdAt
    updatedAt
    finishedAt
    user {
      uuid
      username
    }
    book {
      uuid
      title
    }
  }
`
