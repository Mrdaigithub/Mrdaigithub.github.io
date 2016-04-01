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
     任务描述

     参考以下示例代码，原始数据包含几个城市的空气质量指数数据
     用户可以选择查看不同的时间粒度，以选择要查看的空气质量指数是以天为粒度还是以周或月为粒度
     天：显示每天的空气质量指数
     周：以自然周（周一到周日）为粒度，统计一周7天的平均数为这一周的空气质量数值，如果数据中缺少一个自然周的几天，则按剩余天进行计算
     月：以自然月为粒度，统一一个月所有天的平均数为这一个月的空气质量数值
     用户可以通过select切换城市
     通过在"aqi-chart-wrap"里添加DOM，来模拟一个柱状图图表，横轴是时间，纵轴是空气质量指数，参考图（点击打开）。天、周、月的数据只根据用户的选择显示一种。
     天：每天的数据是一个很细的矩形
     周：每周的数据是一个矩形
     月：每周的数据是一个很粗的矩形
     鼠标移动到柱状图的某个柱子时，用title属性提示这个柱子的具体日期和数据
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

    //随机颜色
    function getColor() {
        var colors = ['#990000','#993300','#99CCCC','#99CCFF','#CC0000','#CC9900','#CCCCFF','#66CC66','#6699CC','#999999'],
            result = colors[Math.floor(Math.random()*10)];
        return result;
    }
    /**
     * 渲染图表
     */
    function renderChart() {
        var colors = getColor();
    }
    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange() {
        // 确定是否选项发生了变化

        // 设置对应数据

        // 调用图表渲染函数
        renderChart();
    }

    /**
     * select发生变化时的处理函数
     */
    function citySelectChange() {
        // 确定是否选项发生了变化

        // 设置对应数据

        // 调用图表渲染函数
        renderChart();
    }
    citySelectChange();

    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    function initGraTimeForm() {

    }

    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

        // 给select设置事件，当选项发生变化时调用函数citySelectChange

    }

    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        // 将原始的源数据处理成图表需要的数据格式
        // 处理好的数据存到 chartData 中
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
