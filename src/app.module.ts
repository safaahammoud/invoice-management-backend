import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import 'dotenv/config'
import GraphQLJSON from 'graphql-type-json'
import { join } from 'path'
import 'reflect-metadata'

import { AuthModule } from './auth/auth.module'
import { dataSourceDetails } from './consts/data-source'
import { InvoiceModule } from './invoice/invoice.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		UserModule,
		AuthModule,
		InvoiceModule,
		TypeOrmModule.forRoot({ ...dataSourceDetails }),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			resolvers: { JSON: GraphQLJSON },
		}),
	],
})
export class AppModule {}
