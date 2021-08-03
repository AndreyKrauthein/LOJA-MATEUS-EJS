const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const session = require("express-session")
const usersController = require("./users/UsersController")

const User = require("./users/Users")

//session
app.use(session({
    secret:"foo",
    cookie: {maxAge:3000000}
}))

//view engine
app.set("view engine", "ejs")

//file static
app.use(express.static('public'))

//body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//connection
connection
    .authenticate()
    .then(() => {
        console.log("Conexao feita com banco de dados")
    })
    .catch((error) => {
        console.log("Conexao não feita com banco de dados")
    })

//rotas

app.use("/", usersController)

app.get("/", (req, res) => {
    if(req.session.user){
        res.render("authenticate.ejs")
    } else {
        res.render("unauthenticated.ejs")
    }
    
})


app.listen(5000, () => {
    console.log("Server running")
})