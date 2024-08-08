import { notFound } from './http.js'
import { generateBadRequest } from './validation.js'

export const invalidPasswordResponse = () => {
    return generateBadRequest('Password must be at least 6 characters')
}

export const emailAlreadyInUseResponse = () => {
    return generateBadRequest('Invalid e-mail. Please provide a valid one')
}

export const notFoundResponse = () => {
    return notFound({
        message: 'User not found.',
    })
}
