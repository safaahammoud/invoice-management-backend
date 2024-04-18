import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import GraphQLJSON from 'graphql-type-json'
import { join } from 'path'
import 'reflect-metadata'

import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { dataSourceDetails } from './consts/data-source'
import { InvoiceModule } from './invoice/invoice.module'
import { UserModule } from './user/user.module'
import { allowAuthenticatedOnly } from 'middleware/allow-authenticated-user.middleware'

@Module({
	imports: [
		UserModule,
		AuthModule,
		InvoiceModule,
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({ ...dataSourceDetails }),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			resolvers: { JSON: GraphQLJSON },
		}),
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(allowAuthenticatedOnly)
			.exclude(
				{ path: 'registerUser', method: RequestMethod.POST },
				{ path: 'loginUser', method: RequestMethod.POST },
			)
	}
}
