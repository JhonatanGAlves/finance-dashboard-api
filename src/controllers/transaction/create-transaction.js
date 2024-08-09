import { badRequest, created, serverError } from '../helpers/index.js'
import { UserNotFoundError } from '../../errors/user.js'
import { createTransactionSchema } from '../../schemas/index.js'
import { ZodError } from 'zod'

export class CreateTransactionController {
    constructor(crateTransactionUseCase) {
        this.crateTransactionUseCase = crateTransactionUseCase
    }

    async execute(httpRequest) {
        const params = httpRequest.body

        try {
            await createTransactionSchema.parseAsync(params)

            const createdTransaction =
                await this.crateTransactionUseCase.execute(params)

            return created(createdTransaction)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                })
            }

            if (params.user_id && error instanceof UserNotFoundError) {
                return badRequest({
                    message: error.message,
                })
            }
            console.error(error)
            return serverError()
        }
    }
}
