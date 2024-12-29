const errorHandle = (error, req, res) => {
    const status = error.status || 500;
    let message = error.message || 'please try again...!';

    if (status === 400) {
        message = `${JSON.stringify(error.fields.body)} : This payload is not accepted, Required payloads: ${error.fields.required}`;
    }
    res.status(status).json({ message });
};

module.exports = { errorHandle };
