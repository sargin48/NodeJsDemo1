var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var db = require('./models');
var path = require('path');
var apiRoutes = require('./app/routes/apiRoutes.js');
var taskApi = require('./app/routes/taskApi.js');
var scheduleApi = require('./app/routes/scheduleApi.js');
var lcsApi = require('./app/routes/lcsApi.js');
var routes = require('./app/routes/index');

var PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));


app.use(express.static('app/public'));
app.use('/', routes);
apiRoutes(app, db);
taskApi(app, db);
scheduleApi(app, db, moment);
new lcsApi(app, db);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('listen port ${PORT}');
    });
});
