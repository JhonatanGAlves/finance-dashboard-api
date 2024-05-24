import { DeleteUserUseCase, GetUserByIdUseCase } from '../use-cases/index.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFoundResponse,
    ok,
    serverError,
} from './helpers/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const isValidId = checkIfIdIsValid(userId)

            if (!isValidId) {
                return invalidIdResponse()
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()
            const userSelectedById = await getUserByIdUseCase.execute(userId)

            if (!userSelectedById) {
                return notFoundResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()
            const userDeletedById = await deleteUserUseCase.execute(userId)

            return ok(userDeletedById)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
