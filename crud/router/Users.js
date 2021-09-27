const express = require('express');
const UserRouter = express.Router();
const mongoose = require('mongoose');
const Users = require('../model/Users');

UserRouter.post('/', (req, resp) => {
    const user = new Users({
        _id:  new mongoose.Types.ObjectId(), 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        city: req.body.city 
    });

    user.save().then((result) => {
        resp.send({
            status: 'created',
            id: result.id,
            statusCode: 200
        });
    })
    .catch((error) => {
        resp.send({
            status: 'error',
            errorMsg: error
        });
    });
});

UserRouter.get('/', (req, resp) => {
    Users.find().then((result) => {
        console.log(result);
        resp.send({
            users: result,
            statusCode: 200
        });
    })
    .catch((error) => {
        resp.send({
            statusCode: 500,
            errorMsg: error
        });
    });
});

UserRouter.get('/:id', (req, resp) => {
    const userId = req.params.id;
    Users.findById(userId).then((result) => {
        resp.send({
            users: result,
            statusCode: 200
        });
    }).catch((error) => {
        resp.send({
            statusCode: 500,
            errorMsg: error
        });
    });
    
});

UserRouter.put('/:id', (req, resp) => {
    const userId = req.params.id;
    const user = new Users({
        _id:  userId, 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        city: req.body.city 
    });

    Users.findOneAndUpdate(userId, user, (error,updated) => {
        if (updated) {
            resp.send({
                status: 'updated',
                statusCode: 200,
            });
        } else {
            resp.send({
                errorMsg: error,
                statusCode: 200,
            });
        }
    });
});

UserRouter.delete('/:id', (req, resp) => {

    const userId = req.params.id;
    Users.findOneAndRemove(userId).then((result) => {
        resp.send({
            statusCode: 200
        })
    }).catch((error) => {
        resp.send({
            statusCode: 500,
            errorMsg: error
        })
    })
});

module.exports = UserRouter;
