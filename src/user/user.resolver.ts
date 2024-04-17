import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthService } from 'src/auth/auth.service'
import { CreateUserInput } from './dto/create-user.input'
import { UserResponse } from './dto/user-response'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
	constructor(
		private authService: AuthService,
		private readonly userService: UserService,
	) {}

	@Query(() => [User], { name: 'users' })
	users() {
		return this.userService.findAll()
	}

	@Mutation(() => UserResponse)
	async registerUser(
		@Args('createUserInput') createUserInput: CreateUserInput,
	): Promise<UserResponse> {
		return this.authService.signup(createUserInput.username, createUserInput.password)
	}

	@Mutation(() => UserResponse)
	async loginUser(
		@Args('loginUserInput') { username, password }: CreateUserInput,
	): Promise<UserResponse> {
		return this.authService.login(username, password)
	}
}
