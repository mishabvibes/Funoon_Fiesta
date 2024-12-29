const express = require('express');
const app = express();
const cors = require('cors');
const resultRoute = require('./routes/result');
const { errorHandle } = require('./middlewares/errorHandle');
const connectDb = require('./config/db');
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

connectDb()

app.use('/api/result', resultRoute)

app.all('*', (req, res) => {
    res.status(404).json("This page does not exist")
})

app.use(errorHandle)

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;