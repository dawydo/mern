// Keys.js - Figure it out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
    //Return production credential keys
    module.exports = require('./prod')
} else {
    //Return dev credential keys
    module.exports = require('./dev')
}