import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { CreateInvoiceInput } from './dto/create-invoice.input'
import { InvoiceFetchResult } from './dto/fetch-invoice-result'
import { UpdateInvoiceInput } from './dto/update-invoice.input'
import { Invoice } from './entities/invoice.entity'

@Injectable()
export class InvoiceService {
	constructor(@InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>) {}

	async createInvoice(createInvoiceInput: CreateInvoiceInput): Promise<Invoice> {
		const newInvoice = this.invoiceRepository.create(createInvoiceInput)

		return this.invoiceRepository.save(newInvoice)
	}

	async findAll(
		currentPage?: number,
		itemsPerPage?: number,
		searchTerm?: string,
	): Promise<InvoiceFetchResult> {
		const page = currentPage || 1
		const maxItemsPerPage = Math.min(50, itemsPerPage)
		let totalCount = 0

		const queryBuilder = await this.invoiceRepository
			.createQueryBuilder('invoices')
			.orderBy('createdAt', 'DESC')

		if (searchTerm) {
			queryBuilder
				.where('referenceNumber like :referenceNumber', { referenceNumber: `%{searchTerm}%` })
				.orWhere('status like :status', { status: `%${searchTerm}%` })
		}

		totalCount = await queryBuilder.getCount()

		const pageCount = Math.ceil(totalCount / maxItemsPerPage)

		if (itemsPerPage) {
			if (page === pageCount) {
				const lastPageRecordCount = totalCount % itemsPerPage

				queryBuilder.take(lastPageRecordCount)
			} else {
				queryBuilder.take(maxItemsPerPage)
			}
		}

		if (page > 1) {
			queryBuilder.skip(maxItemsPerPage)
		}

		const recordsForCurrentPage = await queryBuilder.getMany()

		const [result, total] = [recordsForCurrentPage, totalCount]
		const nextPage = page + 1 > pageCount ? null : page + 1
		const prevPage = page - 1 < 1 ? null : page - 1

		return {
			pageCount,
			statusCode: 'success',
			data: [...result],
			totalCount: total,
			currentPage: page,
			nextPage: nextPage,
			prevPage: prevPage,
		}
	}

	async findOne(id: number): Promise<Invoice | null> {
		const invoice = await this.invoiceRepository.findOneBy({ id })

		if (!invoice) {
			return null
		}

		return invoice
	}

	async update(updateInvoiceInput: UpdateInvoiceInput): Promise<Invoice | null> {
		const invoiceToUpdate = this.findOne(updateInvoiceInput.id)

		await this.invoiceRepository.update(
			{ id: updateInvoiceInput.id },
			{
				...invoiceToUpdate,
				...updateInvoiceInput,
			},
		)

		return this.findOne(updateInvoiceInput.id)
	}
}
