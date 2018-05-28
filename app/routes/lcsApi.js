module.exports = function(app, db, myService) {
    app.get('/lcs_statement/:str1/:str2', function(req, res) {
        let X = req.params.str1;
        let Y = req.params.str2;
        
        var m = X.length;
        var n = Y.length;

        var lcsStr = myService.lcs( X, Y, m, n );

         res.json({lcsStr : lcsStr});
     });
};