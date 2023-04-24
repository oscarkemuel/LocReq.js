import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../helpers/apiErros'
import { ZodError } from 'zod'

export const errorMiddleware = (
	error: Error & Partial<ApiError>,
	_: Request,
	res: Response,
	__: NextFunction
) => {
	if(error instanceof ZodError) {
		return res.status(400).json({
			path: error.issues[0].path[1] ?? '',
			message: error.issues[0].message,
			code: error.issues[0].code,
		})
	}

	const statusCode = error.statusCode ?? 500
	const message = error.statusCode ? error.message : 'Internal Server Error'
	return res.status(statusCode).json({ message })
}