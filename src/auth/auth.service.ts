import 'dotenv/config'

import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as argon2 from 'argon2'

import { UserResponse } from '../user/dto/user-response'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	async login(username: string, inputPassword: string): Promise<UserResponse> {
		const user = await this.userService.findOneByUsername(username)

		if (user) {
			const isPasswordValid = await argon2.verify(user.password, inputPassword)

			if (!isPasswordValid) {
				throw new BadRequestException('Incorrect password')
			}

			const payload = { sub: user.id, username: user.username }
			const jwtSecretKey = this.configService.get<string>('JWT_KEY')

			return {
				user,
				access_token: await this.jwtService.sign(payload, { secret: jwtSecretKey }),
			}
		} else {
			throw new BadRequestException('Username doesnt exist, try to register before logging')
		}
	}

	async signup(username: string, password: string): Promise<UserResponse> {
		const user = await this.userService.findOneByUsername(username)

		if (user) {
			throw new BadRequestException('Username already exist')
		}

		if (username.length <= 2) {
			throw new BadRequestException('Username should have length greater than 2')
		}

		if (password.length <= 3) {
			throw new BadRequestException('Password should have length greater than 3')
		}

		const hashedPassword = await argon2.hash(password)
		const newUser = await this.userService.create({
			username,
			password: hashedPassword,
		})

		return { user: newUser }
	}
}
