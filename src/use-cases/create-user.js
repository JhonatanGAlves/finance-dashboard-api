import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user'

export class CreateUserUseCase {
    async execute(createUserParams) {
        const userId = uuidv4()
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        const dbCreateUserRepository = new PostgresCreateUserRepository()
        const createdUser = await dbCreateUserRepository.execute(user)

        return createdUser
    }
}
