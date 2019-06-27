
// 将这些段代码单独放到一个js文件，通过myJs.method即可调用
// 获取格式化时间
var dateStr = myJs.getDates(dt);    //调用
var myJs = {

    num : function (s) {
        return s < 10 ? '0' + s: s;
    },
    _GetDateStr : function (sj_str) { 
        var dd =[];
        dd =new Date(sj_str*1000).toLocaleDateString().split('/');
            var y = dd[0]; 
            var m = dd[1];//获取当前月份的日期 
            var d = dd[2]; 
            return y+"."+myJs.num(m)+"."+myJs.num(d); 
    },
        // console.log(_GetDateStr(1548604800)); 

    /*
     * 格式化日期
     * @param dt 日期对象
     * @returns {string} 返回值是格式化的字符串日期
     */
    getDates: function(dt) {
        var str = ""; //存储时间的字符串
        //获取年
        var year = dt.getFullYear();
        //获取月
        var month = dt.getMonth() + 1;
        //获取日
        var day = dt.getDate();
        //获取小时
        var hour = dt.getHours();
        //获取分钟
        var min = dt.getMinutes();
        //获取秒
        var sec = dt.getSeconds();
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        str = year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + sec;
        return str;
    },
    /**
     * 获取指定标签对象
     * @param id 标签的id属性值
     * @returns {Element}根据id属性值返回指定标签对象
     */
    my$: function(id) {
        return document.getElementById(id);
    },
    /**
     * 设置元素的文本内容
     * @param element 任意元素
     * @param text 任意文本内容
     */
    setInnerText: function(element, text) {
        if (typeof(element.textContent) == "undefined") {
            element.innerText = text;
        } else {
            element.textContent = text;
        }
    },
    /**
     * 获取元素的文本内容
     * @param element 任意元素
     * @returns {*} 任意元素中的文本内容
     */
    getInnerText: function(element) {
        if (typeof(element.textContent) == "undefined") {
            return element.innerText;
        } else {
            return element.textContent;
        }
    },
    /**
     * 获取父级元素中的第一个子元素
     * @param element 父级元素
     * @returns {*} 父级元素中的子级元素
     */
    getFirstElement: function(element) {
        if (element.firstElementChild) {
            return element.firstElementChild;
        } else {
            var node = element.firstChild;
            while (node && node.nodeType != 1) {
                node = node.nextSibling;
            }
            return node;
        }
    },
    /**
     * 获取父级元素中的最后一个子元素
     * @param element 父级元素
     * @returns {*} 最后一个子元素
     */
    getLastElement: function(element) {
        if (element.lastElementChild) {
            return element.lastElementChild;
        } else {
            var node = element.lastChild;
            while (node && node.nodeType != 1) {
                node = node.previousSibling;
            }
            return node;
        }
    },
    /**
     * 获取某个元素的前一个兄弟元素
     * @param element 某个元素
     * @returns {*} 前一个兄弟元素
     */
    getPreviousElement: function(element) {
        if (element.previousElementSibling) {
            return element.previousElementSibling
        } else {
            var node = element.previousSibling;
            while (node && node.nodeType != 1) {
                node = node.previousSibling;
            }
            return node;
        }
    },
    /**
     * 获取某个元素的后一个兄弟元素
     * @param element 某个元素
     * @returns {*} 后一个兄弟元素
     */
    getNextElement: function(element) {
        if (element.nextElementSibling) {
            return element.nextElementSibling
        } else {
            var node = element.nextSibling;
            while (node && node.nodeType != 1) {
                node = node.nextSibling;
            }
            return node;
        }
    },
    /**
     * 获取某个元素的所有兄弟元素
     * @param element 某个元素
     * @returns {Array} 兄弟元素
     */
    getSiblings: function(element) {
        if (!element) return;
        var elements = [];
        var ele = element.previousSibling;
        while (ele) {
            if (ele.nodeType === 1) {
                elements.push(ele);
            }
            ele = ele.previousSibling;
        }
        ele = element.nextSibling;
        while (ele) {
            if (ele.nodeType === 1) {
                elements.push(ele);

            }
            ele = ele.nextSibling;
        }
        return elements;
    },
    /**
     * 返回当前浏览器是什么类型的浏览器
     */
    userBrowser: function() {
        var browserName = navigator.userAgent.toLowerCase();
        if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
            console.log("IE");
        } else if (/firefox/i.test(browserName)) {
            console.log("Firefox");
        } else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
            console.log("Chrome");
        } else if (/opera/i.test(browserName)) {
            console.log("Opera");
        } else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
            console.log("Safari");
        } else {
            console.log("不知道什么鬼!");
        }
    },

    //缓动动画函数的封装
    //获取元素样式计算后的值
    getStyle: function(element, attr) {
        return element.currentStyle ? element.currentStyle["attr"] : window.getComputedStyle(element, null)[attr];
    },
    //缓动动画函数的封装
    animate: function(element, json, fn) {
        clearInterval(element.timeId);
        element.timeId = setInterval(function() {
            var flag = true;
            for (var attr in json) {
                if (attr == "opacity") {
                    var current = getStyle(element, attr) * 100;
                    var target = json[attr] * 100;
                    //每次移动的步数
                    var step = (target - current) / 10;
                    //每次移动步数都是整数(比较大的数字)
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    current += step; //移动后的当前的像素
                    element.style[attr] = current / 100;
                } else if (attr == "zIndex") {
                    element.style[attr] = json[attr];
                } else {
                    var current = parseInt(getStyle(element, attr));
                    var target = json[attr];
                    //每次移动的步数
                    var step = (target - current) / 10;
                    //每次移动步数都是整数(比较大的数字)
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    current += step; //移动后的当前的像素
                    element.style[attr] = current + "px";
                }
                if (current != target) { //到达目标后停止计时器
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(element.timeId); //清理计时器
                if (fn) {
                    fn();
                }
            }
            //console.log("target:" + target + ",current:" + current + ",step:" + step);
        }, 20);
    },

    /*去除空格*/
    //  type 1-所有空格  2-前后空格  3-前空格 4-后空格
    trim: function(str, type) {
        switch (type) {
            case 1:
                return str.replace(/\s+/g, "");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, "");
            case 4:
                return str.replace(/(\s*$)/g, "");
            default:
                return str;
        }
    },

    /*type
    1:首字母大写   
    2：首页母小写
    3：大小写转换
    4：全部大写
    5：全部小写
     */
    //changeCase('asdasd',1)
    //Asdasd
    changeCase: function(str, type) {
        function ToggleCase(str) {
            var itemText = ""
            str.split("").forEach(
                function(item) {
                    if (/^([a-z]+)/.test(item)) {
                        itemText += item.toUpperCase();
                    } else if (/^([A-Z]+)/.test(item)) {
                        itemText += item.toLowerCase();
                    } else {
                        itemText += item;
                    }
                });
            return itemText;
        }

        switch (type) {
            case 1:
                return str.replace(/^(\w)(\w+)/, function(v, v1, v2) {
                    return v1.toUpperCase() + v2.toLowerCase();
                });
            case 2:
                return str.replace(/^(\w)(\w+)/, function(v, v1, v2) {
                    return v1.toLowerCase() + v2.toUpperCase();
                });
            case 3:
                return ToggleCase(str);
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    },

    /*字符串循环复制*/
    //repeatStr(str->字符串, count->次数)
    //repeatStr('123',3)
    //"123123123"
    repeatStr: function(str, count) {
        var text = '';
        for (var i = 0; i < count; i++) {
            text += str;
        }
        return text;
    },

    //字符串替换(字符串,要替换的字符,替换成什么)
    replaceAll: function(str, AFindText, ARepText) {　　　
        raRegExp = new RegExp(AFindText, "g");　　　
        return str.replace(raRegExp, ARepText);
    },

    /*替换 *  */
    //replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
    replaceStr: function(str, regArr, type, ARepText) {
        var regtext = '',
            Reg = null,
            replaceText = ARepText || '*';
        //replaceStr('18819322663',[3,5,3],0)
        //188*****663
        //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
        if (regArr.length === 3 && type === 0) {
            regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
            Reg = new RegExp(regtext);
            var replaceCount = repeatStr(replaceText, regArr[1]);
            return str.replace(Reg, '$1' + replaceCount + '$2')
        }
        //replaceStr('asdasdasdaa',[3,5,3],1)
        //***asdas***
        else if (regArr.length === 3 && type === 1) {
            regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
            Reg = new RegExp(regtext);
            var replaceCount1 = repeatSte(replaceText, regArr[0]);
            var replaceCount2 = repeatSte(replaceText, regArr[2]);
            return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
        }
        //replaceStr('1asd88465asdwqe3',[5],0)
        //*****8465asdwqe3
        else if (regArr.length === 1 && type == 0) {
            regtext = '(^\\w{' + regArr[0] + '})'
            Reg = new RegExp(regtext);
            var replaceCount = repeatSte(replaceText, regArr[0]);
            return str.replace(Reg, replaceCount)
        }
        //replaceStr('1asd88465asdwqe3',[5],1,'+')
        //"1asd88465as+++++"
        else if (regArr.length === 1 && type == 1) {
            regtext = '(\\w{' + regArr[0] + '}$)'
            Reg = new RegExp(regtext);
            var replaceCount = repeatSte(replaceText, regArr[0]);
            return str.replace(Reg, replaceCount)
        }
    },


    /*检测字符串*/
    //checkType('165226226326','phone')
    //false
    //大家可以根据需要扩展
    checkType: function(str, type) {
        switch (type) {
            case 'email':
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            case 'phone':
                return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
            case 'tel':
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            case 'number':
                return /^[0-9]$/.test(str);
            case 'english':
                return /^[a-zA-Z]+$/.test(str);
            case 'chinese':
                return /^[\u4E00-\u9FA5]+$/.test(str);
            case 'lower':
                return /^[a-z]+$/.test(str);
            case 'upper':
                return /^[A-Z]+$/.test(str);
            default:
                return true;
        }
    },


    /*检测密码强度*/
    //checkPwd('12asdASAD')
    //3(强度等级为3)
    checkPwd: function(str) {
        var nowLv = 0;
        if (str.length < 6) {
            return nowLv
        };
        if (/[0-9]/.test(str)) {
            nowLv++
        };
        if (/[a-z]/.test(str)) {
            nowLv++
        };
        if (/[A-Z]/.test(str)) {
            nowLv++
        };
        if (/[\.|-|_]/.test(str)) {
            nowLv++
        };
        return nowLv;
    },


    /*随机码*/
    //count取值范围0-36
    //randomNumber(10)
    //"2584316588472575"
    //randomNumber(14)
    //"9b405070dd00122640c192caab84537"
    //Math.random().toString(36).substring(2);
    //"83vhdx10rmjkyb9"
    randomNumber: function(count) {
        return Math.random().toString(count).substring(2);
    },


    /*查找字符串出现次数*/
    countStr: function(str, strSplit) {
        return str.split(strSplit).length - 1
    },
    //var strTest = 'sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
    //countStr(strTest,'blog')
    //6


    /*数组去重*/
    //ES6新增的Set数据结构，类似于数组，但是里面的元素都是唯一的 ，其构造函数可以接受一个数组作为参数
    //let arr=[1,2,1,2,6,3,5,69,66,7,2,1,4,3,6,8,9663,8]
    //let set = new Set(array);
    //{1,2,6,3,5,69,66,7,4,8,9663}
    //ES6中Array新增了一个静态方法from，可以把类似数组的对象转换为数组
    //Array.from(set)
    //[1,2,6,3,5,69,66,7,4,8,9663]
    removeRepeatArray: function(arr) {
        return Array.from(new Set(arr))
    },


    /*数组顺序打乱*/
    upsetArr: function(arr) {
        return arr.sort(function() {
            return Math.random() - 0.5
        });
    },


    /*数组最大值最小值*/
    //这一块的封装，主要是针对数字类型的数组
    maxArr: function(arr) {
        return Math.max.apply(null, arr);
    },
    minArr: function(arr) {
        return Math.min.apply(null, arr);
    },


    /*数组求和，平均值*/
    //这一块的封装，主要是针对数字类型的数组
    //求和
    sumArr: function(arr) {
        var sumText = 0;
        for (var i = 0, len = arr.length; i < len; i++) {
            sumText += arr[i];
        }
        return sumText;
    },
    //平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
    covArr: function(arr) {
        var sumText = sumArr(arr);
        var covText = sumText / length;
        return covText;
    },


    /*从数组中随机获取元素*/
    //randomOne([1,2,3,6,8,5,4,2,6])
    //8
    //randomOne([1,2,3,6,8,5,4,2,6])
    //1
    randomOne: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },


    /*返回数组（字符串）出现的次数*/
    //getEleCount('asd56+asdasdwqe','a')
    //3
    //getEleCount([1,2,3,4,5,66,77,22,55,22],22)
    //2
    getEleCount: function(obj, ele) {
        var num = 0;
        for (var i = 0, len = obj.length; i < len; i++) {
            if (ele == obj[i]) {
                num++;
            }
        }
        return num;
    },


    /*返回数组（字符串）出现最多的元素和次数*/
    //arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])默认情况，返回所有元素出现的次数
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)传参（rank=3），只返回出现次数排序前三的
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)传参（ranktype=1,rank=null），升序返回所有元素出现次数
    //getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
    getCount: function(arr, rank,ranktype) {
        var obj = {};
        var k, arr1 = [];
        //记录每一元素出现的次数
        for (var i = 0, len = arr.length; i < len; i++) {
            k = arr[i];
            if (obj[k]) {
                obj[k]++;
            } else {
                obj[k] = 1;
            }
        }
        //保存结果{el-'元素'，count-出现次数}
        for (var o in obj) {
            arr1.push({
                el: o,
                count: obj[o]
            });
        }
        //排序（降序）
        arr1.sort(function(n1, n2) {
            return n2.count - n1.count
        });
        //如果ranktype为1，则为升序，反转数组
        if (ranktype === 1) {
            arr1 = arr1.reverse();
        }
        var rank1 = rank || arr1.length;
        return arr1.slice(0, rank1);
    },


    /*得到n1-n2下标的数组*/
    //getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
    //[5, 6, 7, 8, 9]
    //getArrayNum([0,1,2,3,4,5,6,7,8,9],2) 不传第二个参数,默认返回从n1到数组结束的元素
    //[2, 3, 4, 5, 6, 7, 8, 9]
    getArrayNum: function(arr, n1, n2) {
        var arr1 = [],
            len = n2 || arr.length - 1;
        for (var i = n1; i <= len; i++) {
            arr1.push(arr[i])
        }
        return arr1;
    },


    /*筛选数组*/
    //删除值为'val'的数组元素
    //removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
    //["aaa"]   带有'test'的都删除
    //removeArrayForValue(['test','test1','test2','test','aaa'],'test')
    //["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
    removeArrayForValue: function(arr, val, type) {
        arr.filter(function(item) {
            return type === '%' ? item.indexOf(val) !== -1 : item !== val
        })
    },


    /*现金额大写转换*/
    //upDigit(168752632)
    //"人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
    //upDigit(1682)
    //"人民币壹仟陆佰捌拾贰元整"
    //upDigit(-1693)
    //"欠人民币壹仟陆佰玖拾叁元整"
    upDigit: function(n) {
        var fraction = ['角', '分', '厘'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠人民币' : '人民币';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            //s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')+ unit[0][i] + s; 
            s = p + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    },


    /*设置，获取URL参数*/
    //获取url参数
    //getUrlPrmt('segmentfault.com/write?draftId=122000011938')
    //Object{draftId: "122000011938"}
    getUrlPrmt: function(url) {
        url = url ? url : window.location.href;
        let _pa = url.substring(url.indexOf('?') + 1),
            _arrS = _pa.split('&'),
            _rs = {};
        for (let i = 0, _len = _arrS.length; i < _len; i++) {
            let pos = _arrS[i].indexOf('=');
            if (pos == -1) {
                continue;
            }
            let name = _arrS[i].substring(0, pos),
                value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
            _rs[name] = value;
        }
        return _rs;
    },
    //设置url参数
    //setUrlPrmt({'a':1,'b':2})
    //a=1&b=2
    setUrlPrmt: function(obj) {
        let _rs = [];
        for (let p in obj) {
            if (obj[p] != null && obj[p] != '') {
                _rs.push(p + '=' + obj[p])
            }
        }
        return _rs.join('&');
    },


    /*随机返回一个范围内的数字*/
    randomNumber: function(n1, n2) {
        //randomNumber(5,10)
        //返回5-10的随机整数，包括5，10
        if (arguments.length === 2) {
            return Math.round(n1 + Math.random() * (n2 - n1));
        }
        //randomNumber(10)
        //返回0-10的随机整数，包括0，10
        else if (arguments.length === 1) {
            return Math.round(Math.random() * n1)
        }
        //randomNumber()
        //返回0-255的随机整数，包括0，255
        else {
            return Math.round(Math.random() * 255)
        }
    },


    /*适配rem*/
    //使用方式很简单，比如效果图上，有张图片。宽高都是100px;
    //样式写法就是
    // img{
    //     width:1rem;
    //     height:1rem;
    // }
    //这样的设置，比如在屏幕宽度大于等于750px设备上，1rem=100px；图片显示就是宽高都是100px
    //比如在iphone6(屏幕宽度：375)上，375/750*100=50px;就是1rem=50px;图片显示就是宽高都是50px;
    getFontSize: function() {
        var doc = document,
            win = window;
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
                if (clientWidth > 750) {
                    clientWidth = 750
                }
                //设置根元素font-size大小
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            };
        //屏幕大小改变，或者横竖屏切换时，触发函数
        win.addEventListener(resizeEvt, recalc, false);
        //文档加载完成时，触发函数
        doc.addEventListener('DOMContentLoaded', recalc, false);
    },
    // 1、判断是否是一个数组?12345
