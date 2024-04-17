import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Invoice } from '../entities/invoice.entity'

@ObjectType()
export class InvoiceFetchResult {
	@Field((type) => String)
	statusCode: string

	@Field()
	data: Invoice[]

	@Field((type) => Int)
	totalCount: number

	@Field((type) => Int)
	nextPage: number

	@Field((type) => Int)
	prevPage: number

	@Field((type) => Int)
	currentPage: number

	@Field((type) => Int)
	pageCount: number
}
