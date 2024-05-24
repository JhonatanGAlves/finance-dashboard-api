import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const userSelectedById = await PostgresHelper.query(
            'SELECT * FROM users WHERE id = $1',
            [userId],
        )
        return userSelectedById[0]
    }
}