isArray: function (arr){
return Object.prototype.toString.call(arr) ==='[object Array]';
}
}
// var aaa= myJs.isArray([1,2,3]) //true
// 2、判断是否是一个函数(三种)?123456
function isFunction(fn) {
return Object.prototype.toString.call(fn) ==='[object Function]';
return fn.constructor == Function;
return fn instanceof Function;
return typeof (fn) == Function;
}
// 3、数组去重，只考虑数组中元素为数字或者字符串?123456789
function newarr(arr){
var arrs = [];
for(var i =0;i<arr.length;i++){
if(arrs.indexOf(arr[i])== -1){
arrs.push(arr[i])
}
}
return arrs;
}
// 4、动态去重?123456789101112131415161718
var arr = [1,2, 3, 4];
function add() {
var newarr = [];
$('.addEle').click(() => {
var rnd = Math.ceil(Math.random() * 10);
newarr.push(rnd)
for (var i =0; i < newarr.length; i++) {
if (arr.indexOf(newarr[i]) == -1) {
arr.push(newarr[i])
arr.sort(function (a, b) {
return b - a //降序
});
}
}
console.log(arr)//[1,2,3,4,5,6,7,8,9]
})
}
add()
// 5、去除字符串空格(包含三种情况)?12345
function trim(str) {
return str.replace(/^[" "||"　"]*/,"").replace(/[" "|"　"]*$/,"");// 去除头和尾
return str.replace(/\s/g,'');//去除所有空格
return str.replace(/(\s*$)/g,"");//去除右边所有空格
}
// 6、判断是否为邮箱地址?123456789
function isEmail(emailStr) {
var reg = /^[a-zA-Z0-9]+([._-]*[a-zA-Z0-9]*)*@[a-zA-Z0-9]+.[a-zA-Z0-9{2,5}$]/;
var result = reg.test(emailStr);
if (result) {
alert("ok");
} else {
alert("error");
}
}
// 7、判断是否是手机号?12345678
function isMobilePhone(phone) {
var reg = /^1\d{10}$/;
if (reg.test(phone)) {
alert('ok');
} else {
alert('error');
}
}
// 8、获取一个对象里面第一次元素的数量?1234567891011
// function getObjectLength(obj){
// var i=0;
// for( var attrin obj){
// if(obj.hasOwnProperty(attr)){
// i++;
// }
// }
// console.log(i);
// }
// var obj = {name:'kob',age:20};
// getObjectLength(obj) //2
// 9、获取元素相对于浏览器窗口的位置，返回一个{x,y}对象?12345678910
function getPosition(element) {
var offsety = 0;
offsety += element.offsetTop;
var offsetx = 0;
offsetx += element.offsetLeft;
if (element.offsetParent != null) {
getPosition(element.offsetParent);
}
return { Left: offsetx, Top: offsety };
}
// 10、判断某个字母在字符串中出现的次数?12345678
var str = 'To be, or not to be, that is the question.';
var count = 0;
var pos = str.indexOf('e');
while (pos !== -1) {
count++;
pos = str.indexOf('e', pos + 1);
}
console.log(count) //4
// 11、计算出数组中出现次数最多的元素

