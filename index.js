import 'dotenv/config.js'
import express from 'express'

import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from './src/factories/controllers/user.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (request, response) => {
    const createUserController = makeCreateUserController()
    const { statusCode, body } = await createUserController.execute(request)

    return response.status(statusCode).send(body)
})

app.get(`/api/users/:userId`, async (request, response) => {
    const getUserByIdController = makeGetUserByIdController()
    const { statusCode, body } = await getUserByIdController.execute(request)

    return response.status(statusCode).send(body)
})

app.patch('/api/users/update/:userId', async (request, response) => {
    const updateUserController = makeUpdateUserController()
    const { statusCode, body } = await updateUserController.execute(request)

    return response.status(statusCode).send(body)
})

app.delete('/api/users/delete/:userId', async (request, response) => {
    const deleteUserController = makeDeleteUserController()
    const { statusCode, body } = await deleteUserController.execute(request)

    return response.status(statusCode).send(body)
})

app.listen(process.env.PORT, async () =>
    console.log(`Listening on port ${process.env.PORT}`),
)
