import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresDeleteUserRepository {
    async execute(userId) {
        const userDeletedById = await PostgresHelper.query(
            `
            DELETE FROM users
            WHERE id = $1
            RETURNING *
            `,
            [userId],
        )
        return userDeletedById[0]
    }
}
