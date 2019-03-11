$(function(){
	
		/*判断.where文本是否为空，如果为空，隐藏.links*/
		let where = document.querySelectorAll(".where");
		for (var i =0;i<where.length;i++) {
			let a = $(where).eq(i).html();
			if (a=="") {
				$(".links").eq(i).hide();
			}
		}
		
})