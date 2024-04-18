import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '../entities/user.entity'

@ObjectType()
export class UserResponse {
	@Field(() => User, { nullable: true })
	user?: User

	@Field(() => String, { nullable: true })
	access_token?: string
}
