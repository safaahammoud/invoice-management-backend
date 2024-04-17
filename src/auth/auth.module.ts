import { Module } from '@nestjs/common'

import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import 'dotenv/config'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: process.env.VUE_APP_JWT_KEY,
			signOptions: { expiresIn: '1d' },
		}),
	],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
