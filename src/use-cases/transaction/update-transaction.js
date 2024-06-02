export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository) {
        this.updateTransactionRepository = updateTransactionRepository
    }

    async execute(transactionId, updateTransactionParams) {
        const updatedTransaction =
            await this.updateTransactionRepository.execute(
                transactionId,
                updateTransactionParams,
            )

        return updatedTransaction
    }
}
