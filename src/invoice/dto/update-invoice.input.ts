import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class UpdateInvoiceInput {
	@Field(() => Int)
	id: number

	@Field(() => String)
	status: string

	@Field(() => String)
	note: string = ''
}
