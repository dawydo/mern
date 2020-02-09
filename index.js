const express = require('express');
const app = express();

//Express route
app.get('/', (req, res) => {
    res.send({ hi: 'there' })
})


// CHeck if Heroku give port or listen to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT)