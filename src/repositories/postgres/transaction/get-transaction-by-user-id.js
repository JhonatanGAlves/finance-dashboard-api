import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresGetTransactionByUserIdRepository {
    async execute(transactionId) {
        const transaction = await PostgresHelper.query(
            'SELECT * FROM transactions WHERE id = $1',
            [transactionId],
        )

        return transaction[0]
    }
}
