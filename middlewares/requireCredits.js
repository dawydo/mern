//Check is user have enouth Credits
module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enouth credits!' })
    }

    //If user login is ok then go to next() middleware
    next();
};