import { CreateUserUseCase } from '../use-cases/create-user.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    checkIfEmailIsValid,
    checkIfPasswordIdValid,
    emailAlreadyInUseResponse,
    invalidPasswordResponse,
    badRequest,
    created,
    serverError,
} from './helpers/index.js'

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requiredFields) {
                if (!params[field] || !params[field].trim().length) {
                    return badRequest({ message: `Missing param: ${field}` })
                }
            }

            const isValidPassword = checkIfPasswordIdValid(params.password)
            if (!isValidPassword) {
                return invalidPasswordResponse()
            }

            const isValidEmail = checkIfEmailIsValid(params.email)
            if (!isValidEmail) {
                return emailAlreadyInUseResponse()
            }

            const createUserUseCase = new CreateUserUseCase()
            const createdUser = await createUserUseCase.execute({ ...params })

            return created(createdUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({
                    message: error.message,
                })
            }
            console.error(error)
            return serverError()
        }
    }
}
