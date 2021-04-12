import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  username?: string
  @Field({ nullable: true })
  description?: string
}

export class CreateUserInput {
  email!: string
  firebaseId!: string
}
