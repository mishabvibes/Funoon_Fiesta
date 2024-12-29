// const errorHandle = (error, req, res) => {
//     const status = error.status || 500;
//     let message = error.message || 'please try again...!';

//     if (status === 400) {
//         message = `${JSON.stringify(error.fields.body)} : This payload is not accepted, Required payloads: ${error.fields.required}`;
//     }
//     res.status(status).json({ message });
// };

// module.exports = { errorHandle };




const errorHandle = (error, req, res, next) => {
    const status = error.status || 500;
    let message = error.message || 'An unexpected error occurred.';

    // Custom error formatting for specific status codes
    if (status === 400 && error.fields) {
        message = `${JSON.stringify(error.fields.body)}: Invalid payload. Required fields: ${error.fields.required}`;
    }

    res.status(status).json({ message });
};

module.exports = { errorHandle };
