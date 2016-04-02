(function (WIN, DOC) {
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
        aqiChartWrap = DOC.getElementById('aqi-chart-wrap');

    // 以下两个函数用于随机模拟生成测试数据
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
    }
    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange() {
        // 确定是否选项发生了变化
        var input = formGraTime.getElementsByTagName('input'),
            checked = null;
        for (var i=0;i<input.length;i++){
            if (input[i].checked){
                checked = input[i];
                break;
            }
        }

        // 设置对应数据
        switch (checked){
            case input[0]:
                pageState.nowGraTime = 'day';
                break;
            case input[1]:
                pageState.nowGraTime = 'week';
                break;
            case input[2]:
                pageState.nowGraTime = 'month';
                break;
        }

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

        // 调用图表渲染函数
        renderChart();
    }

    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    function initGraTimeForm() {
<<<<<<< HEAD
        
=======
        formGraTime.addEventListener('click',function (event) {
            var e = window.event || event;
            if (e.target.nodeName === 'INPUT'){
                graTimeChange();
            }
        },false);
>>>>>>> ea332ae776c9c936d17f3e260503356df2b75621
    }

    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        var str = '';
        for (var city in aqiSourceData){
            str += '<option>'+city+'</option>';
        }
        citySelect.innerHTML = str;
        // 给select设置事件，当选项发生变化时调用函数citySelectChange
        citySelect.addEventListener('click',function () {
            citySelectChange();
        },false)
    }

    //随机颜色
    function getColor() {
        var colors = ['#990000','#993300','#99CCCC','#99CCFF','#CC0000','#CC9900','#CCCCFF','#66CC66','#6699CC','#999999'],
            result = colors[Math.floor(Math.random()*10)];
        return result;
    }

    //获得当个数据条宽度
    function getWidth() {
        
    }
    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        // 将原始的源数据处理成图表需要的数据格式
        // 处理好的数据存到 chartData 中
<<<<<<< HEAD
        var data = {},
            colors = getColor(),
            width = null;
        switch (pageState.nowSelectCity){
            case -1:
                width =
                break;
            case 0:
                break;
            case 1:
                break;
        }
        return data;
=======
        var chartData = {
            city: null,
            singleChart:[]
        },
            count = 0,
            option = citySelect.children,
            obj = {
                width: 0,
                height: 0,
                pos: null,
                color: null
            };
        console.log(aqiSourceData);
        switch (pageState.nowGraTime){
            case 'day':
                city = option[pageState.nowSelectCity+1];
                for (let i in aqiSourceData[city.innerHTML]){
                    count++;
                }
                console.log(count);
                break;
            case 'week':
                city = option[pageState.nowSelectCity+1];
                break;
            case 'month':
                city = option[pageState.nowSelectCity+1];
                break;
        }
>>>>>>> ea332ae776c9c936d17f3e260503356df2b75621
    }

    /**
     * 初始化函数
     */
    function init() {
        initGraTimeForm();
        initCitySelector();
        initAqiChartData();
    }

    init();

})(window,document);
