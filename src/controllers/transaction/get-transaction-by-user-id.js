import {
    notFound,
    ok,
    serverError,
    checkIfIdIsValid,
    invalidIdResponse,
} from '../helpers/index.js'

export class GetTransactionByUserIdController {
    constructor(getTransactionByUserIdUseCase) {
        this.getTransactionByUserIdUseCase = getTransactionByUserIdUseCase
    }

    async execute(httpRequest) {
        try {
            const isValidId = checkIfIdIsValid(httpRequest.params.transactionId)

            if (!isValidId) {
                return invalidIdResponse()
            }

            const transaction =
                await this.getTransactionByUserIdUseCase.execute(
                    httpRequest.params.transactionId,
                )

            if (!transaction) {
                return notFound({
                    message: 'Transaction not found.',
                })
            }

            return ok(transaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
