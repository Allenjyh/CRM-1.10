$(function(){
	// 75个字截断
	var i = $('.box1_p').text();
	if(i.length > 75){
		var j = i.slice(0,74);
		$('.box1_p').text(j+'...');
	}else{
		$('.box1_span').hide();
	}
	$('.box1_span').click(function(){
		$('.mask_box1').css({'z-index':'666','opacity':'1'});
	})
	$('.mask_box1').click(function(){
		$('.mask_box1').css({'z-index':'-666','opacity':'0'});
	})
	$('.box3_span').click(function(){
		$('.mask_box2').css({'z-index':'666','opacity':'1'});
	})
	$('.mask_box2').click(function(){
		$('.mask_box2').css({'z-index':'-666','opacity':'0'});
	})

})