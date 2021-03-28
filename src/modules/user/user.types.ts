import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  firstname?: string
  @Field({ nullable: true })
  lastname?: string
  @Field({ nullable: true })
  username?: string
}
