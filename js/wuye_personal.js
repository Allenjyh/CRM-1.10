$(function(){
	
	$('.shxq_title i').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		console.log($(this).index());
	});
	
	$('.fbxq_title i').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		console.log($(this).index());
	});
	
	/*确认操作提示框*/
	function tishi(type,title,info){
		$('.temp').show();
		$('.is_del_box .title').text(title);
		$('.is_del_box .info').text(info);
		if($('.is_del_box').css('display') == 'none'){
			$('.is_del_box').fadeIn(500);
		}
		if(type == 1){//请出园区
			$('.confirm_btn').show();$('.confirm_btn').css('display','inline-block');$('.confirm_btn2').hide();
		}else{//删除
			$('.confirm_btn').hide();$('.confirm_btn2').show();$('.confirm_btn2').css('display','inline-block');
		}
	}
	/*关闭是否确认删除提示框*/
	$('.close_delBox,.cancel_btn,.temp').click(function(){
		$('.is_del_box').fadeOut(800);
		$('.temp').fadeOut(500);
	});
	
	/*请出园区？？*/
	var qcyq;
	$('.throw').click(function(){
		tishi(1,'请出园区','此操作无法回复，是否继续？');
		qcyq = $(this).parents('li').attr('date-id');
	});
	/*确认请出园区*/
	$('.confirm_btn').click(function(){
		$('.temp').fadeOut(500);
		$('.is_del_box').fadeOut(800);
		console.log("请出园区");
	});
	
	
	/*删除需求*/
	var del;
	$('.delSend_btn').click(function(){
		tishi(2,'删除','此操作无法回复，是否继续？');
		del = $(this).parents('li').attr('date-id');
	});
	
	/*确认删除*/
	$('.confirm_btn2').click(function(){
		$('.temp').fadeOut(500);
		$('.is_del_box').fadeOut(800);
		console.log("删除");
	});
	
	
	var send;
	$('.content_3_ul>li').hover(function(){
		send = $(this).index();
//		console.log(send);
	});
	
});