// ?
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
var arrayObj = [1,1, 2, 3, 3, 3,4, 5, 5];
var tepm = '',count =0;
var newarr = new Array();
for(var i=0;i<arrayObj.length;i++){
if (arrayObj[i] != -1) {
temp = arrayObj[i];
}
for(var j=0;j<arrayObj.length;j++){
if (temp == arrayObj[j]) {
count++;
arrayObj[j] = -1;
}
}
newarr.push(temp + ":" + count);
count = 0;
}
for(var i=0;i<newarr.length;i++){
　　console.log(newarr[i]);
}
// 12、数组filter（搜索功能）

// ?
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
var fruits = ['apple','banana', 'grapes','mango', 'orange'];
function filterItems(query) {
return fruits.filter(function(el) {
return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
})
}
  
console.log(filterItems('ap')); // ['apple', 'grapes']
// 13、copy 对象（第一种）

// ?
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
//第一种
// var cloneObj =function(obj) {
// var newObj = {};
// if (obj instanceof Array) {
// newObj = [];
// }
// for (var keyin obj) {
// var val = obj[key];
// newObj[key] = typeof val === 'object' ? cloneObj(val) : val;
// }
// return newObj;
// };
// //第二种
// function clone(origin , target){
// var target = target || {};
// for(var propin origin){
// target[prop] = origin[prop];
// }
// return target;
// }　
// 14、深度克隆

