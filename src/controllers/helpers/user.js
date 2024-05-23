import validator from 'validator'
import { badRequest } from './http.js'

const generateBadRequest = (message) => {
    return badRequest({ message })
}

export const invalidPasswordResponse = () => {
    return generateBadRequest('Password must be at least 6 characters')
}

export const emailAlreadyInUseResponse = () => {
    return generateBadRequest('Invalid e-mail. Please provide a valid one')
}

export const invalidIdResponse = () => {
    return generateBadRequest('The provided ID is not valid.')
}

export const checkIfPasswordIdValid = (password) => password.length > 5

export const checkIfEmailIsValid = (email) => validator.isEmail(email)

export const checkIfIdIsValid = (id) => validator.isUUID(id)
