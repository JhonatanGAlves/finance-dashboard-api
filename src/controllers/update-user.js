import validator from 'validator'

import { badRequest, ok, serverError } from './helpers.js'
import { UpdateUserUseCase } from '../use-cases/update-user.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class UpdateUserController {
    async execute(httpRequest) {
        const params = httpRequest.body

        try {
            const userId = httpRequest.params.userId
            const isValidId = validator.isUUID(userId)

            if (!isValidId) {
                return badRequest({ message: 'The provided ID is not valid.' })
            }

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }

            if (params.password) {
                const isValidPassword = params.password.length > 5
                if (!isValidPassword) {
                    return badRequest({
                        message: 'Password must be at least 6 characters',
                    })
                }
            }

            if (params.email) {
                const isValidEmail = validator.isEmail(params.email)
                if (!isValidEmail) {
                    return badRequest({
                        message: 'Invalid e-mail. Please provide a valid one',
                    })
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()
            const updatedUser = await updateUserUseCase.execute(userId, params)

            return ok(updatedUser)
        } catch (error) {
            if (params.email && error instanceof EmailAlreadyInUseError) {
                return badRequest({
                    message: error.message,
                })
            }
            console.error(error)
            return serverError()
        }
    }
}
