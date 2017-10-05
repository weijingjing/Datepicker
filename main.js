(function () {

    var datepicker = window.datepicker;
    var monthData;
    var $wrapper;
    datepicker.buildUi = function (year, month) {
        monthData = datepicker.getMonthData(year, month);
        var html = '<div class="ui-datepicker-header">' +
            '<a href="#" class="ui-datepicker-btn ui-datepicker-pre-btn">&lt;</a>' +
            '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
            '<span class="ui-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>' +
            '</div>' +
            '<div class="ui-datepicker-body">' +
            '<div class="ui-datepicker-body">' +
            '<table>' +
                '<thead>' +
                    '<tr>' +
                        '<th>一</th>' +
                        '<th>二</th>' +
                        '<th>三</th>' +
                        '<th>四</th>' +
                        '<th>五</th>' +
                        '<th>六</th>' +
                        '<th>日</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>';

                    for (var i = 0; i < monthData.days.length; i++) {
                        var date = monthData.days[i];
                        if (i % 7 === 0) {
                            html += '<tr>';
                        }
                        html += '<td data-date="'+date.date+'">' + date.showDate + '</td>';
                        if (i % 7 === 6) {
                            html += '</tr>';
                        }
                    }

                html+='</tbody>' +
            '</table>'+
        '</div>';
        return html;
    };

    datepicker.render = function (direction) {

        var year, month;
        // 输入的month year不存在
        if (monthData) {
            year = monthData.year;
            month = monthData.month;
        }

        //上一个月
        if (direction === 'pre') month--;
        // 下一个月
        if (direction === 'next') month++;

        var html = datepicker.buildUi(year, month);
        //document.body.innerHTML = html;
        $wrapper = document.querySelector('.ui-datepicker-wrapper');
        if (!$wrapper) {
            $wrapper = document.createElement('div');
            $wrapper.className = 'ui-datepicker-wrapper';
        }
        $wrapper.innerHTML = html;

        document.body.appendChild($wrapper);
    };

    //  初始化函数
    datepicker.init = function (input) {
        datepicker.render();


        // 初始情况--为点击是关闭抓给你太
        var $input = document.querySelector(input);
        var isOpen = false;
        //console.log($input)

        $input.addEventListener('click', function () {
            if (isOpen) {
                $wrapper.classList.remove(
                    'ui-datepicker-wrapper-show'
                );
                isOpen = false;
            } else {
                $wrapper.classList.add('ui-datepicker-wrapper-show');
                // 开启的时候，计算位置
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;

                $wrapper.style.top = top + height + 2 + 'px';
                $wrapper.style.left = left + 'px';
                isOpen = true;
            }
        }, false);

        //   获取点击事件按钮
        $wrapper.addEventListener('click', function (e) {
            //   直接点击的元素
            var $target = e.target;
            if (!$target.classList.contains('ui-datepicker-btn'))
                return;
            //点击上个月
            if ($target.classList.contains('ui-datepicker-pre-btn')) {
                datepicker.render('pre');
            } else if ($target.classList.contains('ui-datepicker-next-btn')) {
                datepicker.render('next');
            }

        }, false);

        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;
            if ($target.tagName.toLocaleLowerCase() !== 'td') {
                return false;
            }
            var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
            $input.value = format(date);
            $wrapper.classList.remove('ui-datepicker-wrapper-show');
            isOpen = false;
        }, false);
    };

    //将点击的内容放在输入框中
    function format(date) {
        var ret = '';
        var padding = function (num) {
            if (num <= 9) {
                return '0' + num;
            }
            return num;
        };
        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth() + 1) + '-';
        ret += padding(date.getDate());
        return ret;
    }

})();