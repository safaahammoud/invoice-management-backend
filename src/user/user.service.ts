import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { CreateUserInput } from './dto/create-user.input'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	findAll(): Promise<User[]> {
		return this.userRepository.find()
	}

	async findOneByUsername(username: string): Promise<User | null> {
		const user = await this.userRepository.findOneBy({ username })

		if (!user) {
			return null
		}

		return user
	}

	async create(createUserInput: CreateUserInput): Promise<User> {
		const newUser = await this.userRepository.create(createUserInput)

		await this.userRepository.save(newUser)

		return newUser
	}
}
