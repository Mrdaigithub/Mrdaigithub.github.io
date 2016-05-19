import '../sass/weather.scss';
import '../../node_modules/zepto/zepto.min.js';

((DOC,WIN)=>{

    class QueryWeather{
        constructor(city){
            this.city = city;
            this.weatherDes = {
                晴:'&#xe6f5;',
                多云:'&#xe6f3;',
                晴间多云:'&#xe6f3;',
                阴:'&#xe6f8;',
                小雨:'&#xe6f7;',
                中雨:'&#xe6fd;',
                阵雨:'&#xe6fb;',
                雷阵雨:'&#xe6f4;',
                暴雨:'&#xe6f2;',
                小雪:'&#xe6f6;',
                中雪:'&#xe6fc;',
                阵雪:'&#xe6fa;',
                暴雪:'&#xe6f1;',
                霾:'&#xe683;',
                沙尘暴:'&#xe685;',
                霜:'&#xe67e;'
            }
        }


        /**
         * 得到天气JSON数据,将数据放到this.data
         */
        getWeatherData(callback){
            $.getJSON('http://139.129.21.118/celecare/server/weather.php?city=' + this.city,(data)=>{
                console.log(data);
                if (callback){
                    hideLoad($('.weui_toast')[0]);
                    callback(data['HeWeather data service 3.0'][0]);
                }
            });
        }

        /**
         * 处理天气数据
         * @param sourceData
         * @param callback
         */
        treatData(sourceData,callback) {
            let weatherData = {
                city: sourceData.basic.city,
                upDate: sourceData.basic.update.loc.replace(/\d+-\d+-\d+/,''),
                today: {
                    tmp: {
                        averageTmp: sourceData.now.fl + '°',
                        maxTmp: sourceData.daily_forecast[0].tmp.max + '°',
                        minTmp: sourceData.daily_forecast[0].tmp.min + '°'
                    },
                    weatherDes: sourceData.now.cond.txt,
                    hum: sourceData.now.hum + '%',
                    wind: {
                        dir: sourceData.now.wind.dir,
                        sc: sourceData.now.wind.sc + '级'
                    },
                    sun: {
                        sr: sourceData.daily_forecast[0].astro.sr,
                        ss: sourceData.daily_forecast[0].astro.ss
                    },
                    life: {
                        washCar: sourceData.suggestion.cw.brf + '洗车',
                        play: sourceData.suggestion.trav.brf + '游玩',
                        uv: sourceData.suggestion.uv.brf + '紫外线'
                    }
                },
                week : []
            };
            $.each(sourceData.daily_forecast,(key,val)=>{
                var obj = {
                    date: val.date.replace(/\d+-/,'').replace(/-/,'/'),
                    cond: val.cond.txt_d,
                    windName: val.wind.dir,
                    windLev: val.wind.sc
                };
                weatherData.week.push(obj);
            });
            if (callback){
                callback(weatherData);
            }
        }

        /**
         * 得到要修改的doms
         * @returns {{city: (ZeptoCollection|jQuery|HTMLElement), update: (ZeptoCollection|jQuery|HTMLElement), today: {averageTmp: (ZeptoCollection|jQuery|HTMLElement), rain: (ZeptoCollection|jQuery|HTMLElement), maxTmp: (ZeptoCollection|jQuery|HTMLElement), minTmp: (ZeptoCollection|jQuery|HTMLElement), hum: (ZeptoCollection|jQuery|HTMLElement), windName: (ZeptoCollection|jQuery|HTMLElement), windVal: (ZeptoCollection|jQuery|HTMLElement), sunOut: (ZeptoCollection|jQuery|HTMLElement), sunBack: (ZeptoCollection|jQuery|HTMLElement)}, life: {washCar: (ZeptoCollection|jQuery|HTMLElement), play: (ZeptoCollection|jQuery|HTMLElement), uv: (ZeptoCollection|jQuery|HTMLElement)}, future: {date: (ZeptoCollection|jQuery|HTMLElement), weather: (ZeptoCollection|jQuery|HTMLElement), windName: (ZeptoCollection|jQuery|HTMLElement), windLev: (ZeptoCollection|jQuery|HTMLElement)}}}
         */
        getDoms(){
            return {
                city: $('#cityName'),
                update: $('.update time'),
                today: {
                    averageTmp: $('.averageTmp'),
                    rain: $('.rain'),
                    maxTmp: $('.tmp .maxTmp'),
                    minTmp: $('.tmp .minTmp'),
                    hum: $('.hum .humVal'),
                    windName: $('.wind .windName'),
                    windVal: $('.wind .windVal'),
                    sunOut: $('.sun .outTime'),
                    sunBack: $('.sun .backTime')
                },
                life: {
                    washCar: $('.text')[0],
                    play: $('.text')[1],
                    uv: $('.text')[2]
                },
                future: {
                    date: $('#future time'),
                    weatherDes: $('#future i'),
                    windName: $('#future .cloudName'),
                    windLev: $('#future .cloudLev')
                }
            };
        }

        render(datas,doms){

            doms.city.html(datas.city);
            doms.update.html(datas.upDate);

            doms.today.averageTmp.html(datas.today.tmp.averageTmp);
            doms.today.rain.html(datas.today.weatherDes);
            doms.today.maxTmp.html(datas.today.tmp.maxTmp);
            doms.today.minTmp.html(datas.today.tmp.minTmp);
            doms.today.hum.html(datas.today.hum);
            doms.today.windName.html(datas.today.wind.dir);
            doms.today.windVal.html(datas.today.wind.sc);
            doms.today.sunOut.html(datas.today.sun.sr);
            doms.today.sunBack.html(datas.today.sun.ss);

            doms.life.washCar.innerHTML = datas.today.life.washCar;
            doms.life.play.innerHTML = datas.today.life.play;
            doms.life.uv.innerHTML = datas.today.life.uv;

            $.each(doms.future.date,(key,val)=>{
                doms.future.date[key].innerHTML = datas.week[key].date;
                doms.future.windName[key].innerHTML = datas.week[key].windName;
                doms.future.windLev[key].innerHTML = datas.week[key].windLev;
                doms.future.weatherDes[key].innerHTML = this.weatherDes[datas.week[key].cond];
            });
        }

        /**
         * 初始化
         */
        init(){
            this.getWeatherData((jsonData)=>{
                // 得到天气数据
                this.treatData(jsonData,(weatherData)=>{
                    this.render(weatherData,this.getDoms());
                });
            });
        }

    }


    /**
     * 得到经纬度
     * @param callback
     * @returns {boolean}
     */
    let getGeo = (callback)=>{

        /**
         * 判断h5的地理为位置是否可用
         */
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((e)=>{
                //得到城市名
                if (callback){
                    callback(e.coords.longitude,e.coords.latitude);
                }
            },(err)=>{
                switch (err.code){
                    case err.PERMISSION_DENIED:
                        dialog("用户拒绝对获取地理位置的请求。")
                        break;
                    case err.POSITION_UNAVAILABLE:
                        dialog("位置信息是不可用的。")
                        break;
                    case err.TIMEOUT:
                        dialog("请求用户地理位置超时。")
                        break;
                    case err.UNKNOWN_ERROR:
                        dialog("未知错误。")
                        break;
                }
            });
        }else{
            alert('改换浏览器了~');
            return false;
        }
    };

    /**
     * 通过经纬度得到城市名
     * @param longitude
     * @param latitude
     * @param callback
     */
    let getCityName = (longitude,latitude,callback)=>{
        let point = new BMap.Point(longitude,latitude),
            gc = new BMap.Geocoder();
        gc.getLocation(point, (rs)=>{
            let addComp = rs.addressComponents;
            if (callback){
                callback(addComp.city);
            }
            return addComp.city;
        })
    };

    /**
     * 隐藏加载的图标
     * @param dom
     * @returns {*}
     */
    let hideLoad = (dom)=>{
        if (!(dom.style.display === 'none')){
            dom.style.display = 'none';
        }
        return dom;
    };

    /**
     * 消息提示
     * @param meg
     */
    let dialog = (meg)=>{
        $('.weui_dialog_alert')[0].style.display = 'block';
        $('.weui_dialog_bd').html(meg);
        $('.weui_btn_dialog').one('click',(e)=>{
            $('.weui_dialog_alert')[0].style.display = 'none';
        })
    }


    /**
     * 入口
     */
    (()=>{
        getGeo((x,y)=>{
            getCityName(x,y,(city)=>{
                let loc = new QueryWeather(city.substr(0,city.length-1));
                loc.init();
            })
        });
    })();

})(document,window);