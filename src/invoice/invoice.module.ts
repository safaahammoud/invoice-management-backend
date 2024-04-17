import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Invoice } from './entities/invoice.entity'
import { InvoiceResolver } from './invoice.resolver'
import { InvoiceService } from './invoice.service'

@Module({
	imports: [TypeOrmModule.forFeature([Invoice])],
	providers: [InvoiceResolver, InvoiceService],
	exports: [InvoiceService],
})
export class InvoiceModule {}
