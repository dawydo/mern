const mongoose = require('mongoose');
//Check if user logged in with our middleware/requireLogin.js
const requireLogin = require('../middlewares/requireLogin')
// Check if user have enouth Credits
const requireCredits = require('../middlewares/requireCredits')

const Members = mongoose.model('members')


module.exports = app => {
    // @route   GET api/members
    // @desc    Get All users members
    // @access  Private
    // app.get('/api/members', requireLogin, requireCredits, async (req, res) => {
    //     const members = await Members.find()
    //     return res.status(200).send(members) 
    // })
    app.get('/api/members', requireLogin, async (req, res) => {
        // ManogoDb - find user who created Survey by user id
        const members = await Members.find({ _user: req.user.id })
        return res.status(200).send(members)
        //res.send(members) 
    })

    // @desc  Get Member By ID
    app.get('/api/members/:id', requireLogin, async (req, res) => {
        const _id = req.params.id
        const members = await Members.findById({ _id})
        return res.status(200).send(members)
        
    })
    

    // @route   POST api/members 
    // @desc    Add new members
    // @access  Private
    app.post('/api/members', requireLogin, requireCredits, async (req, res) => {
        res.send(req.body);
 
         try {
            //Save to MangoDb
            await members.save();

        } catch (err) {
            res.status(422).send(err)
        }
 
     });

    // @route   PUT api/members/:id
    // @desc    Update members
    // @access  Private
    app.put('/api/members/:id', async (req, res) => {
        // ManogoDb - find user who created Survey by user id
       
        
    })

    // @route   DELETE api/members/:id
    // @desc    Delete members
    // @access  Private
    // app.delete('/api/members/:id', (req, res) => {
    //     res.send('Delete members')
    // })

    app.get('/api/members/delete:id', requireLogin, async (req, res) => {
        // ManogoDb - find user who created Survey by user id
        const members = await Members.findByIdAndRemove({ _user: req.params.id })
        res.redirect('/members')
        //return res.status(200).send(members)
        res.send(members) 
    })
}
