const ERROR_MESSAGES = {
    VALIDATION: 'Validation error',
    DATABASE: 'Database error',
    AUTHENTICATION: 'Authentication error',
    DEFAULT: 'Please try again later'
};

const errorHandle = (error, req, res, next) => {
    console.error({
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        method: req.method,
        errorMessage: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });

    const status = error.status || 500;
    let message = error.message || ERROR_MESSAGES.DEFAULT;

    if (status === 400 && error.fields) {
        message = formatValidationError(error.fields);
    }

    if (error.name === 'MongoError' || error.name === 'ValidationError') {
        status = 400;
        message = formatDatabaseError(error);
    }

    res.status(status).json({
        success: false,
        message,
        errors: error.errors || undefined,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};

const formatValidationError = (fields) => {
    const invalidFields = JSON.stringify(fields.body);
    const requiredFields = fields.required;
    return `Invalid payload: ${invalidFields}. Required fields: ${requiredFields}`;
};

const formatDatabaseError = (error) => {
    if (error.code === 11000) {
        return `Duplicate entry found: ${Object.keys(error.keyValue).join(', ')}`;
    }
    return error.message;
};

class AppError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { 
    errorHandle,
    AppError
};