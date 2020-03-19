const mongoose = require('mongoose')
const { Schema } = mongoose

const memberSchema = new Schema({
    memberName: String,
    memberSurname: String,
    email: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, //To particular user relationship 
    dateSent: Date, //Record when was sent
    lastResponded: Date //Record when user responded
})

//Load to MangoDB with mangoose
mongoose.model('members', memberSchema)

//Use it in index.js

//Create route in routes/memberRoutes.js