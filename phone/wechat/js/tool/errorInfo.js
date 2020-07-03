"use strict";

/**
 * 收集错误信息;
 * **/
 var ErrorInfoFactory = function(){
     this.errorCode = [
          { error_code: 200, error_msg: '成功' },
          { error_code: 1000, error_msg: '用户已存在' },
          { error_code: 1001, error_msg: '用户不存在' },
          { error_code: 1002, error_msg: '密码错误' },
          { error_code: 1003, error_msg: '用户信息保存失败' },
          { error_code: 1004, error_msg: '未同意不能操作' },
          { error_code: 1005, error_msg: '密码长度不能少于6位' },
          { error_code: 1006, error_msg: '6-12位密码由字母或数字开头，只能包含字母，数字和._@' },
          { error_code: 1007, error_msg: '密码太长' },
          { error_code: 1008, error_msg: '请先拖动滑块' },
          { error_code: 1010, error_msg: '请登录' },
          { error_code: 1011, error_msg: '用户未绑定' },
          { error_code: 1012, error_msg: '用户已绑定' },
          { error_code: 1013, error_msg: '已同意' },
          { error_code: 1014, error_msg: '不能同意自已的信息' },
          { error_code: 1015, error_msg: '原密码错误' },
          { error_code: 1016, error_msg: '基本资料未完善' },
          { error_code: 1017, error_msg: '用户未认证' },
          { error_code: 1018, error_msg: '企业资料未完善' },
          { error_code: 1550, error_msg: '手机号已经注册' },
          { error_code: 1551, error_msg: '手机号码不合法' },
          { error_code: 1552, error_msg: '请输入正确的原手机号' },
          { error_code: 1553, error_msg: '验证码获取异常' },
          { error_code: 1554, error_msg: '验证码发送失败' },
          { error_code: 1555, error_msg: '验证码错误' },
          { error_code: 1556, error_msg: '验证码已过期或不存在' },
          { error_code: 1557, error_msg: '验证码不存在' },
          { error_code: 1559, error_msg: '电话号码不合法' },
          { error_code: 1560, error_msg: '验证过期或不存在' },
          { error_code: 1561, error_msg: '请先验证原邮箱' },
          { error_code: 1562, error_msg: '座机号码不合法' },
          { error_code: 1601, error_msg: '信息已发布' },
          { error_code: 1602, error_msg: '发布失败' },
          { error_code: 1603, error_msg: '发布已达上限' },
          { error_code: 1604, error_msg: '更新发布上限失败' },
          { error_code: 1605, error_msg: '检测参数异常' },
          { error_code: 1606, error_msg: '添加失败' },
          { error_code: 1607, error_msg: '写入数据库失败' },
          { error_code: 1651, error_msg: '删除信息失败' },
          { error_code: 1652, error_msg: '删除图片失败' },
          { error_code: 1653, error_msg: '信息已删除' },
          { error_code: 1654, error_msg: '删除失败' },
          { error_code: 1655, error_msg: '已审核不能删除' },
          { error_code: 1671, error_msg: '修改需求信息失败' },
          { error_code: 1672, error_msg: '邮箱已存在' },
          { error_code: 1673, error_msg: '已经绑定邮箱' },
          { error_code: 1674, error_msg: '信息不存在' },
          { error_code: 1675, error_msg: '已审核不能修改' },
          { error_code: 1676, error_msg: '撤消失败' },
          { error_code: 1677, error_msg: '更新失败' },
          { error_code: 1678, error_msg: '请勿重复修改' },
          { error_code: 1679, error_msg: '密码与原密码相同' },
          { error_code: 1701, error_msg: '获取二维码异常' },
          { error_code: 1702, error_msg: '二维码已失效' },
          { error_code: 1703, error_msg: '绑定二维码失败' },
          { error_code: 1704, error_msg: '二维码已绑定' },
          { error_code: 1705, error_msg: '检测失败未绑定二维码' },
          { error_code: 1731, error_msg: '园区用户不能操作' },
          { error_code: 2000, error_msg: '参数错误' },
          { error_code: 2001, error_msg: '参数不能为空' },
          { error_code: 2002, error_msg: '搜索条件错误' },
          { error_code: 2003, error_msg: '获取异常' },
          { error_code: 2004, error_msg: '记录已存在' },
          { error_code: 2005, error_msg: '保存收藏信息异常' },
          { error_code: 2006, error_msg: '没有需要修改的内容' },
          { error_code: 2007, error_msg: 'json解释错误' },
          { error_code: 2008, error_msg: '搜索条件异常' },
          { error_code: 2009, error_msg: '删除图片失败' },
          { error_code: 2010, error_msg: '1分钟内不能有重复提交' },
          { error_code: 2011, error_msg: '邮箱格式不正确' },
          { error_code: 2012, error_msg: '提交失败' },
          { error_code: 2013, error_msg: '已经提交申请' },
          { error_code: 2014, error_msg: '身份证错误' },
          { error_code: 2015, error_msg: '绑定失败' },
          { error_code: 2016, error_msg: '收藏失败' },
          { error_code: 2017, error_msg: '修改失败' },
          { error_code: 2018, error_msg: '未审核不能操作' },
          { error_code: 2019, error_msg: '没有入住园区' },
          { error_code: 2020, error_msg: '数据太长' },
          { error_code: 2021, error_msg: '重加载页面' },
          { error_code: 2022, error_msg: 'CODE格式错误' },
          { error_code: 2023, error_msg: '记录不存在' },
          { error_code: 2024, error_msg: '园区无法入驻自己园区' },
          { error_code: 2025, error_msg: '加密失败' },
          { error_code: 2026, error_msg: '身份错误，无权操作' },
          { error_code: 2027, error_msg: '园区不存在' },
          { error_code: 2028, error_msg: '时间超过规定天数，无权操作' },
          { error_code: 2029, error_msg: '审核中，无权修改' },
          { error_code: 2030, error_msg: '请先上传图片' },
          { error_code: 2031, error_msg: '文件资源不存在' }
     ];
     if(!(this instanceof ErrorInfoFactory)){
         return new ErrorInfoFactory();
     };
     return this;
 };
ErrorInfoFactory.prototype.filterCode = function(error_code){
    let errorCodeArry = this.errorCode
     return (function(){

        if(!error_code){
            return false;
        }
        let errorMsgObj = "";
        for (let i in errorCodeArry) {
            if(errorCodeArry[i].error_code == error_code){
                errorMsgObj = errorCodeArry[i];
                break;
            }
        };

        return errorMsgObj.error_msg
    })(error_code)
};

