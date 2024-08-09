import { ZodError } from 'zod'

import {
    badRequest,
    checkIfIdIsValid,
    created,
    invalidIdResponse,
    serverError,
} from '../helpers/index.js'
import { UserNotFoundError } from '../../errors/user.js'
import { updateTransactionSchema } from '../../schemas/transaction.js'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }

    async execute(httpRequest) {
        const params = httpRequest.body

        try {
            const transactionId = httpRequest.params.transactionId
            const isValidId = checkIfIdIsValid(transactionId)

            if (!isValidId) {
                return invalidIdResponse()
            }

            await updateTransactionSchema.parseAsync(params)

            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    transactionId,
                    params,
                )

            return created(updatedTransaction)
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
