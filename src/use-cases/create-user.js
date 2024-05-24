import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    constructor(dbCreateUserRepository, dbGetUserByEmailRepository) {
        this.dbCreateUserRepository = dbCreateUserRepository
        this.dbGetUserByEmailRepository = dbGetUserByEmailRepository
    }

    async execute(createUserParams) {
        const userWithProvidedEmail =
            await this.dbGetUserByEmailRepository.execute(
                createUserParams.email,
            )

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }

        const userId = uuidv4()
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        const createdUser = await this.dbCreateUserRepository.execute(user)

        return createdUser
    }
}