// ?
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
// 22
// var newObj ={};
// function deepClone(origin,target){
// var target = target || {},
// toStr = Object.prototype.toString,
// arrStr = "[object Array]";
  
// for(var propin origin){
// if(origin.hasOwnProperty(prop)){
// if(origin[prop] != "null" && typeof(origin[prop]) == 'object'){//判断原型链
// target[prop] = (toStr.call(origin[prop]) == arrStr) ? [] : {}//判断obj的key是否是数组
// deepClone(origin[prop],target[prop]);//递归的方式
// }else{
// target[prop] = origin[prop];
// }
// }
// }
// return target
  
// }
  
// deepClone(obj,newObj);
// console.log(newObj)
// 15、求数组最大值和最小值

// ?
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
Array.prototype.max = function(){
return Math.max.apply({},this)
}
  
Array.prototype.min = function(){
return Math.min.apply({},this)
}
  
console.log([1,5,2].max())
// 16、json数组去重

// ?
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
function UniquePay(paylist){
var payArr = [paylist[0]];
for(var i =1; i < paylist.length; i++){
var payItem = paylist[i];
var repeat = false;
for (var j =0; j < payArr.length; j++) {
if (payItem.name == payArr[j].name) {
repeat = true;
break;
}
}
if (!repeat) {
payArr.push(payItem);
}
}
return payArr;
}　
// 17、对比两个数组，取出交集

