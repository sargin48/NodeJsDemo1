
class LcsClass {

    constructor(app, db) {

        app.get('/lcs_statement/:str1/:str2', function(req, res) {
            let X = req.params.str1;
            let Y = req.params.str2;
            
            var m = X.length;
            var n = Y.length;

            var lcsStr = lcs( X, Y, m, n );

             res.json({lcsStr : lcsStr});
         });
    }

    max(a, b) {
        return (a > b)? a : b;
    }

    lcs(req, res, next) {
        var L = new int[m+1,n+1];
        for (var i = 0; i <= m; i++) {
            for (var  j = 0; j <= n; j++) {
                if (i == 0 || j == 0)
                    L[i, j] = 0;
                else if (X[i - 1] == Y[j - 1])
                    L[i, j] = L[i - 1, j - 1] + 1;
                else
                    L[i, j] = max(L[i - 1, j], L[i, j - 1]);
            }
        }
        return L[m, n];
    }
}

module.exports = LcsClass;