import { v4 as uuidv4 } from 'uuid'

import { UserNotFoundError } from '../../errors/user.js'

export class CreateTransactionUseCase {
    constructor(dbCreateTransactionRepository, getUserByIdRepository) {
        this.dbCreateTransactionRepository = dbCreateTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(createTransactionParams) {
        const userId = createTransactionParams.user_id
        const user = await this.getUserByIdRepository.execute(userId)
        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const transactionId = uuidv4()
        const transaction = {
            ...createTransactionParams,
            id: transactionId,
        }

        const createdTransaction =
            await this.dbCreateTransactionRepository.execute(transaction)

        return createdTransaction
    }
}
