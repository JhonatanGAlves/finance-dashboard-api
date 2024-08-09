import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserByEmailRepository {
    async execute(userEmail) {
        return await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
        })
    }
}
