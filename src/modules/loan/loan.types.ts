import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { BaseConnectionInput, Connection } from '../../utils/pagination'
import { Loan } from './loan.entity'

@ObjectType()
export class LoanConnection extends Connection(Loan) {}

@InputType()
class LoansWhereInput {
  @Field(() => ID, { nullable: true })
  userUuid?: string
  @Field(() => ID, { nullable: true })
  ownerUuid?: string
}

@ArgsType()
export class LoansInput extends BaseConnectionInput {
  @Field(() => LoansWhereInput)
  where!: LoansWhereInput
}

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
