export const loanQueries = /* GraphQL */ `
  mutation requestLoan {
    requestLoan(bookUuid: "db98efac-3f1d-4cf4-973c-a99df81f1e64") {
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
