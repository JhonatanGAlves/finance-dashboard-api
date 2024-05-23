import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { serverError, ok, notFound } from './helpers/http.js'
import { checkIfIdIsValid, invalidIdResponse } from './helpers/user.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isValidId = checkIfIdIsValid(httpRequest.params.userId)

            if (!isValidId) {
                return invalidIdResponse()
            }

            const getUserByIdUseCases = new GetUserByIdUseCase()
            const userSelectedById = await getUserByIdUseCases.execute(
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
