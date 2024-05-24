export class DeleteUserUseCase {
    constructor(dbDeleteUserRepository) {
        this.dbDeleteUserRepository = dbDeleteUserRepository
    }

    async execute(userId) {
        const userDeletedById =
            await this.dbDeleteUserRepository.execute(userId)
        return userDeletedById
    }
}
