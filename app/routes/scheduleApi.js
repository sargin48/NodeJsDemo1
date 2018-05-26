module.exports = function(app, db, moment) {

    Date.prototype.nextSecondDay= function(day_of_week, weekIndexInMonth){
        var temp = new Date(this), d= temp.getDate(), n= 1;
        while(temp.getDay()!= day_of_week) 
            temp.setDate(++n);
        temp.setDate(n+(7 * (weekIndexInMonth -1)));
        if(d>temp.getDate()){
            temp.setMonth(temp.getMonth()+1, 1);
            return temp.nextSecondDay(day_of_week, weekIndexInMonth);
        }
        return temp.toLocaleDateString();
    }

    app.get('/schedule/:occurance(\\d+)/:every(\\d+)/:starting_date/:index(\\d+)/:day_of_week(\\d+)', function(req, res) {
       
        var dates = new Array(); 
        let occurance = parseInt(req.params.occurance);       
        let every = parseInt(req.params.every);             // 1 ayda 2 ayda x ayda
        let startDate = moment(req.params.starting_date).toDate();   // baslangic
        let weekIndexInMonth = parseInt(req.params.index);          // kacinci hafta
        let dayOfWeek = parseInt(req.params.day_of_week);   // kacinci gun

        let startDateCopy = moment(startDate).clone().toDate();        

        for (var i = 0; i < occurance; i++) {
            var tmpDate1 = startDateCopy.nextSecondDay(dayOfWeek, weekIndexInMonth);
            dates.push(moment(tmpDate1).format("YYYY-MM-DD"));
            startDateCopy = moment(startDateCopy).add(every, 'months').startOf('month').toDate();
        }
        res.json(dates);
    });

};