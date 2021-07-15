const mongoose = require('mongoose')


const test = mongoose.Schema({
    question: {
        type: String,
        unique: true
    },
    image:{
        type: String, 
    },
    answer: {
        type: String,
        require: true
    }
})

const Test_mentorSchema = mongoose.Schema({
    subject: {
        type: String
    },
    test: [test]
},{
    collection: 'test_mentor'
})

const model = mongoose.model('test_mentorSchema', Test_mentorSchema)

module.exports = model