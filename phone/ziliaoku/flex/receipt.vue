<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple" style="background: rgba(0, 0, 0, 0.04)">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">园区主页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/parkBillList' }">园区账单列表</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/billMonthInfo/1/'+tableData.id }">账单详情</el-breadcrumb-item>
          <el-breadcrumb-item>收据</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark" style="margin-top: 20px;">
        <div class="pro-editRoom-box">
          <div class="pro-title" style="position: relative;">
            <div style="width: auto;display: inline-block;">
              <label class="pro-title-label">
                <span class="pro-active" style="font-size:18px">租金总收据</span>
              </label>
              <span class="pro-strip"></span>
            </div>
               <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"  class="pro-btn pro-btn-abs1">全选</el-checkbox>
               <div class="pro-btn pro-btn-abs" @click="download_img()">下 载</div>
                <!-- <a class="down" href="" download="downImg"  >下载</a> -->
          </div>
          <div class="pro-editRoom-content" style="background:dark">
            <div class="form" id="form" style="background:dark">
              <div style="position: relative;">
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" class="_checkbox">
                  <el-checkbox label="#form">选择</el-checkbox>
                </el-checkbox-group>
                <div class="div_title1">{{tableData.property_name}}四联收据</div>
                <div style="text-align: center;line-height:16px;">{{date[0]}}年{{date[1]}}月{{date[2]}}日</div>
                <!-- <div style="position: absolute;top: 33px;right: 31px;line-height:16px;">ANO.09090454</div> -->
              </div>
              <div class="bd clear">
                <div class="bdbottom">
                  <table  style="border-collapse:collapse"  border="0" cellpadding="0" cellspacing="0">
                    <tr class="add_border" style="display: block;line-height:16px;">
                      <td  width="60px">兹收到 </td>  
                      <td width="470px" style="text-align:left;padding-left: 10px ;border-left: none;"><span v-for="(item,i,index) in tableData.room_info" :key="index">{{item.room_name}} &nbsp;&nbsp; </span> <span style="padding-left: 10px">{{tableData.enterprise_name}}</span></td>
                    </tr>
                    <tr   style="display: block;position: relative;">
                      <td class="border_tb" width="344px;" style="position: relative;border-collapse:collapse ">
                        <table width=100% border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                          <tr ><p class="detail_order" style="padding-top:1px ">租金：<span>&nbsp;{{tableData.rent}}元整</span></p></tr>	
                          <tr><p class="detail_order">电费：<span>&nbsp;{{tableData.all_electric_fee}}元</span></p></tr>	 
                          <tr><p class="detail_order">水费：<span>{{tableData.all_water_fee}}元</span></p></tr>	 
                          <tr><p class="detail_order">损耗：<span>{{tableData.all_loss_fee}}元</span></p></tr>	 
                          <tr ><p class="detail_order">分摊：<span>{{tableData.share_fee}}元</span></p></tr>	 	 
                          <tr ><p class="detail_order" style="padding-bottom:17px">管理费：<span>{{tableData.all_manage_fee}}元</span></p></tr>	 	 
                        </table> 
                        <p class="detail_order" style="position: absolute;bottom:2px;right:10px"><span >租金由{{tableData.order_time}}</span></p>	 
                      </td>
                      <td class="border_tb money_td" width="198px"  >
                        <table width=100% cellpadding="0" cellspacing="0" style="border-collapse:collapse">
                          <tr style="line-height:32px;text-align:center;">
                            <td style="border: none;"><br/></td>
                            <td style="border: none;"><br/></td>
                            <td style="border: none;">金</td>
                            <td style="border: none;"></td>
                            <td style="border: none;"></td>
                            <td style="border: none;"></td>
                            <td style="border: none;">额</td>
                            <td style="border: none;"></td>
                            <td style="border: none;"></td></tr>	
                          <tr class="add_border add_width" style="line-height:22px;" >
                            <td style="border-left: none;border-bottom: none;">百<br/>万</td>
                            <td style="border-left: none;border-bottom: none;">十<br/>万</td>
                            <td style="border-left: none;border-bottom: none;">万</td>
                            <td style="border-left: none;border-bottom: none;">仟</td>
                            <td style="border-left: none;border-bottom: none;">佰</td>
                            <td style="border-left: none;border-bottom: none;">十</td>
                            <td style="border-left: none;border-bottom: none;">元</td>
                            <td style="border-left: none;border-bottom: none;">角</td>
                            <td style="border-right: none;border-bottom: none;">分</td>
                          </tr>	 
                          <tr class="add_border money_td_one" style="line-height:52px;" v-if=" numb.length > 0">
                            <td style="border-left: none;"></td>
                            <td >￥</td>
                            <td >{{numb[numb.length-1][6]}}</td>
                            <td >{{numb[numb.length-1][5]}}</td>
                            <td >{{numb[numb.length-1][4]}}</td>
                            <td >{{numb[numb.length-1][3]}}</td>
                            <td>{{numb[numb.length-1][2]}}</td>
                            <td>{{numb[numb.length-1][1]}}</td>
                            <td style="border-right: none;">{{numb[numb.length-1][0]}}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr class="border" style="display: block;border-bottom: none;" >
                      <td width="131px" style="line-height:32px;"> 合计人民币（大写）</td>
                      <td ><table width=100% cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr class="lq_tr" style="height:32px;" v-if=" numb.length > 0">
                          <td class="lq_tr1"><input type="text" class="txt"    autocomplete="off" /></td><td style="padding:2px;height:30px">百万</td>
                          <td class="lq_tr1"><input type="text" class="txt"    autocomplete="off" /></td><td style="padding:2px;height:30px">拾万</td>
                          <td class="lq_tr2"><input type="text" class="txt"    autocomplete="off" /></td><td td class="lq_tr2" style="padding:2px;height:30px">￥<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[numb.length-1][6]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">万<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[numb.length-1][5]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">仟<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[numb.length-1][4]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">佰<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[numb.length-1][3]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">拾<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[numb.length-1][2]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">元<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[numb.length-1][1]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">角<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[numb.length-1][0]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">分</td>
                        </tr>
                      </table>
                      </td>
                    </tr>
                    <tr class="border" style="display: block;width: 530px;">
                        <td   style="text-align:left;padding-left: 10px;line-height: 26px;">附注 : <span v-for="(item,i) in tableData.room_info" :key="i">{{item.room_name}} &nbsp;&nbsp;</span> 租金收据</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="foot" style="background:#fff; padding: 0px 0 0 87px ">
                <span>单位盖章：<input type="text"  style="border:none; background:#fff; width:87px" /></span>
                <span>会计：   <input type="text"  style="border:none; background:#fff; width:33px" />赵永豪<input type="text"  style="border:none; background:#fff; width:86px" /></span>
                <span>出纳：   <input type="text"  style="border:none; background:#fff; width:33px" />李海因<input type="text"  style="border:none; background:#fff; width:40px" /></span>
              </div>
            </div>
          </div>


          <div class="pro-title" style="position: relative;">
            <div style="width: auto;display: inline-block;">
              <label class="pro-title-label">
                <span class="pro-active" style="font-size:18px">水电收据</span>
              </label>
              <span class="pro-strip"></span>
            </div>
          </div>


          <div class="pro-editRoom-content" style="background:dark">
            <!-- <div class="form" v-for="(item,index) in room_info1.room_info" :key="index" :id="'form'+index"> -->
            <div class="form" v-for="(item,index) in tableData.room_info" :key="index" :id="'form'+index">
              <div style="position: relative;">
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" class="_checkbox">
                  <el-checkbox :label="`${'#form'+index}`">选择</el-checkbox>
                </el-checkbox-group>
                <!-- <div><a :class="'down'+index"  download="downImg" @click="download(index)">下载</a></div> -->
                <div class="div_title1">{{tableData.property_name}}四联收据</div>
                <div style="text-align: center;line-height:16px;">{{date[0]}}年{{date[1]}}月{{date[2]}}日</div>
              </div>
              <div class="bd clear">
                <div class="bdbottom">
                  <table  style="border-collapse:collapse">
                    <tr class="add_border" style="display: block;line-height:16px;">
                      <td  width="60px">兹收到 </td>
                      <td width="470px" style="text-align:left;padding-left: 10px;border-left: none;"><span> {{item.room_name}}</span> <span style="padding-left: 10px">{{tableData.enterprise_name}}</span></td>
                    </tr>
                    <tr   style="display: block;position: relative;">
                      <td class="border_tb" width="344px;" style="position: relative;border-collapse:collapse ">
                        <table width=100% cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                          <tr><p class="detail_order" style="padding-top:1px ">电费:<span>今月{{item.now_electric_degree}}度-上月{{item.last_electric_degree}}度={{(item.electric_fee/item.electric_degree).toFixed(2)}}*{{item.electric_degree}}={{item.electric_fee}}元</span></p></tr>
                          <tr><p class="detail_order">水费:<span>今月{{item.now_water_ton}}吨-上月{{item.last_water_ton}}吨={{item.water_fee/item.water_ton}}*{{item.water_ton}}={{item.water_fee}}元</span></p></tr>	
                          <tr><p class="detail_order">损耗:<span>水损{{(item.water_fee/item.water_ton).toFixed(2)}}*{{tableData.loss_fee}}%+电损{{(item.electric_fee/item.electric_degree).toFixed(2)}}*{{tableData.loss_fee}}%={{((item.water_fee/item.water_ton+item.electric_fee/item.electric_degree)*tableData.loss_fee/100).toFixed(2)}}元</span></p></tr>	 
                          <tr ><p class="detail_order" style="padding-bottom:17px">管理费:<span>{{item.manage_fee}}元</span></p></tr>	 	 
                        </table> 
                        <p class="detail_order" style="position: absolute;bottom:2px;right:10px"><span >租金由{{tableData.order_time}}</span></p>	 
                      </td>
                      <td class="border_tb money_td" width="198px"  >
                        <table width=100% cellpadding="0" cellspacing="0" style="border-collapse:collapse">
                          <tr style="line-height:32px;text-align:center;">
                            <td style="border: none;"><br/></td>
                            <td style="border: none;"><br/></td>
                            <td style="border: none;">金</td>
                            <td style="border: none;"></td>
                            <td style="border: none;"></td>
                            <td style="border: none;"></td>
                            <td style="border: none;">额</td>
                            <td style="border: none;"></td>
                            <td style="border: none;"></td></tr>	
                          <tr class="add_border add_width" style="line-height:22px;" >
                            <td style="border-left: none;border-bottom: none;">百<br/>万</td>
                            <td style="border-left: none;border-bottom: none;">十<br/>万</td>
                            <td style="border-left: none;border-bottom: none;">万</td>
                            <td style="border-left: none;border-bottom: none;">仟</td>
                            <td style="border-left: none;border-bottom: none;">佰</td>
                            <td style="border-left: none;border-bottom: none;">十</td>
                            <td style="border-left: none;border-bottom: none;">元</td>
                            <td style="border-left: none;border-bottom: none;">角</td>
                            <td style="border-right: none;border-bottom: none;">分</td>
                          </tr>	 
                          <tr class="add_border money_td_one" style="line-height:52px;" v-if=" numb.length > 0">
                            <td style="border-left: none;"></td>
                            <td >￥</td>
                            <td >{{numb[index][6]}}</td>
                            <td >{{numb[index][5]}}</td>
                            <td >{{numb[index][4]}}</td>
                            <td >{{numb[index][3]}}</td>
                            <td>{{numb[index][2]}}</td>
                            <td>{{numb[index][1]}}</td>
                            <td style="border-right: none;">{{numb[index][0]}}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr class="border" style="display: block;border-bottom: none;">
                      <td width="131px" style="line-height:32px;"> 合计人民币（大写）</td>
                      <td ><table width=100% cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr class="lq_tr" style="height:32px;" v-if=" money.length > 0">
                          <td class="lq_tr1"><input type="text" class="txt"    autocomplete="off" /></td><td style="padding:2px;height:30px">百万</td>
                          <td class="lq_tr1"><input type="text" class="txt"    autocomplete="off" /></td><td style="padding:2px;height:30px">拾万</td>
                          <td class="lq_tr2"><input type="text" class="txt"    autocomplete="off" /></td><td td class="lq_tr2" style="padding:2px;height:30px">￥<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[index][6]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">万<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[index][5]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">仟<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[index][4]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">佰<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[index][3]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">拾<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[index][2]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">元<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[index][1]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">角<input type="text" class="txt"    autocomplete="off" /></td>
                          <td class="lq_tr2">{{money[index][0]}}<input type="text" class="txt"    autocomplete="off" /></td><td class="lq_tr2" style="padding:2px;height:30px">分</td>
                        </tr>
                      </table>
                      </td>
                    </tr>
                    <tr class="border" style="display: block;width: 530px;">
                        <td   style="text-align:left;padding-left: 10px;line-height: 26px;">附注 : 房间{{item.room_name}} <span > &nbsp;&nbsp;水电收据</span></td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="foot" style="background:#fff; padding: 0px 0 0 87px ">
                <span>单位盖章：<input type="text"  style="border:none; background:#fff; width:87px" /></span>
                <span>会计：<input type="text"  style="border:none; background:#fff; width:33px" />赵永豪<input type="text"  style="border:none; background:#fff; width:86px" /></span>
                <span>出纳：<input type="text"  style="border:none; background:#fff; width:33px" />李海因<input type="text"  style="border:none; background:#fff; width:40px" /></span>
              </div>
            </div>
          </div>


             
              <a class="down" href="" download="downImg" style="padding-bottom:100px;display: none"  >下载</a>
              <img class="aaa" src="" ><!-- style="display: none" -->
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<script>
  import {yzRouter} from "../../../../public/js/tool/routerGoto";
  import {yzAxios} from './../../../../public/js/yzAxios/axiosOperation';
  import aRoomTypeVue from '../parkHome/aRoomType.vue';
  import html2canvas from '../../../../public/js/park/html2canvas.min';
 //type 1-待支付  2-待确认  3-已收款  4-待创建
