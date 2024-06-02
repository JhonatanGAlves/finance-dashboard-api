import { UserNotFoundError } from '../../errors/user.js'
import {
    ok,
    serverError,
    checkIfIdIsValid,
    invalidIdResponse,
    badRequest,
    requiredFieldIsMissingResponse,
} from '../helpers/index.js'

export class GetTransactionByUserIdController {
    constructor(getTransactionByUserIdUseCase) {
        this.getTransactionByUserIdUseCase = getTransactionByUserIdUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId
            if (!userId) {
                return requiredFieldIsMissingResponse('userId')
            }
            const isValidId = checkIfIdIsValid(userId)

            if (!isValidId) {
                return invalidIdResponse()
            }

            const transaction =
                await this.getTransactionByUserIdUseCase.execute(userId)

            return ok(transaction)
        } catch (error) {
            console.error(error)
            if (error instanceof UserNotFoundError) {
                return badRequest({
                    message: error.message,
                })
            }
            return serverError()
        }
    }
}
