import { ArgsType, Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseConnectionInput, Connection } from '@utils/pagination'
import { Loan } from './loan.entity'

@ObjectType()
export class LoanConnection extends Connection(Loan) {}

@ArgsType()
export class LoansInput extends BaseConnectionInput {}

@ArgsType()
export class CreateLoanInput {
  @Field(() => ID)
  bookUuid!: string
}

@ArgsType()
export class LoanWhereUniqueInput {
  @Field(() => ID)
  loanUuid!: string
}
