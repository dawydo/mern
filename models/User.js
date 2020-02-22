const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
})

//Loads schema in to mongoose
mongoose.model('users', userSchema)