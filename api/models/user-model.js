import mongoose from "mongoose";

const userScehma = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unqiue: true
    },
    email: {
        type: String,
        required: true,
        unqiue: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true}) // this keeps the information  about when the account was created

const User = mongoose.model('User', userScehma)
// The database is estate

export default User ; // Now we can use this model anywhere in this application