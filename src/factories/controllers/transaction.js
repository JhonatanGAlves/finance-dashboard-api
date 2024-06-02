import {
    CreateTransactionController,
    GetTransactionByIdController,
    UpdateTransactionController,
} from '../../controllers/transaction/index.js'
import {
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    GetTransactionByIdUseCase,
    UpdateTransactionUseCase,
} from '../../use-cases/transaction/index.js'
import {
    PostgresCreateTransactionRepository,
    PostgresDeleteTransactionRepository,
    PostgresGetTransactionByIdRepository,
    PostgresUpdateTransactionRepository,
} from '../../repositories/postgres/transaction/index.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/user/index.js'
import { DeleteTransactionController } from '../../controllers/transaction/delete-transaction.js'

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

export const makeDeleteTransactionController = () => {
    const deleteTransactionRepository =
        new PostgresDeleteTransactionRepository()
    const deleteTransactionUseCase = new DeleteTransactionUseCase(
        deleteTransactionRepository,
    )
    const deleteTransactionController = new DeleteTransactionController(
        deleteTransactionUseCase,
    )

    return deleteTransactionController
}
