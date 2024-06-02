import {
    CreateTransactionController,
    GetTransactionByIdController,
    UpdateTransactionController,
} from '../../controllers/transaction/index.js'
import {
    CreateTransactionUseCase,
    GetTransactionByIdUseCase,
    UpdateTransactionUseCase,
} from '../../use-cases/transaction/index.js'
import {
    PostgresCreateTransactionRepository,
    PostgresGetTransactionByIdRepository,
    PostgresUpdateTransactionRepository,
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

export const makeUpdateTransactionController = () => {
    const updateTransactionRepository =
        new PostgresUpdateTransactionRepository()
    const getTransactionByIdRepository =
        new PostgresGetTransactionByIdRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const updateTransactionUseCase = new UpdateTransactionUseCase(
        updateTransactionRepository,
        getTransactionByIdRepository,
        getUserByIdRepository,
    )
    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    )

    return updateTransactionController
}
