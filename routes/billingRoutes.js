//Install npm stripe - see stripe api docs for Charges
//Install npm install --save body-parser
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')
 
 module.exports = app => {
     app.post('/api/stripe', requireLogin, async (req, res) => {

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        })

        //Using passport initialize and sessions
        //Update credit what user has
        req.user.credits +=5;
        //Save to DB
        const user = await req.user.save()
        //Send request to update user in browser
        res.send(user);
     })
 }