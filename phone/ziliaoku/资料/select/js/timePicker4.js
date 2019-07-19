'use strict'

const picker = function (arry,fn) {


    let setInit = new Promise(function (resolve, reject) {
        //插入样式
        var cssText = '.time-box{border:1px solid#F2F2F2;margin-left:10px;height:70px}.time-box>div{width:100%;padding-top:27px}.time_span1{margin-left:10px}.time-box input{border:0px;outline:none;cursor:pointer;width:45%;margin-left:22px}.time-controller{position:fixed;left:0;top:0;z-index:100;width:100%;height:100%;overflow:hidden;text-align:center;font-size:14px;background-color:rgba(37,38,45,.4)}.time-controller-all{position:absolute;z-index:600;bottom:0;width:100%;height:273px;background:#fff}.time-controller-choice{position:relative;height:44px;color:#999}.time-controller-content{position:relative;top:20px;height:173px}.border-bottom,.border-top{position:relative}.border-bottom:after,.border-bottom:before,.border-top:after,.border-top:before{content:"";display:block;position:absolute;-webkit-transform-origin:0 0;transform-origin:0 0}.border-bottom:after{border-bottom:1px solid#ebebeb;left:0;bottom:0;width:100%;-webkit-transform-origin:0 bottom;transform-origin:0 bottom}.cancel{left:0}.sure{right:0;color:#1A8CFF}.time-controller-top{margin:0;line-height:44px;font-weight:400;text-align:center;font-size:16px;color:#333}.cancel,.sure{position:absolute;top:-3px;padding:16px;font-size:14px}.time-package-top{position:absolute;top:0;background:-webkit-linear-gradient(bottom,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));background:linear-gradient(bottom,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8))}.time-package-bottom{position:absolute;bottom:1px;background:-webkit-linear-gradient(top,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8));background:linear-gradient(top,hsla(0,0%,100%,.4),hsla(0,0%,100%,.8))}.time-package-bottom,.time-package-top{z-index:10;width:100%;height:68px;pointer-events:none;-webkit-transform:translateZ(0);transform:translateZ(0)}.border-top:before{border-top:1px solid#ebebeb;left:0;top:0;width:100%}.time-package{display:-webkit-box;display:flex;padding:0 16px}.time{flex:1;flex-basis:1e-9px;width:1%;height:173px;overflow:hidden;font-size:20px}.time:first-child{flex:1.8}.time-list{padding:0;margin-top:68px;line-height:36px;list-style:none;transition-timing-function:cubic-bezier(0.165,0.84,0.44,1)}.diff{transition-duration:150ms}.time-list-item{transition-timing-function:cubic-bezier(0.165,0.84,0.44,1);font-size:14px}';
        var cssEle = document.createElement("style");
        cssEle.type = "text/css";
        cssEle.appendChild(document.createTextNode(cssText));
        document.getElementsByTagName("head")[0].appendChild(cssEle);


        let div = document.createElement("div");

        let box = '<div class="time-controller"><div class="time-controller-all"><div class="time-controller-choice border-bottom"><span class="cancel" style="color: #A7A7A7;">取消</span><span class="sure">确定</span><h1 class="time-controller-top">选择时间</h1></div><div class="time-controller-content"><div class="time-package-top border-bottom"></div><div class="time-package-bottom border-top"></div><div class="time-package"><div class="time"><ul class="time-list diff"></ul></div><div class="time"><ul class="time-list"></ul></div><div class="time"><ul class="time-list"></ul></div></div></div><div class="time-controller-bottom"></div></div></div>';
        div.innerHTML = box;
        document.body.appendChild(div);

        resolve(fn);
    }).then(function onFulfilled(that) {
        datePicker({
            appointDays: 120, //默认可以预约未来7天
            preTime: 20, //默认只能预约10分钟之后,如果两个小时就填120
            disMinute: 1, //分钟的间隔，默认一分钟
            valueArry: arry,
            callback:that
        })


        let valueArry = arry;
        valueArry.forEach(function (index) {
            document.querySelector(index).addEventListener("click", function (e) {

                valueArry.forEach(function (index) {


                    if ("#" + e.target.id == index) {
                        document.querySelector(index).dataset.active = 'true';
                        document.querySelector(".time-controller").style.display = "block"
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.querySelector(index).dataset.active = 'false';
                    }
                })

            }, false);
        })
    })

};

