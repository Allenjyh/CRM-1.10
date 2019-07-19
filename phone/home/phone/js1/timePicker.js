'use strict'

const picker = function (arry,fn,oldYear) {


    let setInit = new Promise(function (resolve, reject) {
        //插入样式
        var cssText = '.time-box{border:1px solid#F2F2F2;margin-left:10px;height:70px}.time-box>div{width:100%;padding-top:27px}.time_span1{margin-left:10px}.time-box input{border:0px;outline:none;cursor:pointer;width:45%;margin-left:22px}.time-controller{position:fixed;left:0;top:0;z-index:100;width:100%;height:100%;overflow:hidden;text-align:center;font-size:14px;background-color:rgba(37,38,45,.4)}.time-controller-all{position:absolute;z-index:600;bottom:0;width:100%;height:273px;background:#fff}.time-controller-choice{position:relative;height:44px;color:#999}.time-controller-content{position:relative;top:20px;height:173px}.border-bottom,.border-top{position:relative}.border-bottom:after,.border-bottom:before,.border-top:after,.border-top:before{content:"";display:block;position:absolute;-webkit-transform-origin:0 0;transform-origin:0 0}.border-bottom:after{border-bottom:1px solid#ebebeb;left:0;bottom:0;width:100%;-webkit-transform-origin:0 bottom;transform-origin:0 bottom}.cancel{left:0}.sure{right:0;color:#1A8CFF}.time-controller-top{margin:0;line-height:44px;font-weight:400;text-align:center;font-size:16px;color:#333}.cancel,.sure{position:absolute;top:-3px;padding:16px;font-size:14px}.time-package-top{position:absolute;top:0;background:-webkit-linear-gradient(bottom,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));background:linear-gradient(bottom,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8))}.time-package-bottom{position:absolute;bottom:1px;background:-webkit-linear-gradient(top,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));background:linear-gradient(top,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8))}.time-package-bottom,.time-package-top{z-index:10;width:100%;height:68px;pointer-events:none;-webkit-transform:translateZ(0);transform:translateZ(0)}.border-top:before{border-top:1px solid#ebebeb;left:0;top:0;width:100%}.time-package{display:-webkit-box;display:flex;padding:0 16px}.time{flex:1;flex-basis:1e-9px;width:1%;height:173px;overflow:hidden;font-size:20px}.time:first-child{flex:1.8}.time-list{padding:0;margin-top:68px;line-height:36px;list-style:none;transition-timing-function:cubic-bezier(0.165,0.84,0.44,1)}.diff{transition-duration:150ms}.time-list-item{transition-timing-function:cubic-bezier(0.165,0.84,0.44,1);font-size:14px}';
        var cssEle = document.createElement("style");
        cssEle.type = "text/css";
        cssEle.appendChild(document.createTextNode(cssText));
        document.getElementsByTagName("head")[0].appendChild(cssEle);


        let div = document.createElement("div");

        let box = '<div class="time-controller"><div class="time-controller-all"><div class="time-controller-choice border-bottom"><span class="cancel">取消</span><span class="sure">确定</span><h1 class="time-controller-top">选择时间</h1></div><div class="time-controller-content"><div class="time-package-top border-bottom"></div><div class="time-package-bottom border-top"></div><div class="time-package"><div class="time"><ul class="time-list diff"></ul></div><div class="time"><ul class="time-list"></ul></div><div class="time"><ul class="time-list"></ul></div></div></div><div class="time-controller-bottom"></div></div></div>';
        div.innerHTML = box;
        document.body.appendChild(div);

        resolve(fn);
    }).then(function onFulfilled(that) {
        datePicker({
            appointDays: 120, //默认可以预约未来X天
            preTime: 40, //默认只能预约10分钟之后,如果两个小时就填120
            disMinute: 1, //分钟的间隔，默认一分钟
            valueArry: arry,
            callback:that,
            oldYear:oldYear
        })


        let valueArry = arry;
        valueArry.forEach(function (index) {
            document.querySelector(index).addEventListener("click", function (e) {

                valueArry.forEach(function (index) {
                    if ("#" + e.target.id == index) {
                        document.querySelector(index).dataset.active = 'true';
                        document.querySelector(".time-controller").style.display = "block"
                    } else {
                        document.querySelector(index).dataset.active = 'false';
                    }
                })

            }, false);
        })
    })

};

