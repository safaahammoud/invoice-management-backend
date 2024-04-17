import 'dotenv/config'

import { DataSource, DataSourceOptions } from 'typeorm'

import { Invoice } from '../invoice/entities/invoice.entity'
import { User } from '../user/entities/user.entity'

export const dataSourceDetails: DataSourceOptions = {
	type: 'mysql',
	host: process.env.DATABASE_HOST,
	port: +process.env.DATABASE_PORT,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	synchronize: process.env.NODE_ENV !== 'PROD',
	logging: process.env.NODE_ENV !== 'PROD',
	entities: [User, Invoice],
}

export const dataSource = new DataSource(dataSourceDetails)
