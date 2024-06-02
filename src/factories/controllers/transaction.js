import {
    CreateTransactionController,
    GetTransactionByIdController,
} from '../../controllers/transaction/index.js'
import {
    CreateTransactionUseCase,
    GetTransactionByIdUseCase,
} from '../../use-cases/transaction/index.js'
import {
    PostgresCreateTransactionRepository,
    PostgresGetTransactionByIdRepository,
} from '../../repositories/postgres/transaction/index.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/user/index.js'

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
    )
    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}

export const makeGetTransactionByIdController = () => {
    const getTransactionByIdRepository =
        new PostgresGetTransactionByIdRepository()
    const getTransactionByIdUseCase = new GetTransactionByIdUseCase(
        getTransactionByIdRepository,
    )
    const getTransactionByIdController = new GetTransactionByIdController(
        getTransactionByIdUseCase,
    )

    return getTransactionByIdController
}
