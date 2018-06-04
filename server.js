var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var moment = require('moment')
var db = require('./models')
var path = require('path')
var routes = require('./app/routes/index')
var myService = require('./app/service/myService.js')
var PORT = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/vnd.api+json'}))


app.use(express.static('app/public'))
app.use('/', routes)
require('./app/routes/apiRoutes.js')(app, db)
require('./app/routes/taskApi.js')(app, db)
require('./app/routes/scheduleApi.js')(app, db, moment, myService)
require('./app/routes/lcsApi.js')(app, db, myService)

// db.sequelize.sync().then(function() {
//     app.listen(PORT, () => {
//         console.log('listen port ${PORT}')
//     })
// })
app.listen(PORT, function() {
    console.log('listen port ${PORT}')
})
