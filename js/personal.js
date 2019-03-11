$(function(){
	
	$('.shxq_title i').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		console.log($(this).index());
	});
	
	/*删除需求*/
	var del;
	$('.del_btn').click(function(){
		if($('.is_del_box').css('display') == 'none'){
			$('.is_del_box').fadeIn(500);
			del = $(this).parents('li').attr('date-id');
		}
	});
	
	/*关闭是否确认删除提示框*/
	$('.close_delBox,.cancel_btn').click(function(){
		$('.is_del_box').fadeOut(800);
	});
	
	/*确认删除*/
	$('.confirm_btn').click(function(){
		$('.is_del_box').fadeOut(800);
		$('.shxq_list>ul>li').attr('')
		console.log(del);
		$(".shxq_list>ul>li").eq(del).remove();
	});
	
	var send;
	$('.content_3_ul>li').hover(function(){
		send = $(this).index();
		console.log(send);
	});
	
});