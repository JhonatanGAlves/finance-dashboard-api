import validator from 'validator'

import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, serverError, ok } from './helpers.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isValidId = validator.isUUID(httpRequest.params.userId)

            if (!isValidId) {
                return badRequest({ message: 'The provided ID is not valid.' })
            }

            const getUserByIdUseCases = new GetUserByIdUseCase()
            const userSelectedById = await getUserByIdUseCases.execute(
                httpRequest.params.userId,
            )

            return ok(userSelectedById)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