function datePicker(options = {}) {
    //默认设置
    const DEFAULT_OPTIONS = {
        appointDays: 120, //设置可以预约未来7天
        preTime: 20, //设置只能预约20分钟之后,如果两个小时就填120
        disMinute: 10 //分钟的间隔，设置十分钟
    }
    //最终的设置
    const
        CHOICE_OPTIONS = Object.assign({}, options, DEFAULT_OPTIONS),
        app = CHOICE_OPTIONS.appointDays,
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
                preYear = date.getFullYear(),
                preMonth = date.getMonth() + 1,
                preDay = date.getDate()
            switch (i) {
                default:
                    daysArr.push(`${preMonth}月${preDay}日`)
                    break
            }
        }

        //如果是今天的23:30以后,那么今天的就不能选择
        if (currentHours == 23 && currentMinutes >= 60 - pre_min) {
            daysArr.shift()
        }

        for (let i = currentHours; i < 24; i++) {
            hoursArr.push(i)
            initHourArr.push(i)
        }

        //如果当前的分钟超过pre_min(假设pre_min=30),则小时只能从下一个小时选择,当前时间3:40=>4:10
        if (currentMinutes + pre_min > 60 - dism) {
            hoursArr.shift()
            initHourArr.shift()
        }

        //如果hoursArr没有数据,说明今天已经不能预约,明天任何小时都可以预约
        if (!hoursArr.length) {
            for (let h = 0; h < 24; h++) {
                hoursArr.push(h)
                initHourArr.push(h)
            }
        }

        for (let j = Math.ceil(currentMinutes / dism) * dism + pre_min; j < 60; j += dism) {
            minutesArr.push(j)
            initMinuteArr.push(j)
        }

        //如果分钟没有满足条件的,说明现在已经30分以后,小时会自动加1
        if (!minutesArr.length) {
            for (let k = Math.ceil((currentMinutes + pre_min - 60) / dism) * dism; k < 60; k += dism) {
                minutesArr.push(k)
                initMinuteArr.push(k)
            }
        }
    })()

    //初始化数据
    const initData = (f => {
        selectedDay = daysArr[0]
        selectedHour = initHour = initHourArr[0]
        selectedMinute = initMinute = initMinuteArr[0]
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
            timeDayHtml += `<li class="time-list-item">${ele}</li>`
        })

        hoursArr.forEach(ele => {
            timeHourHtml += `<li class="time-list-item">${ele}点</li>`
        })

        minutesArr.forEach(ele => {
            timeMinuteHtml += `<li class="time-list-item">${ele}分</li>`
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
        selectedDay = daysArr[indexDay]
        //今天
        if (indexDay == 0) {
            isToday = true
            //用户选择今天,但是此时的小时已不满足要求,小于当前时间,需要重置初始化小时选项
            hoursArr = initHourArr
            hoursArr.forEach(ele => {
                timeHourHtml += `<li class="time-list-item">${ele}点</li>`
            })
            timeHour.innerHTML = timeHourHtml
            let hindex = selectedHour < initHour ? 0 : hoursArr.indexOf(selectedHour)
            //重置当前选择的时间,从明天滑回选择今天需要重置selectedHour
            selectedHour = hoursArr[hindex]
            new datePicker(timeHour, hindex, indexHour => {
                selectedHour = hoursArr[indexHour]
            })
            //用户选择今天,但是此时的分钟已不满足要求,小于当前时间,需要重置初始化分钟选项
            if (hindex === 0) {
                minutesArr = initMinuteArr
                minutesArr.forEach(ele => {
                    timeMinuteHtml += `<li class="time-list-item">${ele}分</li>`
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
            for (let h = 0; h < 24; h++) {
                hoursArr.push(h)
            }
            let hindex = hoursArr.indexOf(selectedHour)
            hoursArr.forEach((ele) => {
                timeHourHtml += `<li class="time-list-item">${ele}点</li>`
            })
            timeHour.innerHTML = timeHourHtml

            new datePicker(timeHour, hindex, indexHour => {
                selectedHour = hoursArr[indexHour]
            })
            //天数选择影响分钟
            minutesArr = [];
            for (let m = 0; m < 60; m += dism) {
                minutesArr.push(m)
            }
            let mindex = minutesArr.indexOf(selectedMinute)
            timeMinuteHtml = ''
            minutesArr.forEach((ele) => {
                timeMinuteHtml += `<li class="time-list-item">${ele}分</li>`;
            })
            timeMinute.innerHTML = timeMinuteHtml
            new datePicker(timeMinute, mindex, indexMinute => {
                selectedMinute = minutesArr[indexMinute];
            })
        }
    })

    new datePicker(timeHour, 0, indexHour => {
        let timeMinuteHtml = ''
        selectedHour = hoursArr[indexHour]
        //滑到头部,这是要处理分钟是否小于当前时间
        if (indexHour == 0 && isToday) {
            minutesArr = initMinuteArr
            minutesArr.forEach(ele => {
                timeMinuteHtml += `<li class="time-list-item">${ele}分</li>`
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
            for (let m = 0; m < 60; m += dism) {
                minutesArr.push(m)
            }
            let mindex = minutesArr.indexOf(selectedMinute)
            minutesArr.forEach(ele => {
                timeMinuteHtml += `<li class="time-list-item">${ele}分</li>`
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
            day = parseInt(selectedDay.split('月')[1]),
            month = parseInt(selectedDay.split('月')[0].slice(-1)),
            year = (month == 1 && day < app) ? currentYear + 1 : currentYear
        //IOS版本浏览器不兼容new Date('2017-04-11')这种格式化，故用new Date('2017/04/11')
        let timeStamp = new Date(`${year}/${month}/${day} ${hour}:${minute}`).getTime(),
            timeStr = `${selectedDay} ${hour}点${minute}分`

        sessionStorage.setItem('timeStamp', timeStamp)
        sessionStorage.setItem('timeStr', timeStr)

        //$(".time-box input").val(year + "-" + ( month<10?"0"+month:month) + "-" + day + "  " + hour + " : " + minute);

        CHOICE_OPTIONS.valueArry.forEach(function (index) {
            if (document.querySelector(index).dataset.active == 'true') {
                document.querySelector(index).value = (year + "." + (month < 10 ? "0" + month : month) + "." + (day < 10 ? "0" + day : day) + "  " + hour + ":" + (minute == 0 ? "00" : minute));
            }
        })
        CHOICE_OPTIONS.callback();

        document.querySelector('.time-controller').style.display = 'none';
        document.body.style.overflow = 'auto';

    }

    //显示隐藏
    const toggle = e => {
        e.preventDefault()
        e.stopPropagation()
        document.querySelector('.time-controller').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    document.querySelector('.sure').addEventListener('touchend', sureTime, false)
    document.querySelector('.cancel').addEventListener('touchend', toggle, false)

    document.querySelector('.time-controller').style.display = 'none';
    document.body.style.overflow = 'auto';
}


//HTML页面上的ID 
// picker(["#time","#time1"])
// picker(["#starting-time","#ending-time"],function(a){

// },4)






