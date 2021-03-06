const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./models/User')
require('./models/Survey')
require('./models/Members')
require('./services/passport')


// Connect to Mango
mongoose.connect(keys.mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
 })
.then(() => console.log('----> MangoDB Connected... <-----'))


const app = express();

//Adding req.body
app.use(bodyParser.json())

//app.use is a middleware
app.use(
    cookieSession({
        //Max 30 days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

//app.use is a middleware
app.use(passport.initialize());

//app.use is a middleware
app.use(passport.session());


// Get authRoutes.js auth function
require('./routes/authRoutes')(app);

// Get billingRouts.js export function and call with app object
require('./routes/billingRoutes')(app);

// Get surveyRoutes.js 
require('./routes/surveyRoutes')(app);

// Get membersRoutes.js 
require('./routes/membersRoutes')(app);



if  (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file
    app.use(express.static('client/build'))

    // Express will serve up the index.html file//
    // if it doesn't recognize the route
    const path = require('path');
    
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// Check if Heroku give port or listen to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT)