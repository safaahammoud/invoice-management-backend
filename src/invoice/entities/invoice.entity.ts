import { Field, Int, ObjectType } from '@nestjs/graphql'

import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { User } from '../../user/entities/user.entity'

@Entity('invoices')
@ObjectType()
export class Invoice {
	@Field(() => Int)
	@PrimaryGeneratedColumn({ type: 'integer' })
	id!: number

	@Field(() => Int)
	@Column({ type: 'integer', unique: true })
	referenceNumber!: number

	@Field(() => String)
	@Column({ type: 'datetime' })
	dateIssued!: Date

	@Field(() => String)
	@Column({ type: 'datetime' })
	dueDate!: Date

	@Field(() => String)
	@Column({ type: 'text' })
	status!: string

	@Field(() => String)
	@Column({ type: 'text' })
	amount!: string

	@Field(() => String)
	@Column({ type: 'text' })
	note: string = ''

	@Field((type) => User)
	@ManyToOne(() => User, (user) => user.invoices)
	user: User = null

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date
}
