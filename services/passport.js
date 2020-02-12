const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys')

//Pull our schema from mangoose
//Model class = Collections in MangoDB
const User = mongoose.model('users');

//Serialize user - from user id from MangoDb
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//Desurialize user to MangoDB
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user)
    })
})


passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    (accessToken, refreshToken, profile, done) => {
        //Check if user Id is already registered, that will avoid duplication
        User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if (existingUser) {
                //We already have this record with this id from Google
                done(null, existingUser);
            } else {
                //We don't have this user record. Make new record and save to DB
                // Creates mongo instance
                new User({ googleId: profile.id })
                .save()
                .then(user => done(null, user))
            }
        })
        
    })
);