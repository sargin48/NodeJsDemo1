module.exports = function(app, db) {

    app.get('/tasks/:task_id', function(req, res) {
        db.Task.findOne({
            where: {
                id: req.params.task_id
            },
            attributes: ['id', 'title', 'description', 'project_id', 'due_date', 'status']
          }).then(function(result) {
                res.json(result);
          });
    });

    app.post('/tasks', function(req, res) {
        db.Task.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            project_id : req.body.project_id
        }).then(function(result){
            res.json(result);
        });
    });

};