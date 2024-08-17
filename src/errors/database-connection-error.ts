import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
    statusCode = 500
    private reason = 'Error connecting to database!!!'
    constructor() {
        super('Error connecting to database!')
    }

    serializeError = () => {
        return {
            errors: [
                {
                    message: this.reason,
                },
            ],
        }
    }
}
