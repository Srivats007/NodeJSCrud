const express = require('express');
const app = express();
const UserRouter = require('./router/Users.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://test:<Password>@Clusterking.eqmxx.mongodb.net/Clusterking?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}, () => {
    console.log('connected');
});

app.use(express.json());
app.use(express.urlencoded());
app.use('/users', UserRouter);

app.use('', (req, resp) => {
    resp.send('Welcome to the Users Portal');
});

app.listen(3000, () => {
    console.log('Server started at 3000');
});
