var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var db = require('./models');
var apiRoutes = require('./app/routes/apiRoutes.js');
var taskApi = require('./app/routes/taskApi.js');
var scheduleApi = require('./app/routes/scheduleApi.js');
var lcsApi = require('./app/routes/lcsApi.js');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));


app.use(express.static('app/public'));
apiRoutes(app, db);
taskApi(app, db);
scheduleApi(app, db, moment);
new lcsApi(app, db);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('listen port ${PORT}');
    });
});
