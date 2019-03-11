$(function(){
	/*控制提供/需求的列表的标题*/
	var titles = $('.title').length;
	for (var i =0;i<titles;i++) {
		var num = $('.title').eq(i).text().length;
		var nText = $('.title').eq(i).text();
		if(num>31){
			$('.zome-logo-xq').eq(i).css({"position": "absolute","right":"3px","bottom":"0"});
			$('.title').eq(i).text(nText.substring(0,31)+"...");
		}
	}
})	