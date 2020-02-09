const express = require('express');
const app = express();

//Express route
app.get('/', (req, res) => {
    res.send({ day: 'Is best' })
})


// CHeck if Heroku give port or listen to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT)