import { Field, ID, ObjectType } from '@nestjs/graphql'

import { IsEmail } from 'class-validator'
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { ERole } from '../../auth/role.enum'
import { Invoice } from '../../invoice/entities/invoice.entity'

@Entity('users')
@ObjectType()
export class User {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number

	@IsEmail()
	@Field(() => String)
	@Column('varchar')
	username!: string

	@Column({ type: 'text' })
	password!: string

	@Column({ type: 'json' })
	roles?: ERole[] = []

	@OneToMany(() => Invoice, (invoice) => invoice.user)
	@Field((type) => [Invoice])
	invoices?: Invoice[]

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date
}
