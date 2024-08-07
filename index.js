import 'dotenv/config.js'
import express from 'express'

import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
    makeUserBalanceController,
} from './src/factories/controllers/user.js'
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionByUserIdController,
    makeUpdateTransactionController,
} from './src/factories/controllers/transaction.js'

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

app.get('/api/:userId/balance', async (request, response) => {
    const getUserBalanceController = makeUserBalanceController()
    const { statusCode, body } = await getUserBalanceController.execute(request)

    return response.status(statusCode).send(body)
})

// TRANSACTION API
app.post('/api/transactions', async (request, response) => {
    const createTransactionController = makeCreateTransactionController()
    const { statusCode, body } =
        await createTransactionController.execute(request)

    return response.status(statusCode).send(body)
})

app.get('/api/transactions', async (request, response) => {
    const getTransactionByUserIdController =
        makeGetTransactionByUserIdController()
    const { statusCode, body } =
        await getTransactionByUserIdController.execute(request)

    return response.status(statusCode).send(body)
})

app.patch(
    '/api/transactions/update/:transactionId',
    async (request, response) => {
        const updateTransactionController = makeUpdateTransactionController()
        const { statusCode, body } =
            await updateTransactionController.execute(request)

        return response.status(statusCode).send(body)
    },
)

app.delete(
    '/api/transactions/delete/:transactionId',
    async (request, response) => {
        const deleteTransactionController = makeDeleteTransactionController()
        const { statusCode, body } =
            await deleteTransactionController.execute(request)

        return response.status(statusCode).send(body)
    },
)

app.listen(process.env.PORT, async () =>
    console.log(`Listening on port ${process.env.PORT}`),
)
