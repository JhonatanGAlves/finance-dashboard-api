import 'dotenv/config.js'
import express from 'express'
import {
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    GetUserByIdController,
} from './src/controllers/index.js'
import {
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
} from './src/repositories/postgres/index.js'
import {
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
} from './src/use-cases/index.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (request, response) => {
    const createUserRepository = new PostgresCreateUserRepository()
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const createUserUseCase = new CreateUserUseCase(
        createUserRepository,
        getUserByEmailRepository,
    )
    const createUserController = new CreateUserController(createUserUseCase)

    const { statusCode, body } = await createUserController.execute(request)

    return response.status(statusCode).send(body)
})

app.get(`/api/users/:userId`, async (request, response) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    const { statusCode, body } = await getUserByIdController.execute(request)

    return response.status(statusCode).send(body)
})

app.patch('/api/users/update/:userId', async (request, response) => {
    const updateUserRepository = new PostgresUpdateUserRepository()
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const updateUserUseCase = new UpdateUserUseCase(
        updateUserRepository,
        getUserByEmailRepository,
    )
    const updateUserController = new UpdateUserController(updateUserUseCase)

    const { statusCode, body } = await updateUserController.execute(request)

    return response.status(statusCode).send(body)
})

app.delete('/api/users/delete/:userId', async (request, response) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const deleteUserRepository = new PostgresDeleteUserRepository()
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)
    const deleteUserController = new DeleteUserController(
        deleteUserUseCase,
        getUserByIdUseCase,
    )

    const { statusCode, body } = await deleteUserController.execute(request)

    return response.status(statusCode).send(body)
})

app.listen(process.env.PORT, async () =>
    console.log(`Listening on port ${process.env.PORT}`),
)