function datePicker(options = {}) {

    //计算指定月份有多少天
    const getMonthLength = function(date) {
            var d = new Date(date)
            // 将日期设置为下月一号
            d.setMonth(d.getMonth()+1)
            d.setDate('1')
            // 获取本月最后一天
            d.setDate(d.getDate()-1)



            return d.getDate()
        }

    //默认设置
    const DEFAULT_OPTIONS = {
        appointDays: 1, //设置可以预约未来7天
        preTime: 20, //设置只能预约20分钟之后,如果两个小时就填120
        disMinute: 10 //分钟的间隔，设置十分钟
    }
    //最终的设置
    const
        CHOICE_OPTIONS = Object.assign({}, options, DEFAULT_OPTIONS),
        app = 40,//CHOICE_OPTIONS.appointDays,
        pre_min = CHOICE_OPTIONS.preTime % 60,
        dism = CHOICE_OPTIONS.disMinute,
        pre_hour = Math.floor(DEFAULT_OPTIONS.preTime / 60)

    let daysArr = [],
        hoursArr = [],
        minutesArr = [],

        //最终选择日期
        selectedYear = '',
        selectedDay = '',
        selectedHour = '',
        selectedMinute = '',

        //初始化时间
        initHour, initMinute,
        initHourArr = [],
        initMinuteArr = [],
        isToday = true,

        //初始化日期并获得当前日期
        date = new Date(),
        currentYear = date.getFullYear(),
        currentMonth = date.getMonth() + 1,
        currentDay = date.getDate(),
        currentHours = date.getHours() + pre_hour,
        currentMinutes = date.getMinutes()

    //筛选符合条件的日期
    const filterDate = (f => {
        //获取当前月有多少天
        let DayNumOfMonth = new Date(currentYear, currentMonth, 0).getDate(),
            //获取daysArr
            remainDay = DayNumOfMonth - currentDay,
            timeStamp = Date.now()

        for (let i = 0; i < app; i++) {
            let preStamp = timeStamp + 24 * 60 * 60 * 1000 * i,
                date = new Date(preStamp),

                preYear = date.getFullYear() - i ,
                preMonth = date.getMonth() + 1 + i,
                preDay = date.getDate();

            switch (i) {
                default:
                    daysArr.push(`${preYear}`) //`${preMonth}月${preDay}日`
                    break
            }
        }

        for(let i=0;i<currentMonth;i++){
            hoursArr.push(currentMonth - i);
        }
        for(let i = 0 ; i<currentDay;i++){
            minutesArr.push(currentDay - i)
        }

        //如果是今天的23:30以后,那么今天的就不能选择
        // if (currentHours == 23 && currentMinutes >= 60 - pre_min) {
        //     daysArr.shift()
        // }
        for (let i = 0; i < 12; i++) {
            //hoursArr.push(i+1)
            initHourArr.push(i+1)
        }



        for (let j = 0; j < 31; j ++) {
            //minutesArr.push(j)
            initMinuteArr.push(j+1)
        }
    })()

    //初始化数据
    const initData = (f => {
        selectedDay = daysArr[0]
        selectedHour = currentMonth
        initHour = initHourArr[0]
        selectedMinute =  currentDay
        initMinute = initMinuteArr[0]
    })()

    let time = document.querySelectorAll('.time-list'),
        timeDay = time[0],
        timeHour = time[1],
        timeMinute = time[2]

    //初始化html结构
    const initHtml = (f => {
        let timeDayHtml = '',
            timeHourHtml = '',
            timeMinuteHtml = ''

        daysArr.forEach(ele => {
            timeDayHtml += `<li class="time-list-item">${ele}年</li>`
        })

        hoursArr.forEach(ele => {
            timeHourHtml += `<li class="time-list-item">${ele}月</li>` //点
        })

        minutesArr.forEach(ele => {
            timeMinuteHtml += `<li class="time-list-item">${ele}日</li>` //分
        })

        timeDay.innerHTML = timeDayHtml
        timeHour.innerHTML = timeHourHtml
        timeMinute.innerHTML = timeMinuteHtml
    })()


    //修改选择器风格
    class datePicker {
        constructor(obj, initIndex = 0, callback) {
            this.obj = obj
            this.index = -initIndex
            this.callback = callback
            this.deg = 0 //初始化偏转的角度
            this.length = this.obj.children.length
            this.distance = this.obj.children[0].offsetHeight
            this.ready()
        }

        static setTranslate3d(obj, dis) {
            obj.style.transform = `translate3d(0,${dis}px,0)`
        }

        static setRotateX(obj, index, deg = 25) {
            //设置每个Li的偏转角度
            Array.from(obj).forEach((ele, i) => {
                obj[i].style.transform = `rotateX(${(i + index) * deg}deg)`
            })
        }

        ready() {
            //初始化运动距离
            datePicker.setTranslate3d(this.obj, this.index * this.distance)
            //初始化3D偏转角度
            datePicker.setRotateX(this.obj.children, this.index)
            this.bind(this.obj)
        }

        bind(selector) {
            let iStartPageY = 0,
                step = 1, //弹性系数
                prevPoint = 0,
                speed = 0, //手指离开时候的瞬时速度,速度越大,最后停留的越远
                timer = null,
                length = this.length - 1

            const touchstart = e => {
                //e.preventDefault()
                e.stopPropagation()
                clearInterval(timer)
                iStartPageY = e.changedTouches[0].clientY
                prevPoint = iStartPageY
            }
            const touchmove = e => {
                e.preventDefault()
                e.stopPropagation()
                let iDisY = (e.changedTouches[0].pageY - iStartPageY)
                speed = (e.changedTouches[0].pageY - prevPoint)
                prevPoint = e.changedTouches[0].pageY
                //已滑动在头部或尾部,但是用户还想往上或下滑,这是给一种越往上或下滑越难拖动的体验
                if ((this.index == 0 && iDisY > 0) || (this.index == -length && iDisY < 0)) {
                    step = 1 - Math.abs(iDisY) / selector.clientWidth //根据超出长度计算系数大小，超出的越到 系数越小
                    step = Math.max(step, 0) //系数最小值为0
                    iDisY = parseInt(iDisY * step)
                }
                datePicker.setTranslate3d(selector, this.index * this.distance + iDisY)
                datePicker.setRotateX(this.obj.children, this.index + iDisY / this.distance)
            }
            const touchend = e => {
                e.preventDefault()
                e.stopPropagation()
                let iDisX = e.changedTouches[0].pageY - iStartPageY
                //初速度很小的逻辑处理
                let flag = false
                if (Math.abs(speed) <= 1) {
                    flag = true
                }
                timer = setInterval(f => {
                    if (Math.abs(speed) <= 1) {
                        clearInterval(timer)
                        if (flag) {
                            this.index += Math.round(iDisX / this.distance)
                        }
                        this.index = this.index > 0 ? Math.min(this.index, 0) : Math.max(this.index, -length)
                        this.index = this.index > 0 ? 0 : (this.index < -length ? -length : this.index)
                        selector.style.transitionDuration = '400ms'
                        selector.addEventListener("webkitTransitionEnd", f => {
                            //touchend事件触发后会有一个动画，触发完成后立即清除transition
                            selector.style.transitionDuration = '0ms'
                        })
                        Array.from(selector.children).forEach(ele => {
                            ele.style.transitionDuration = '200ms'
                            ele.addEventListener("webkitTransitionEnd", f => {
                                ele.style.transitionDuration = '0ms'
                            })
                        })
                        datePicker.setTranslate3d(selector, this.index * this.distance)
                        datePicker.setRotateX(this.obj.children, this.index)
                        this.callback && this.callback(Math.abs(this.index))
                    } else {
                        speed *= 0.2
                        iDisX += speed
                        this.index += Math.round(iDisX / this.distance)
                    }
                }, 13);
            }
            selector.addEventListener("touchstart", touchstart, false)
            selector.addEventListener("touchmove", touchmove, false)
            selector.addEventListener("touchend", touchend, false)
        }
    }

    new datePicker(timeDay, 0, indexDay => {
        let timeHourHtml = '',
            timeMinuteHtml = ''

        //没有逗号，这个selectedDay是全局变量。。。

        //console.log(daysArr[indexDay])

        selectedDay = daysArr[indexDay];

        //今天
        if (indexDay == 0) {
            isToday = true
            //用户选择今天,但是此时的小时已不满足要求,小于当前时间,需要重置初始化小时选项
            hoursArr = [];
            hoursArr = (function(currentMonth){
                let _hoursArr = [];
                for(let i = 0 ; i < currentMonth;i++){
                    _hoursArr.push(currentMonth - i)
                }
                return _hoursArr;
            })(currentMonth)

            

            hoursArr.forEach(ele => {
                timeHourHtml += `<li class="time-list-item">${ele}月</li>`
            })
            timeHour.innerHTML = timeHourHtml
            let hindex = selectedHour < initHour ? 0 : hoursArr.indexOf(selectedHour)
            //重置当前选择的时间,从明天滑回选择今天需要重置selectedHour
            selectedHour = hoursArr[hindex]
            new datePicker(timeHour, hindex, indexHour => {
                
                selectedHour = hoursArr[indexHour];
                indexHour = "";
            })
            //用户选择今天,但是此时的分钟已不满足要求,小于当前时间,需要重置初始化分钟选项
            //console.log(indexHour)//currentDay
            if (hindex === 0 || hindex === -1) {
                minutesArr = (function(currentDay){
                    let _hoursArr = [];
                    for(let i = 1 ; i <= currentDay;i++){
                        _hoursArr.push(i)
                    }
                    return _hoursArr;
                })(currentDay)//initMinuteArr


                minutesArr.forEach(ele => {
                    timeMinuteHtml += `<li class="time-list-item">${ele}日</li>`
                });
                timeMinute.innerHTML = timeMinuteHtml
                let mindex = selectedMinute < initMinute ? 0 : minutesArr.indexOf(selectedMinute)
                //重置当前选择的时间,从明天滑回选择今天需要重置selectedMinute
                selectedMinute = minutesArr[mindex]
                new datePicker(timeMinute, mindex, indexMinute => {
                    selectedMinute = minutesArr[indexMinute]
                })
            }
            //明天或者后天
        } else {
            //天数选择影响小时
            isToday = false
            
            hoursArr = []
            for (let h = 0; h < 12; h++) {
                hoursArr.push(h+1)
            }
            let hindex = hoursArr.indexOf(selectedHour)
            hoursArr.forEach((ele) => {
                timeHourHtml += `<li class="time-list-item">${ele}月</li>`
            })
            timeHour.innerHTML = timeHourHtml

            new datePicker(timeHour, hindex, indexHour => {
                selectedHour = hoursArr[indexHour]



                /*minutesArr = []

                for (let m = 0; m < getMonthLength(selectedDay+"-"+selectedHour); m ++) {
                    minutesArr.push(m+1)
                }
                if(minutesArr.length > 0){
                    timeMinuteHtml = "";
                }
                let mindex = minutesArr.indexOf(selectedMinute)
                minutesArr.forEach(ele => {
                    timeMinuteHtml += `<li class="time-list-item">${ele}日</li>`
                });
                timeMinute.innerHTML = timeMinuteHtml*/
            })
            //天数选择影响分钟
            /*minutesArr = [];
            for (let m = 0; m < 31; m ++) {
                minutesArr.push(m+1)
            }
            let mindex = minutesArr.indexOf(selectedMinute)
            timeMinuteHtml = ''
            minutesArr.forEach((ele) => {
                timeMinuteHtml += `<li class="time-list-item">${ele}日</li>`;
            })
            timeMinute.innerHTML = timeMinuteHtml
            new datePicker(timeMinute, mindex, indexMinute => {
                selectedMinute = minutesArr[indexMinute];
            })*/
        }
    })

    new datePicker(timeHour, 0, indexHour => {

        let timeMinuteHtml = '',
            indexSelectMonth = "";
        selectedHour = hoursArr[indexHour];

        let arrays = [1,2,3,4,5,6,7,8,9,10,11,12];

            function contains(arrays, obj) {
                var i = arrays.length;
                while (i--) {
                    if (arrays[i] === obj) {
                        return i;
                    }
                }
                return false;
            }



        //滑到头部,这是要处理分钟是否小于当前时间
        if (isToday && (indexHour+parseInt(contains(arrays,parseInt(hoursArr[0])))+1) ==  currentMonth) {


                minutesArr = (function(currentDay){
                    let _hoursArr = [];
                    for(let i = 1 ; i <= currentDay;i++){
                        /*for(let i = currentDay ; i < getMonthLength(selectedDay+"-"+(parseInt(indexHour)+parseInt(contains(arrays,parseInt(hoursArr[0])))+1))+1;i++){*/
                        _hoursArr.push(i)
                    }
                    return _hoursArr;
                })(currentDay)


    
                minutesArr.forEach(ele => {
                    timeMinuteHtml += `<li class="time-list-item">${ele}日</li>`
                });
                timeMinute.innerHTML = timeMinuteHtml
                let mindex = selectedMinute < initMinute ? 0 : minutesArr.indexOf(selectedMinute)
                //重置当前选择的时间,从明天滑回选择今天需要重置selectedMinute
                selectedMinute = minutesArr[mindex]
                new datePicker(timeMinute, mindex, indexMinute => {
                    selectedMinute = minutesArr[indexMinute]
                })
            
        } else {

            minutesArr = []
            for (let m = 0; m < 31; m ++) {//getMonthLength(selectedDay+"-"+selectedHour)
                minutesArr.push(m+1)
            }
            let mindex = minutesArr.indexOf(selectedMinute)
            minutesArr.forEach(ele => {
                timeMinuteHtml += `<li class="time-list-item">${ele}日</li>`
            });
            timeMinute.innerHTML = timeMinuteHtml
            new datePicker(timeMinute, mindex, indexMinute => {
                selectedMinute = minutesArr[indexMinute]
            })
        }
        
    })

    new datePicker(timeMinute, 0, indexMinute => {
        selectedMinute = minutesArr[indexMinute]
    })
    

    //获得最后选择的日期
    const sureTime = e => {
        e.preventDefault()
        e.stopPropagation()

        const minute = selectedMinute,
            hour = selectedHour,
            day = parseInt(selectedHour?selectedMinute:currentDay),
            month = parseInt(selectedHour?selectedHour:currentMonth),
            year = (month == 1 && day < app) ? currentYear + 1 : currentYear;



        //IOS版本浏览器不兼容new Date('2017-04-11')这种格式化，故用new Date('2017/04/11')
        let timeStamp = new Date(`${year}/${month}/${day} ${hour}:${minute}`).getTime(),
            timeStr = `${selectedDay} ${hour}点${minute}分`

        sessionStorage.setItem('timeStamp', timeStamp)
        sessionStorage.setItem('timeStr', timeStr)

        CHOICE_OPTIONS.valueArry.forEach(function (index) {
            if (document.querySelector(index).dataset.active == 'true') {
                document.querySelector(index).value = (selectedDay + "." + (month < 10 ? "0" + month : month) + "." + (day < 10 ? "0" + day : day));
            }
        });


        CHOICE_OPTIONS.callback()
        document.querySelector('.time-controller').style.display = 'none'

    }

    //显示隐藏
    const toggle = e => {
        e.preventDefault()
        e.stopPropagation()
        document.querySelector('.time-controller').style.display = 'none'
    }
    document.querySelector('.sure').addEventListener('touchend', sureTime, false)
    document.querySelector('.cancel').addEventListener('touchend', toggle, false)

    document.querySelector('.time-controller').style.display = 'none'
}

// picker(["#time","#time1"])





