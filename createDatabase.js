const mongoose = require('mongoose');
const Subscribers = require('./models/subscribers.js');
const data = require('./data.js');
const dotenv = require('dotenv');

// configuration of env
dotenv.config();

// Connect to DATABASE
const DATABASE_URL = process.env.DATABASE_URI || "mongodb://localhost:27017/subscribers";
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Database created...'))

const refreshAll = async () => {
    await Subscribers.deleteMany({})
    // console.log(connection)
    await Subscribers.insertMany(data)
    await mongoose.disconnect();
}
refreshAll();