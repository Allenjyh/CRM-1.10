
const yzCheck = {
    //规则参数
    parameter: {
        phoneRules: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,//手机号
        landline: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,//座机        
        email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,//邮箱
        chinese: /^[\u4e00-\u9fa5]$/,//中文验证
        pwd: /^[A-Za-z0-9]([A-Za-z0-9._@]){5,11}$/,//密码
        UNumber: /^[0-9]{6}$/,//数字验证
    },

    //电话号码验证
    isPhone: function (phoneNumber, fn) {
        let phoneRules = this.parameter.phoneRules;
        if (!phoneRules.test(phoneNumber)) {
            if (fn && typeof fn == "function") {
                fn(false);
            }

        } else {
            if (fn && typeof fn == "function") {
                fn(true);
            }
        }
        return this;
    },

    //座机验证
    isLandline: function (_Landline, fn) {
        let Landline = this.parameter.Landline;
        if (!Landline.test(_Landline)) {
            if (fn && typeof fn == "function") {
                fn(false);
            }

        } else {
            if (fn && typeof fn == "function") {
                fn(true);
            }
        }
        return this;
    },

    //邮箱验证
    isEmail: function (_email, fn) {
        let email = this.parameter.email;
        if (!email.test(_email)) {
            if (fn && typeof fn == "function") {
                fn(false);
            }

        } else {
            if (fn && typeof fn == "function") {
                fn(true);
            }
        }
        return this;
    },

    //中文验证
    isChinese: function (chinesetext, fn) {
        let chineseRules = this.parameter.chineseRules;
        if (!chineseRules.test(chinesetext)) {
            if (fn && typeof fn == "function") {
                fn(false);
            }

        } else {
            if (typeof fn == "function") {
                fn(true);
            }
        }
        return this;
    },

    //密码格式验证
    checkPass: function (_pwd, fn) {
        let pwd = this.parameter.pwd;
        if (!pwd.test(_pwd)) {
            if (fn && typeof fn == "function") {
                fn(false);
            }

        } else {
            if (fn && typeof fn == "function") {
                fn(true);
            }
        }
        return this;
    },


    //字符长度验证
    checkStrLength: function (val, fn) {
        if(typeof val == "object"){
            //[{length:16,val:"",name:""}]
            for(var i=0;i<val.length;i++){
                if((this.removeSpace(val[i].val,1)).length < val[i].length){
                    if(fn && typeof fn == "function"){
                        fn(val[i]);
                    }
                    break;
                }

            }

        }
        return this;
    },

    //数字验证
    isNumber: function (val, fn) {

        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if(regPos.test(val) || regNeg.test(val)) {
            if (fn && typeof fn == "function") {
                fn(true);
            }
        } else {
            if (fn && typeof fn == "function") {
                fn(false);
            }
        }
        return this;
    },

    //去除空格
    removeSpace: function (str, type) {
        // type 1-所有空格 2-前后空格 3-前空格 4-后空格
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

        //return this;
    },

    //非空判断
    isEmpty: function (val,fn) {

        if(typeof val == "object"){
            //[{name:"",val:"",ele:""}]
            for(var i=0;i<val.length;i++){
                if(val[i].ele){
                    if(document.querySelector(val[i].ele) != null){
                        if(val[i].val == ""){
                            if(fn && typeof fn == "function"){
                                fn(val[i]);
                            }
                            break;
                        }
                    }


                }else {
                    if(val[i].val == ""){
                        if(fn && typeof fn == "function"){
                            fn(val[i]);
                        }
                        break;
                    }
                }

            }

        }else {
            if(val == "" || val == undefined){
                if(fn && typeof fn == "function"){
                    fn(false);
                }

            }else{
                if(fn && typeof fn == "function"){
                    fn(true);
                }

            }
        }



        return this;
    },
    //只能输入整数
    setInteger : function(value,prompt,fn){
        if(value.indexOf(".") > 0){
            if(prompt){
                alert("只能输入整数");
            };
            if(fn && typeof fn == "function"){
                fn(value.substring(0,value.indexOf(".")))
            };
        }
        return this;
    },
    //只能输入正整数
    setPositiveInteger : function(value,prompt,fn){
        value = value.replace(/\D/g,'')
        if(fn && typeof fn == "function"){
            fn(value)
        };
        return this;
    },

    //保留两位小数
    toDecimal : function(value,fn){
        if(value != ""){
            value = value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
            value = value.replace(/^\./g,""); //验证第一个字符是数字
            value = value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
            value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数

            if(fn && typeof fn == "function"){
                fn(value)
            }else {
                return value;
            }
        }


    },
    //最大数值
    largestNumber : function(val,maxVal,fn){
        if(parseFloat(val) > parseFloat(maxVal)){
            if(fn && typeof fn == "function"){
                fn(false)
            }else {
                return false;
            }

        }else {
            if(fn && typeof fn == "function"){
                fn(true)
            }else {
                return true;
            }
        }
    },

    //最小值
    minimumNumber : function(val,minVal,fn){
        if(parseFloat(val) < parseFloat(minVal)){
            if(fn && typeof fn == "function"){
                fn(false)
            }else {
                return false;
            }

        }else {
            if(fn && typeof fn == "function"){
                fn(true)
            }else {
                return true;
            }
        }
    },


    //不能输入特殊字符，只能输入中文数字英文
    isSpecialChar : function(value,fn){
        if(value != ""){
            var lastV = value.substring(value.length-1,value.length);
            var pattern = /[`~!@#$%^&*()_\-/+=<>?:"{}|,.\/;'\\[\]·~！@#￥%&*（）\-/+={}|《》？：“”【】、；‘’，。、]/im;
            var pattern1 = /[……——]/im;
            if(pattern.test(lastV)){
                if(fn && typeof fn == "function"){

                    fn(value.slice(0,value.length-1))
                }else {
                    return value.slice(0,value.length-1);
                }

            }
            if(pattern1.test(lastV)){
                if(fn && typeof fn == "function"){
                    fn(value.slice(0,value.length-2))
                }
                else {
                    return value.slice(0,value.length-2)
                }

            }
        }

    },
    //格式化银行卡号
    formatBankAccount : function(value){
        if(value != ""){
            return value.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");//四位数字一组，以空格分割
        }
    },

    //格式电话号码
    formatPhone : function(text){
        if(text != ""){
            return value.replace(/\s/g,'').replace(/(\d{3})(?=\d)/g,"$1 ");//四位数字一组，以空格分割
        }
    },
    /**
     * 数字千分位格式化
     * @public
     * @param mixed mVal 数值
     * @param int iAccuracy 小数位精度(默认为2)
     * @return string
     */
    formatMoney : function(mVal, iAccuracy) {
        var fTmp = 0.00; //临时变量
        var iFra = 0; //小数部分
        var iInt = 0; //整数部分
        var aBuf = new Array(); //输出缓存
        var bPositive = true; //保存正负值标记(true:正数)
        /**
         * 输出定长字符串，不够补0
         * <li>闭包函数</li>
         * @param int iVal 值
         * @param int iLen 输出的长度
         */
        function funZero(iVal, iLen) {
            var sTmp = iVal.toString();
            var sBuf = new Array();
            for(var i = 0, iLoop = iLen - sTmp.length; i < iLoop; i++)
                sBuf.push('0');
            sBuf.push(sTmp);
            return sBuf.join('');
        };

        if(typeof(iAccuracy) === 'undefined')
            iAccuracy = 2;
        bPositive = (mVal >= 0); //取出正负号
        fTmp = (isNaN(fTmp = parseFloat(mVal))) ? 0 : Math.abs(fTmp); //强制转换为绝对值数浮点
        //所有内容用正数规则处理
        iInt = parseInt(fTmp); //分离整数部分
        iFra = parseInt((fTmp - iInt) * Math.pow(10, iAccuracy) + 0.5); //分离小数部分(四舍五入)

        do {
            aBuf.unshift(funZero(iInt % 1000, 3));
        } while ((iInt = parseInt(iInt / 1000)));
        aBuf[0] = parseInt(aBuf[0]).toString(); //最高段区去掉前导0
        return((bPositive) ? '' : '-') + aBuf.join(',') + '.' + ((0 === iFra) ? '00' : funZero(iFra, iAccuracy));
    },
    unformatMoney: function(sVal) {
        var fTmp = parseFloat(sVal.replace(/,/g, ''));
        return(isNaN(fTmp) ? 0 : fTmp);
    },


}
