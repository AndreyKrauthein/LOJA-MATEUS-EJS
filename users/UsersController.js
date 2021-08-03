const express = require("express")
const router = express.Router()
const User = require("./Users")
const bcrypt = require("bcryptjs")


router.get("/register", (req, res) => {
    res.render("users/register.ejs")
})

router.post("/register", (req, res) => {
    const {name, cnpj, email, password, phone} = req.body
    User.findOne({where: {email: email}})
    .then(user => {
        if(user == undefined){
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)
            User.create({
                name: name,
                cnpj: cnpj,
                email: email,
                password: hash,
                phone: phone,
            }).then((user) => {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    cnpj: user.cnpj,
                    email: user.email,
                    phone: user.phone
                }
                res.redirect("/")
                
            }).catch((err) => {
                res.redirect("/register")
            })
        } else{
            res.redirect("/register")
        }
    })
})

router.get("/login", (req, res) => {
    res.render("users/login.ejs")
})

router.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({
        where: {email: email}
    }).then(user => {
        if (user != undefined){
            let correct = bcrypt.compareSync(password, user.password)

            if (correct){
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    cnpj: user.cnpj,
                    email: user.email,
                    phone: user.phone
                }
                res.redirect("/")
            } else {
                //campos incorretos
                
            }
        } else {
            // nao encontrou email
        }
    })
})

router.get("/logout", (req, res) => {
    req.session.user = undefined
    res.redirect("/")
})

module.exports = router