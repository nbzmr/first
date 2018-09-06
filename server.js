const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

// partials and helpers

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('getUpperCase', (text) => {
    return text.toUpperCase()
})

// middlewares

app.use((req, res, next) => {
    const time = new Date().toString()
    const method = req.method
    const url = req.url
    const logMessage = `${time} ${method} ${url} \n`
    fs.appendFile('requestLog.log', logMessage, (error) => {
        console.log('error')
    })
    next()
})

// all routes

// another comment

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'home page',
        welcomeMessage: 'wellcome to the home page',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'this is about page',
    })
})

app.get('/error', (req, res) => {
    res.send({
        message: 'your request is not acceptable'
    })
})

app.use(express.static(__dirname + '/public'))

app.get('*', function(req, res){
    res.send('what???', 404);
});

app.listen(3000, () => {
    console.log('server is up on port 3000' )
})

