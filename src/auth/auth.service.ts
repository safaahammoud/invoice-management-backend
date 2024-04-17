import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import 'dotenv/config'

import { UserResponse } from '../user/dto/user-response'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async login(username: string, inputPassword: string): Promise<UserResponse> {
		const user = await this.userService.findOneByUsername(username)

		if (user) {
			const isPasswordValid = await argon2.verify(user.password, inputPassword)

			if (!isPasswordValid) {
				return {
					errors: [
						{
							field: 'password',
							message: 'Incorrect password',
						},
					],
				}
			}

			const payload = { sub: user.id, username: user.username }

			return {
				access_token: await this.jwtService.sign(payload, { secret: process.env.VUE_APP_JWT_KEY }),
			}
		} else {
			return {
				errors: [
					{
						field: 'username',
						message: 'Username doesnt exist, try to register before logging',
					},
				],
			}
		}
	}

	async signup(username: string, password: string): Promise<UserResponse> {
		const user = await this.userService.findOneByUsername(username)

		if (user) {
			return {
				errors: [
					{
						field: 'username',
						message: 'Username already exist',
					},
				],
			}
		}

		if (username.length <= 2) {
			return {
				errors: [
					{
						field: 'username',
						message: 'Username should have length greater than 2',
					},
				],
			}
		}

		if (password.length <= 3) {
			return {
				errors: [
					{
						field: 'password',
						message: 'Password should have length greater than 3',
					},
				],
			}
		}

		const hashedPassword = await argon2.hash(password)
		const newUser = await this.userService.create({
			username,
			password: hashedPassword,
		})

		return { user: newUser }
	}
}
