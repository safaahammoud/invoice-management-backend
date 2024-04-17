import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

import GraphQLJSON from 'graphql-type-json'

import { CreateInvoiceInput } from './dto/create-invoice.input'
import { UpdateInvoiceInput } from './dto/update-invoice.input'
import { Invoice } from './entities/invoice.entity'
import { InvoiceService } from './invoice.service'

@Resolver((of) => Invoice)
export class InvoiceResolver {
	constructor(private readonly invoiceService: InvoiceService) {}

	@Query((returns) => GraphQLJSON, { name: 'invoices' })
	invoices(
		@Args('currentPage', { type: () => Int, nullable: true }) currentPage: number,
		@Args('itemsPerPage', { type: () => Int, nullable: true }) itemsPerPage: number,
		@Args('searchTerm', { type: () => String, nullable: true }) searchTerm: string,
	) {
		return this.invoiceService.findAll(currentPage, itemsPerPage, searchTerm)
	}

	@Mutation(() => Invoice)
	createInvoice(
		@Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput,
	): Promise<Invoice> {
		return this.invoiceService.createInvoice(createInvoiceInput)
	}

	@Mutation(() => Invoice)
	updateInvoice(@Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput) {
		return this.invoiceService.update(updateInvoiceInput)
	}
}
