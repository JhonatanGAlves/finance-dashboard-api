import { PostgresDeleteUserRepository } from '../repositories/postgres/index.js'

export class DeleteUserUseCase {
    async execute(userId) {
        const postgresDeleteUserUseCase = new PostgresDeleteUserRepository()
        const userDeletedById = await postgresDeleteUserUseCase.execute(userId)
        return userDeletedById
    }
}
