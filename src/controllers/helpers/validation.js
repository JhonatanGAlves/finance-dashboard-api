import validator from 'validator'

import { badRequest } from './http.js'

export const generateBadRequest = (message) => {
    return badRequest({ message })
}

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () => {
    return generateBadRequest('The provided ID is not valid.')
}
