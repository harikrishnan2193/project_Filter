require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const methodOverride = require('method-override')

require('./DB/connection')

//Routs
const authRouts = require('./Routing/authRouter')
const userRouts = require('./Routing/usersRouter')


const projectFilter = express()

projectFilter.set('view engine', 'ejs')
projectFilter.set('views', path.join(__dirname, 'views'))
projectFilter.use(methodOverride('_method'))

// Express-session middleware
projectFilter.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}))


//middleware
projectFilter.use(bodyParser.urlencoded({ extended: true }))
// projectFilter.use(bodyParser.json())
// connect-flash middleware
projectFilter.use(flash())
// Middleware to pass flash messages to views
projectFilter.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//use Router
projectFilter.use(authRouts)
projectFilter.use(userRouts)

const PORT = process.env.PORT || 4000

projectFilter.listen(PORT,()=>{
    console.log(`Server running on port number: ${PORT}`);  
})

projectFilter.get('/',(req,res)=>{
    // res.send(`<h1>Server running successfully and ready to accept client request </h1>`)
    res.render('landingPage')
})