import { notFound } from '../../controllers/helpers/index.js'
import { UserNotFoundError } from '../../errors/user.js'

export class UpdateTransactionUseCase {
    constructor(
        updateTransactionRepository,
        getTransactionByIdRepository,
        getUserByIdRepository,
    ) {
        this.updateTransactionRepository = updateTransactionRepository
        this.getTransactionByIdRepository = getTransactionByIdRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(transactionId, updateTransactionParams) {
        const transaction =
            await this.getTransactionByIdRepository.execute(transactionId)

        if (!transaction) {
            return notFound({
                message: 'Transaction not found.',
            })
        }

        const userId = updateTransactionParams.user_id
        const user = await this.getUserByIdRepository.execute(userId)
        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const updatedTransaction =
            await this.updateTransactionRepository.execute(
                transactionId,
                updateTransactionParams,
            )

        return updatedTransaction
    }
}
