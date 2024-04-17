import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '../entities/user.entity'
import { FieldError } from './field-error'

@ObjectType()
export class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[]

	@Field(() => User, { nullable: true })
	user?: User

	@Field(() => String, { nullable: true })
	access_token?: string
}
