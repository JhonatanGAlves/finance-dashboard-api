export class GetUserByIdUseCase {
    constructor(getUserByIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(userId) {
        const userSelectedById =
            await this.getUserByIdRepository.execute(userId)
        return userSelectedById
    }
}
