import { prisma } from '../../../../prisma/prisma.js'

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        const { id, first_name, last_name, email, password } = createUserParams

        const user = await prisma.user.create({
            data: {
                id,
                first_name,
                last_name,
                email,
                password,
            },
        })

        return user
    }
}