//  const cityOptions = ["选择",'选择0', '选择1'];

    export default {
      name: "receipt",
      data() {
        return {
          // 全选
          checkAll: false,
          checkedCities: [],
          cities: '',
          isIndeterminate: true,
          value:'',//选中lable

          Type:1,
          money:'',//金额
          numb:'',//数字金额
          date:'',//创建账单时间
          tableData:'',
        }
      },
      created(){
        // this.download();
      },
      mounted(){
        html2canvas();
        this.parkInform();
      },
      methods:{
        parkInform() {
          let me = this;
            yzAxios.setYzAxios(this,{
              url : 'lease',
              method : 'get',
              param:'order/receipt/240',
            },function(res,opt){
              // console.log(res)
              if(res.data.error_code == 200){
                me.tableData = res.data.data;
                console.log( me.tableData)
                // console.log( me.tableData.room_info)
               me.date = new Date(res.data.data.create_time*1000).toLocaleDateString().split("/");//创建账单时间
               let num=[];
              for(let i = 0;i<res.data.data.room_info.length;i++){
                 num.push(res.data.data.room_info[i].room_all_fee);
                //  if(i == res.data.data.room_info.length -1){
                  //  }
               }
                  num.push(res.data.data.pay_money);
                  // console.log(num)
                   me.numTocoggle(num);
              
              }
            })
        },
        numTocoggle(num){
          var regexp=/^\d+(([.]{1}(\d{0,2}))+){0,1}$/;
          var a = 0;
          var arry1 = [],arry2 = [],arrycities=["#form"];
          for( a;a<num.length;a++){
                // console.log(a);
            let _num = num[a];
            if(regexp.test(_num)){
                let digital=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"];
                // let unit=[['元','万', '亿'],['','拾','佰','仟']];
                // let decimalUnit=['角','分']
                let [key,val]=_num.split(".");
                let str='';//中文金额
                var numb='';//数字金额
                let keys=key.split("").reverse()
                // console.log(key)
                // console.log(num[a].split("."))
                let result=[]
                let index=0;
                while(index<keys.length) {
                  result.push(keys.slice(index,index+=4));
                }
                for(let h=result.length-1;h>=0;h--){
                  let numstr=''
                  for(let k=result[h].length-1;k>=0;k--){
                    if(result[h][k]==0){
                      numstr+=digital[result[h][k]]+'' 
                    }else{
                      numstr+=digital[result[h][k]]
                    }                       
                  }
                  str+=numstr
                }
                if(val!=undefined){
                  let valString=val.toString();

                  for(var i=0;i<valString.length;i++){
                    str+=(digital[valString[i]]);
                    key+= valString[i]
                  }
                }
                //  console.log(key)
                //阿拉伯数字补位
                numb = key.split("").reverse()

                //大写数字补位加零
                var _str = str.split("").reverse();
                if(_str.length < 7){
                  for(var i= _str.length ;i<7;i++){
                    _str.push("零");
                    numb.push("0");
                  }
                }
            }
            let objnumb = numb;
            let objstr = _str;
            arry1.push(objstr)
            arry2.push(objnumb)
            if(a < num.length-1){
              arrycities.push("#form"+a)
            }
          }
            this.money = arry1;
            this.numb =  arry2;
            this.cities = arrycities;
        },
        handleCheckAllChange(val) {
          // console.log("0"+val)
          this.checkedCities = val ? this.cities : [];
          this.value = val ? this.cities : [];
          this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
          console.log(value)
          this.value = value;
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.cities.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;

        },
        
        download_img(){
          let me = this;
          //首先要想html页面转成图片，先将其转为canvas；
          var canvas2 = document.createElement("canvas");
          var _canvas = document.querySelector('div');
          var w = parseInt(window.getComputedStyle(_canvas).width);
          var h = parseInt(window.getComputedStyle(_canvas).height);
          //为了使图像不模糊，先将canvas画布放大若干倍，放在较小的容器内
          canvas2.width = w * 2;
          canvas2.height = h * 2;
          canvas2.style.width = w + "px";
          canvas2.style.height = h + "px";
          //按照需求设置偏移量
          var context = canvas2.getContext("2d");
          context.scale(2, 2);

              for(let i=0;i<me.value.length;i++){
                html2canvas(document.querySelector(me.value[i]), {canvas: canvas2}).then(function (canvas) {
                    //可以直接下载图片到本地
                    document.querySelector('.aaa').setAttribute('src', canvas.toDataURL());
                      // me.downloadFile('账单收据.png', canvas.toDataURL());
                });
            }
        },
        downloadFile(fileName, content) {
                  let aLink = document.createElement('a');
                  let blob = this.base64ToBlob(content); //new Blob([content]);

                  let evt = document.createEvent("HTMLEvents");
                  evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
                  aLink.download = fileName;
                  aLink.href = URL.createObjectURL(blob);

                  // aLink.dispatchEvent(evt);
                  //aLink.click()
                  aLink.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));//兼容火狐
        },
        base64ToBlob(code) {
                let parts = code.split(';base64,');
                let contentType = parts[0].split(':')[1];
                let raw = window.atob(parts[1]);
                let rawLength = raw.length;

                let uInt8Array = new Uint8Array(rawLength);

                for (let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }
                return new Blob([uInt8Array], {type: contentType});
            }
      }
    }
