(function(){
    //核心函数
    var datepicker = {};

    datepicker.getMonthData = function(year,month){
        var ret = [];

        if(!year || !month){
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth()+1;
        }

        var firstDay = new Date(year,month - 1,1);
        // 获取第一天的星期，如果为周日要置为7
        var firstDayWeekDay = firstDay.getDay();
        if(firstDayWeekDay === 0){
            firstDayWeekDay = 7;
        }
        //防止输入月份越界
        year = firstDay.getFullYear();
        month = firstDay.getMonth()+1;

        //获取上个月的最后一天
        var lastDayOfLastMonth = new Date(year,month - 1,0);
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
 
        //日历第一行显示多少个上个月的日期--当月最后一天
        var preMonthDayCount = firstDayWeekDay - 1;//上个月的天数
        var lastDay = new Date(year,month,0);
        var lastDate = lastDay.getDate();


        //获取当月的每一天
        for(var i=0;i<7*6;i++){
            var date = i + 1 - preMonthDayCount;
            var showDate = date;
            var thisMonth = month;
            //上个月
            if(date <= 0){
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            }else if(date > lastDate){
                //下个月
                thisMonth = month + 1;
                showDate = showDate -lastDate;
            }
            if(thisMonth === 0) this.month = 12;
            if(thisMonth === 13) this.month = 1;

            //将结果返回到结果树中输出--日期数组
            ret.push(
                {
                  month: thisMonth,
                  date:date,
                  showDate:showDate
                });
        }
        return {
            year: year,
            month: month,
            days: ret
        };

    };


    window.datepicker = datepicker;
})();