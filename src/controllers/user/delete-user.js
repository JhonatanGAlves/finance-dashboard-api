import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFoundResponse,
    ok,
    serverError,
} from '../helpers/index.js'

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const isValidId = checkIfIdIsValid(userId)

            if (!isValidId) {
                return invalidIdResponse()
            }

            const userDeletedById = await this.deleteUserUseCase.execute(userId)

            if (!userDeletedById) {
                return notFoundResponse()
            }

            return ok(userDeletedById)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
