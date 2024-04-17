import { InputType, Field } from '@nestjs/graphql'

import { IsAlpha, IsCurrency, IsDateString, IsNumber } from 'class-validator'

@InputType()
export class CreateInvoiceInput {
	@Field()
	@IsNumber()
	referenceNumber: number

	@Field((type) => Date)
	@IsDateString()
	dateIssued: Date

	@Field((type) => Date)
	@IsDateString()
	dueDate: Date

	@Field((type) => String)
	@IsAlpha()
	status: string

	@Field((type) => String)
	@IsCurrency({
		require_symbol: true,
		symbol_after_digits: true,
	})
	amount: string
}
