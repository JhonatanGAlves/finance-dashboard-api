import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    ok,
    notFound,
} from './helpers/index.js'

export class GetUserByIdController {
    constructor(getUserByIdUseCases) {
        this.getUserByIdUseCases = getUserByIdUseCases
    }

    async execute(httpRequest) {
        try {
            const isValidId = checkIfIdIsValid(httpRequest.params.userId)

            if (!isValidId) {
                return invalidIdResponse()
            }

            const userSelectedById = await this.getUserByIdUseCases.execute(
                httpRequest.params.userId,
            )

            if (!userSelectedById) {
                return notFound({
                    message: 'User not found',
                })
            }

            return ok(userSelectedById)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
