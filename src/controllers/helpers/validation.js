import validator from 'validator'

import { badRequest } from './http.js'

export const generateBadRequest = (message) => {
    return badRequest({ message })
}

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () => {
    return generateBadRequest('The provided ID is not valid.')
}

export const requiredFieldIsMissingResponse = (field) => {
    return badRequest({
        message: `The field ${field} is required.`,
    })
}

export const checkIfIsString = (value) => typeof value === 'string'

export const validateRequiredFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const isMissingField = !params[field]
        const isEmptyField =
            checkIfIsString(params[field]) &&
            validator.isEmpty(params[field], {
                ignore_whitespace: true,
            })

        if (isMissingField || isEmptyField) {
            return {
                missingField: field,
                ok: false,
            }
        }
    }

    return {
        missingField: undefined,
        ok: true,
    }
}
