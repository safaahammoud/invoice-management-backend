import { UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

const extractTokenFromHeader = (request: Request): string | undefined => {
	const [type, token] = request.headers['authorization']?.split(' ') ?? []

	return type === 'Bearer' ? token : undefined
}

export function allowAuthenticatedOnly(req: Request, res: Response, next: NextFunction) {
	if (extractTokenFromHeader(req)) {
		next()
	} else {
		throw new UnauthorizedException(
			new Error(`${req.statusCode}`),
			'Unauthorized user, please login and try again',
		)
	}
}
