import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthService } from '../auth/auth.service'
import { User } from './entities/user.entity'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UserResolver, UserService, AuthService, JwtService],
	exports: [UserService],
})
export class UserModule {}
