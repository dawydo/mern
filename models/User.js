const mongoose = require('mongoose')
const { Schema } = mongoose

// Define our model
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 },
    name: String,
    email: { type: String, unique: true, lowercase: true}, //Use unique to make unique account
    password: String,
    date: { type: String, default: Date.now }
})

//Loads schema in to mongoose
mongoose.model('users', userSchema)