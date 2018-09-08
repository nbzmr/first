const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const fetch = require('node-fetch')

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})

// api routes

app.get('/puzzle', (req, res) => {
    fetch('http://puzzle.mead.io/puzzle')
    .then((res) => {
        return res.json()
    })
    .then((puzzle) => {
        console.log(puzzle.puzzle)
        res.send({
            puzzle: puzzle.puzzle + ' (from own server)'
        })
    })
    .catch((error) => {
        console.log(error)
    })  
})

// partials and helpers

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('getUpperCase', (text) => {
    return text.toUpperCase()
})

// middleware

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

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        title: 'projects page',
        pageDescription: 'list of projects'
    })
})

app.use(express.static(__dirname + '/public'))

app.get('*', function(req, res){
    res.send('what???', 404);
})

