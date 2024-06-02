export class GetTransactionByIdUseCase {
    constructor(getTransactionByIdRepository) {
        this.dbGetTransactionByIdRepository = getTransactionByIdRepository
    }

    async execute(transactionId) {
        const transaction =
            await this.dbGetTransactionByIdRepository.execute(transactionId)
        return transaction
    }
}
