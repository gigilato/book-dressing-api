export const loanQueries = /* GraphQL */ `
  query loans {
    loans(where: { userUuid: "", ownerUuid: "" }) {
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

  mutation cancelLoan {
    cancelLoan(loanUuid: "") {
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