// ?
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
Array.intersect = function () {
var result = new Array();
var obj = {};
for (var i =0; i < arguments.length; i++) {
for (var j =0; j < arguments[i].length; j++) {
var str = arguments[i][j];
if (!obj[str]) {
obj[str] = 1;
}
else {
obj[str]++;
if (obj[str] == arguments.length)
{
result.push(str);
}
}//end else
}//end for j
}//end for i
return result;
}
console.log(Array.intersect(["1","2", "3"], ["2","3", "4", "5", "6"]))
// 18、数组和对象比较。取出对象的key和数组元素相同的

// ?
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// // 9
// var arr = ['F00006','F00007','F00008'];
// var obj = {'F00006':[{'id':21}],'F00007':[{'id':11}]}
// var newobj = {};
// for(var itemin obj){
// if(arr.includes(item)){
// newobj[item] = obj[item]
// }
// }
// console.log(newObj)
// 19、删除数组中某个元素

// ?
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
//第一种
Array.prototype.remove = function(val){
var index = this.indexOf(val);
if(index !=0){
this.splice(index,1)
}
}
[1,3,4].remove(3)
//第二种
function remove(arr, indx) {
for (var i =0; i < arr.length; i++) {
var index = arr.indexOf(arr[i]);
if (indx == index) {
arr.splice(index, 1)
}
}
return arr
}
// 20、判断数组是否包含某个元素

// ?
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
Array.prototype.contains = function (val) {
for (var i =0; i < this.length; i++) {
if (this[i] == val) {
return true;
}
}
return false;
};
  
[1, 2,3, 4].contains(2)//true
