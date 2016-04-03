(function (WIN, DOC) {
    "use strict";
    /* 数据格式演示
     var aqiSourceData = {
     "北京": {
     "2016-01-01": 10,
     "2016-01-02": 10,
     "2016-01-03": 10,
     "2016-01-04": 10
     }
     };
     */

    // 变量
    var formGraTime = DOC.getElementById('form-gra-time'),
        citySelect = DOC.getElementById('city-select'),
        aqiChartWrap = DOC.getElementsByClassName('aqi-chart-wrap')[0],
        chart = DOC.getElementById('chart'),
        title = DOC.getElementById('title');

    // 以下两个函数用于随机模拟生成测试数据0
    function getDateStr(dat) {
        var y = dat.getFullYear();
        var m = dat.getMonth() + 1;
        m = m < 10 ? '0' + m : m;

        
        var d = dat.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }
    function randomBuildData(seed) {
        var returnData = {};
        var dat = new Date("2016-01-01");
        var datStr = '';
        for (var i = 1; i < 92; i++) {
            datStr = getDateStr(dat);
            returnData[datStr] = Math.ceil(Math.random() * seed);
            dat.setDate(dat.getDate() + 1);
        }
        return returnData;
    }

    var aqiSourceData = {
        "北京": randomBuildData(500),
        "上海": randomBuildData(300),
        "广州": randomBuildData(200),
        "深圳": randomBuildData(100),
        "成都": randomBuildData(300),
        "西安": randomBuildData(500),
        "福州": randomBuildData(100),
        "厦门": randomBuildData(100),
        "沈阳": randomBuildData(500)
    };

// 用于渲染图表的数据
    var chartData = {};

// 记录当前页面的表单选项
    var pageState = {
        nowSelectCity: -1,
        nowGraTime: "day"
    };

    /**
     * 渲染图表
     */
    function renderChart() {
        var width = chartData.width,
            city = chartData.city,
            str = '';
        title.innerHTML = city + '一到三月份空气质量检测报告';
        chartData.single.forEach(function (value) {
            str += '<li style="width:'+width+'px;height: 0;left:'+value.pos+'px;background-color:'+value.color+';" title="空气质量' +
                value.height +
                '毫克每立方米"></li>';
        });
        chart.innerHTML = str;
        setTimeout(function () {
            var child = chart.children;
            for (var i=0;i<child.length;i++){
                console.log(chartData.single[i].height);
                child[i].style.height = chartData.single[i].height+'px';
            }
        },100);
    }
    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange() {
        // 确定是否选项发生了变化
        var input = formGraTime.getElementsByTagName('input');

        for (var i=0;i<input.length;i++){
            if (input[i].checked){
                pageState.nowGraTime = input[i].value;
                break;
            }
        }
        // 设置对应数据
        initAqiChartData();
        // 调用图表渲染函数
        renderChart();
    }

    /**
     * select发生变化时的处理函数
     */
    function citySelectChange() {
        // 确定是否选项发生了变化
        var options = citySelect.children;

        for (var i=0;i<options.length;i++){
            if (options[i].selected){
                pageState.nowSelectCity = i-1;
                break;
            }
        }

        // 设置对应数据
        initAqiChartData();
        // 调用图表渲染函数
        renderChart();
     }

    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    function initGraTimeForm() {
        formGraTime.addEventListener('click',function (event) {
            var e = window.event || event;
            if (e.target.nodeName === 'INPUT'){
                graTimeChange();
            }
        },false);
    }

    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        var str = '',
            count = 0,
            val = 0,
            selected = null,
            child = citySelect.children;

        for (var city in aqiSourceData){
            str += '<option value="'+ count +'">'+city+'</option>';
            count++;
        }
        citySelect.innerHTML = str;
        // 给select设置事件，当选项发生变化时调用函数citySelectChange
        citySelect.addEventListener('click',function () {
            for (var i=0;i<child.length;i++){
                if (child[i].selected){
                    selected = child[i];
                    break;
                }
            }
            console.log(val,selected.value);
            if (val != selected.value){
                citySelectChange();
                val = selected.value;
            }
        },false)
    }


    /**
     * My tools function
     */

    //获得当个数据条宽度
    function getWidth() {
        var sumWidth = parseInt((WIN.getComputedStyle(aqiChartWrap,null).width ? WIN.getComputedStyle(aqiChartWrap,null).width:aqiChartWrap.currentStyle.width)),
            city = getNowCity(),
            date = getNowDate(),
            count = 0;
        for (var key in aqiSourceData[city]){
            count ++;
        }
        switch (date){
            case 'day':
                return sumWidth/2/count;
            case 'week':
                return sumWidth/2/(count/7);
            case 'month':
                return sumWidth/2/Math.round(count/30);
        }
    }

    //获得当个数据条高度
    function getHeight() {
        var date = getNowDate(),
            city = getNowCity(),
            heightData = [];
        for (var key in aqiSourceData[city]){
            heightData.push(aqiSourceData[city][key]);
        }

        switch (date){

            case 'day':
                return heightData;

            case 'week':
                var wHeightData = [],
                    sanpData = [];
                for (var i=0;i<heightData.length;i++){
                    sanpData.push(heightData[i]);
                    if (sanpData.length === 7){
                        var sum = 0;
                        sanpData.forEach(function (value) {
                            sum += value;
                        })
                        wHeightData.push(sum/7);
                        sanpData = [];
                    }
                }
                return wHeightData;

            case 'month':
                var wHeightData = [],
                    sanpData = [];
                for (var i=0;i<heightData.length;i++){
                    sanpData.push(heightData[i]);
                    if (sanpData.length === 30){
                        var sum = 0;
                        sanpData.forEach(function (value) {
                            sum += value;
                        });
                        wHeightData.push(sum/30);
                        sanpData = [];
                    }
                }
                return heightData;
        }
    }

    //获得当个数据条位置
    function getSinglePos() {
        var sumWidth = parseInt((WIN.getComputedStyle(aqiChartWrap,null).width ? WIN.getComputedStyle(aqiChartWrap,null).width:aqiChartWrap.currentStyle.width)),
            date = getNowDate(),
            city = getNowCity(),
            width = getWidth(),
            singlePos = [],
            flage = false,
            num = 0,
            count = 0;
        switch (date){

            case 'day':
                for (var key in aqiSourceData[city]){
                    if (!flage){
                        flage = true;
                        singlePos.push(0);
                    }else{
                        num += (width*2);
                        singlePos.push(num);
                    }
                }
                return singlePos;

            case 'week':
                for (var key in aqiSourceData[city]){
                    if (!flage){
                        flage = true;
                        singlePos.push(0);
                    }else{
                        if (count === 7){
                            num += (width*2);
                            singlePos.push(num);
                            count = 0;
                        }
                    }
                    count++;
                }
                return singlePos;

            case 'month':
                for (var key in aqiSourceData[city]){
                    if (!flage){
                        flage = true;
                        singlePos.push(0);
                    }else{
                        if (count === 31){
                            num += (width*2);
                            singlePos.push(num);
                            count = 0;
                        }
                    }
                    count++;
                }
                return singlePos;
        }
    }

    //随机颜色
    function getColor() {
        var colors = ['#990000','#993300','#99CCCC','#99CCFF','#CC0000','#CC9900','#CCCCFF','#66CC66','#6699CC','#999999'],
            result = colors[Math.floor(Math.random()*10)];
        return result;
    }

    //获取当前date
    function getNowDate() {
        var input = formGraTime.getElementsByTagName('input');
        for (var i=0; i<input.length;i++){
            if (input[i].checked){
                return input[i].value;
            }
        }
    }

    //获得当前选中的city
    function getNowCity() {
        var child = citySelect.children;
        for (var i=0;i<child.length;i++){
            if (child[i].selected){
                return child[i].innerHTML;
            }
        }
    }


    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        // 将原始的源数据处理成图表需要的数据格式
        // 处理好的数据存到 chartData 中
        chartData.city = getNowCity();
        chartData.date = getNowDate();
        chartData.width = getWidth();
        chartData.single = [];
        var arrHeight = getHeight(),
            arrPos = getSinglePos();
        for (var i=0 ;i<arrPos.length;i++){
            var singleData = {};
            singleData.height = arrHeight[i];
            singleData.pos = arrPos[i];
            singleData.color = getColor();
            chartData.single.push(singleData);
        }
    }

    /**
     * 初始化函数
     */
    function init() {
        initGraTimeForm();
        initCitySelector();
        initAqiChartData();
        renderChart();
    }

    init();
})(window,document);
