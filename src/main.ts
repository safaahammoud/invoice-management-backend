import { NestFactory } from '@nestjs/core'

import 'reflect-metadata'

import { AppModule } from './app.module'
import { dataSource } from './consts/data-source'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableCors({
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	})

	await dataSource.initialize().catch((err) => {
		console.error('error while connecting to DB', err)
	})

	await app.listen(3001)
}

bootstrap()
