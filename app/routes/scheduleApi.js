module.exports = function(app, db, moment) {

    app.get(
        '/schedule/:occurance(\\d+)/:every(\\d+)/:starting_date/:index(\\d+)/:day_of_week(\\d+)', function(req, res) {
       
        var dates = new Array(); 
        let occurance = parseInt(req.params.occurance)+1;       
        let every = parseInt(req.params.every);             // 1 ayda 2 ayda x ayda
        let startDate = moment(req.params.starting_date);   // baslangic
        let indexDay = parseInt(req.params.index);          // kacinci hafta
        let dayOfWeek = parseInt(req.params.day_of_week);   // kacinci gun
        let startDateCopy = moment(startDate).clone();

        for (var i = 0; i < occurance; i++) {
            if(i == 0){ // girilen tarihteki uygun tarih yoksa

            }
            var testDate = moment().day(dayOfWeek).year(startDateCopy.year).week(indexDay).toDate();
            dates.push(moment(testDate).format("YYYY-MM-DD"));
            startDateCopy = moment(startDateCopy).add(every, 'months');
            
        }
        res.json(dates);
    });

};