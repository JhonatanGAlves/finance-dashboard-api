import { UserNotFoundError } from '../../errors/user.js'
import {
    badRequest,
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
} from '../helpers/index.js'

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase
    }

    async execute(httpRequest) {
        try {
            const isValidId = checkIfIdIsValid(httpRequest.params.userId)

            if (!isValidId) {
                return invalidIdResponse()
            }

            const balance = await this.getUserBalanceUseCase.execute(
                httpRequest.params.userId,
            )

            return ok(balance)
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
