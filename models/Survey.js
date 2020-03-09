const mongoose = require('mongoose')
const { Schema } = mongoose
const RecipientSchema = require('./Recipient')

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema], //Subdocument
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, //To particular user relationship
    dateSent: Date, //Record when was sent
    lastResponded: Date //Record when user responded
})

//Load to MangoDB with mangoose
mongoose.model('surveys', surveySchema)

//Use it in index.js

//Create route in routes/surveyRoutes.js