const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    number: {
        type: String,
        unique: true,
        validate: {
            validator: (value) => {
                return value.length === 10;
            },
            message: (props) => {
                return `${props.value} is not valid number. Number length should be 10`}
    },
    }
})

const Note = new mongoose.model('Note', noteSchema)

module.exports = Note



