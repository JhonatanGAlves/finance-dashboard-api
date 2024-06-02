import validator from 'validator'

import {
    badRequest,
    checkIfIdIsValid,
    created,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js'
import { UserNotFoundError } from '../../errors/user.js'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }

    async execute(httpRequest) {
        const params = httpRequest.body

        try {
            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']

            const { ok: requiredFieldsWereProvided, missingField } =
                validateRequiredFields(params, requiredFields)

            if (!requiredFieldsWereProvided) {
                return requiredFieldIsMissingResponse(missingField)
            }

            const transactionId = httpRequest.params.transactionId
            const isValidId = checkIfIdIsValid(transactionId)

            if (!isValidId) {
                return invalidIdResponse()
            }

            const isValidAmount = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                },
            )

            if (!isValidAmount) {
                return badRequest({
                    message: 'The amount must be a valid currency.',
                })
            }

            const type = params.type.trim().toUpperCase()

            const isValidType = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type,
            )

            if (!isValidType) {
                return badRequest({
                    message: 'The must be EARNING, EXPENSE or INVESTMENT.',
                })
            }

            const updatedTransaction =
                await this.updateTransactionUseCase.execute(transactionId, {
                    ...params,
                    type,
                })

            return created(updatedTransaction)
        } catch (error) {
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
