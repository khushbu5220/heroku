const mongoose = require('mongoose')

const DB = 'mongodb+srv://DevSisodiya:devsisodiya33@@cluster0.hzz5s.mongodb.net/Registration?retryWrites=true&w=majority';

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log(`******************Connection successful******************`);
}).catch((err) => {
    console.log(`No connection`, err);
})