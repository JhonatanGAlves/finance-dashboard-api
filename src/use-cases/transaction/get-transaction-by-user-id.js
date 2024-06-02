export class GetTransactionByUserIdUseCase {
    constructor(getTransactionByUserIdRepository) {
        this.getTransactionByUserIdRepository = getTransactionByUserIdRepository
    }

    async execute(transactionId) {
        const transaction =
            await this.getTransactionByUserIdRepository.execute(transactionId)
        return transaction
    }
}
