//Check if user is Loged in
module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!' })
    }

    //If user login is ok then go to next() middleware
    next();
};