const _ = require('lodash')
const { Path } = require('path-parser')
const {URL} = require('url');
const mongoose = require('mongoose');
//Check if user logged in with our middleware/requireLogin.js
const requireLogin = require('../middlewares/requireLogin')
// Check if user have enouth Credits
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
//Import email template
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')


//If someone want to create (app.post) survey check if loged in and have Credits
module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        // ManogoDb - find user who created Survey by user id
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false }) //Exclude recipients from request

        res.send(surveys)
    })

    // After user click on email yes/no redirect
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!')
    });

    // Webhooks for SendGrid extracting route 
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
    
        _.chain(req.body)
          .map(({ email, url }) => {
            const match = p.test(new URL(url).pathname);
            if (match) {
              return { email, surveyId: match.surveyId, choice: match.choice };
            }
          })
          .compact()
          .uniqBy('email', 'surveyId')
          .each(({ surveyId, email, choice }) => {
            //Updating MangoDB
            Survey.updateOne( 
              { //Find Survey with this value
                _id: surveyId,
                recipients: {
                  $elemMatch: { email: email, responded: false }
                }
              },
              { // Update Survey with this values
                $inc: { [choice]: 1 }, //Increament choice by 1
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
              }
            ).exec(); //Execute to send to MangoDB
          })
          .value();
    
        res.send({});
      });
    
 
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
       const { title, subject, body, recipients } = req.body;

       // Creating sub-document Schema  
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email })),
            _user: req.user.id,
            dateSent: Date.now()
        })

        // Great place to send an email!
        // survey = subject and recipients
        // surveyTemplate(survey) = body of an email
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            //Save to MangoDb
            await survey.save();

            //After sent email take -1 credit from user 
            req.user.credits -= 1;
            const user = await req.user.save();

            //Send back updated user model
            res.send(user);
        } catch (err) {
            res.status(422).send(err)
        }
 
    });

}