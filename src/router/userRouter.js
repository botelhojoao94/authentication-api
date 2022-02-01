const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const UserModel = require('../model/UserModel')

router.post('/check', (req, res) => {
    UserModel.checkUser(req.body, (error, ret) => {
        var response = {}
        if (error) {
            response.erro = true
            response.msg = 'Ocorreu um erro'
            res.json(response);
        }
        else {
            if (Object.keys(ret).length === 0) {
                response.erro = true
                response.msg = 'Usuário ou senha incorretos'
                res.json(response);
            } else {
                bcrypt.compare(req.body.password, ret[0].password, function (err, result) {
                    if (result) {
                        console.log(result)
                        response.erro = false
                        response.msg = 'Usuário logado'
                        response.jwt = jwt.sign({ email: ret[0].email }, 'mysecret')
                        response.user = ret[0].name
                    }
                    else {
                        response.erro = true
                        response.msg = 'Usuário ou senha incorretos'
                    }
                    res.json(response);
                });
            }
        }
    })
})

router.post('/create', (req, res) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        const user = {
            email: req.body.email,
            name: req.body.name,
            password: hash
        }
        UserModel.addUser(user, (error, ret) => {
            let response = {}
            if (error) {
                response.erro = true
                response.msg = 'Este e-mail já foi registado no sistema'
                console.log(error)
            }
            else {
                response.erro = false
                response.msg = 'Usuário criado com sucesso'
            }
            res.json(response);
        })

    });
})

module.exports = router
