import validator from 'validator'
import {
    badRequest,
    checkIfIdIsValid,
    created,
    invalidIdResponse,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js'

export class CreateTransactionController {
    constructor(crateTransactionUseCase) {
        this.crateTransactionUseCase = crateTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']
            const { ok: requiredFieldsWereProvided, missingField } =
                validateRequiredFields(params, requiredFields)

            if (!requiredFieldsWereProvided) {
                return badRequest({
                    message: `The field ${missingField} is required.`,
                })
            }

            const userId = params.user_id
            const isValidId = checkIfIdIsValid(userId)

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

            const createdTransaction =
                await this.crateTransactionUseCase.execute({
                    ...params,
                    type,
                })

            return created(createdTransaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
