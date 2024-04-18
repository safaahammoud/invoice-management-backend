import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import 'dotenv/config'

import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			signOptions: { expiresIn: '1d' },
		}),
	],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
