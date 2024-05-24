import bcrypt from 'bcrypt'

import { EmailAlreadyInUseError } from '../../errors/user.js'

export class UpdateUserUseCase {
    constructor(dbUpdateUserRepository, dbGetUserByEmailRepository) {
        this.dbUpdateUserRepository = dbUpdateUserRepository
        this.dbGetUserByEmailRepository = dbGetUserByEmailRepository
    }

    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.dbGetUserByEmailRepository.execute(
                    updateUserParams.email,
                )
            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        const user = {
            ...updateUserParams,
        }

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )
            user.password = hashedPassword
        }

        const updatedUser = await this.dbUpdateUserRepository.execute(
            userId,
            user,
        )
        return updatedUser
    }
}
