// const mongoose = require('mongoose');

// const connectDb = async () => {
//     try {
//         const { connection } = await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('Database connected at: ' + connection.host);
//     } catch (error) {
//         console.error('Database connection error:', error.message);
//         process.exit(1);  // Exit process if connection fails
//     }
// };

// module.exports = connectDb;


const mongoose = require('mongoose');

const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        return; // Already connected
    }

    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected at: ' + connection.host);
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);  // Exit process if connection fails
    }
};

module.exports = connectDb;