</script>
<style scoped>
  @import "../../../../public/css/default.css";
  .pro-editRoom-box{
    height: calc(100vh - 124px);
    background: #ffffff;
    overflow: auto;
  }
  .pro-editRoom-content{
    height: auto;
  }
  /* .pro-editRoom-content-in{
    width: calc(100% - 40px);
    margin: 20px 0 0 20px;
  } */
</style>
<style scoped>
* {
    box-sizing: border-box;
    font-size: 13px;
    margin: 0;
		padding: 0;
		color: rgba(0,0,0,0.85);
		font-weight: bold;
		font-family:STSongti-SC-Bold;
  }
  i{
  font-style:normal
}
.clear:after{
  content: "";
  display: block;
  clear: both;
}
ul,ol,li{
	padding: 0;
	margin: 0;
	  list-style: none;
}
.form{
	width:585px;
	height:312px; 
	margin: 20px 0 43px 15px;
	box-shadow:8px 0px 16px 0px rgba(0,90,180,0.25);
}
.div_title1{
	text-align: center;
	padding:9px 0 16px 0;
	font-size: 16px;
	line-height: 20px
}
/* table */
.bdbottom{
	width: 530px;
	height:216px;
	margin: 5px auto;
}
.add_border td,.border{
	border:2px solid #000;
	text-align: center;
}
.border_tb  td,.border_tb{
	border-left:2px solid #000;
	border-right:2px solid #000;
	text-align: center;

}
.border_sx  td,.border_sx{
	border-top:2px solid #000;
	border-bottom:2px solid #000;
	text-align: center;

}
.lq_tr .lq_tr2 input{
	border:none; background:#fff; width:6px; text-align:center; height:30px;
}
.lq_tr .lq_tr1 input{
	border:none; background:#fff; width:8px; text-align:center; height:30px;
}
.detail_order {
	float:left;
	padding-left: 10px;
	font-size:13px;
	font-family:STSongti-SC-Regular;
	line-height:16px;
	font-weight:400;
 }
 .detail_order span{
	font-size:12px;
	font-family:STSongti-SC-Regular;
	font-weight:400;
	
 }
 .money_td{
	 padding-top: 0px;
	 vertical-align: top;
 }
 .money_td_one td{
	 border-bottom: none;
 }
 table
  {
  border-collapse:collapse;
  }
  /* 按钮 */
  .pro-btn{
    width:70px;
    height:32px;
    line-height: 32px;
    background:rgba(26,140,255,1);
    border-radius:4px;
    box-shadow:2px 7px 14px 1px rgba(25,140,255,0.25);
    color: #FFFFFF;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    padding: 0 7px;
    white-space: nowrap;
  }
  .pro-btn:hover{
    box-shadow:0px 7px 14px 1px #198CFF;
  }
   .pro-btn-abs{
    position: absolute;
    right: 50px;
    top: 0px;
  }
  .pro-btn-abs1{
    position: absolute;
    right: 170px;
    top: 0px;
    color: #1A8CFF;
    background: #FFFFFF;
  }
  /* 全选选择 */
  ._checkbox{
    position: absolute;
    top: 15px;
    left: 20px;
  }
  /* .pro-btn-abs1 span.el-checkbox__input{
    display:none!important;
  } */
  /* .pro-btn-abs1 .el-checkbox__input {
    display: none!important;
}
  .el-checkbox.pro-btn-abs1 .el-checkbox__label {
    padding-left: 0px!important;
} */
</style>

