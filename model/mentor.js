const mongoose = require('mongoose')


const MentorSchema = mongoose.Schema({
    username: {
        type: String
    },
    email:{
        type: String,
        unique:[true, "Email is already present"],
    },
    phone: {
        type:Number,
        unique: [true, "Phone no. is already present"]
    },
    address:{
        type: String
    },
    password: {
        type: String
    },
    exam: {
        type: String
    },
    subject: {
        type: String
    }
}, {
    collection: 'mentors'
})

const model = mongoose.model('MentorSchema', MentorSchema)

module.exports = model