const mongoose = require("mongoose");


const employeeSchema = new mongoose.Schema({

    employee_id: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: Number,
        required: true,
        min: 10,
    },
    place: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("employees", employeeSchema);