$(function(){
	/*控制提供/需求的列表的标题*/
	var titles = $('.title').length;
	for (var i =0;i<titles;i++) {
		var num = $('.title').eq(i).text().length;
		var nText = $('.title').eq(i).text();
		if (num==15) {

		}else if(num>31){
			$('.title').eq(i).text(nText.substring(0,31)+"...");
		}
	}
	// 关注 聊天 取消关注
	// $('.cont_type').on('click','li',function(){
	// 	let i = $(this).index();
	// 	if()
	// })
	newconfirm = new newsconfirmPopup('this is a obj','方法调用测试');
    newconfirm.trigger();
    console.log(newconfirm);
    thsinoti =new noticeappen('1','this is notcenappen obj','方法调用测试');
    thsinoti.trigger();
    console.log(thsinoti);
})	