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
    },
    avatar : {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
}, {timestamps: true}) // this keeps the information  about when the account was created

const User = mongoose.model('User', userScehma)
// The database is estate

export default User ; // Now we can use this model anywhere in this application