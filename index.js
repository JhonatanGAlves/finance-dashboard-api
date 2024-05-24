import 'dotenv/config.js'
import express from 'express'
import {
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    GetUserByIdController,
} from './src/controllers/index.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController()
    const { statusCode, body } = await createUserController.execute(request)

    return response.status(statusCode).send(body)
})

app.get(`/api/users/:userId`, async (request, response) => {
    const getUserByIdController = new GetUserByIdController()
    const { statusCode, body } = await getUserByIdController.execute(request)

    return response.status(statusCode).send(body)
})

app.patch('/api/users/update/:userId', async (request, response) => {
    const updateUserController = new UpdateUserController()
    const { statusCode, body } = await updateUserController.execute(request)

    return response.status(statusCode).send(body)
})

app.delete('/api/users/delete/:userId', async (request, response) => {
    const deleteUserController = new DeleteUserController()
    const { statusCode, body } = await deleteUserController.execute(request)

    return response.status(statusCode).send(body)
})

app.listen(process.env.PORT, async () =>
    console.log(`Listening on port ${process.env.PORT}`),
)
