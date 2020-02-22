const passport = require('passport')

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }))

    //passport.authenticate('google') is a middleware
    //then loging with Google redirects from /auth/google/callback 
    //to redirect to /surveys
    app.get('/auth/google/callback', passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys')
        }
    )

    //On Logout redirects to home page
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/')
    })
    
    //Check from React if user loged-in using reducers/authReducer.js
    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })

}