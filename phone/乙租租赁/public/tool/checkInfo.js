
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
    checkStrLength: function () {
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
            //[{name:"",val:""}]
            for(var i=0;i<val.length;i++){
                if(val[i].val == ""){
                    if(fn && typeof fn == "function"){
                        fn(val[i]);
                    }
                    break;
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
    //保留两位小数
    toDecimal : function(value,fn){
        value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
        if(fn && typeof fn == "function"){
            fn(value)
        }else {
            return value;
        }
    },

    //不能输入特殊字符，只能输入中文数字英文
    isSpecialChar : function(value,fn){
        var lastV = value.substring(value.length-1,value.length);
        var pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%&*（）\-+={}|《》？：“”【】、；‘’，。、]/im;
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


}
