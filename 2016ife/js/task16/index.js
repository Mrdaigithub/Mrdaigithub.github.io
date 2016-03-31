/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
let aqiData = {},
    aqiCityInput = document.getElementById('aqi-city-input'),
    aqiValueInput = document.getElementById('aqi-value-input'),
    addBtn = document.getElementById('add-btn'),
    aqiTable = document.getElementById('aqi-table');
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    let cityVal = aqiCityInput.value,
        inputVal = aqiValueInput.value;
    if (/^\s*[\u4e00-\u9fa5a-zA-Z]+\s*$/.test(cityVal) && /^\s*\d+\s*$/.test(inputVal)){
        cityVal = cityVal.trim();
        inputVal = inputVal.trim();
        aqiData[cityVal] = inputVal;
    }else{
        alert('stupid user!');
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    let str = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    for(let key in aqiData){
        str += '<tr><td>'+key+'</td><td>'+aqiData[key]+'</td><td><button>删除</button></td></tr>'
    }
    aqiTable.innerHTML = str;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}


function init() {
    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    aqiTable.addEventListener('click',function (event) {
        let e = window.event || event;
        if (e.target.nodeName === 'BUTTON'){
            delete aqiData[e.target.parentNode.parentNode.firstChild.innerHTML];
            document.getElementsByTagName('tbody')[0].removeChild(e.target.parentNode.parentNode);
        }
    },false);
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addBtn.addEventListener('click',addBtnHandle,false);
}

init();
