$(function(){
	var index,index1,index2;
	$('.scr-type ul li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
	
	$('.scr-area ul li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
	
	var showMoreHy = 0;
	$('.showMore-hy').click(function(){
		showMoreHy++;
		if (showMoreHy%2 == 1) {
			$('.scr-hy-all').stop();
			$('.scr-hy-all').slideDown();
			$('.showMore-hy').css({"color":"#198CFF"});
		} else{
			$('.scr-hy-all').stop();
			$('.scr-hy-all').slideUp();
			$('.showMore-hy').css({"color":"rgba(0,0,0,0.85)"});
			$('.scr-hy-info-all>ul>li').hide();
			$('.scr-hy-info>ul>li').hide();
		}
	})
	
	$('.scr-hy-title li').click(function(){
		index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		if (index==0) {
			
		} else{
			if($(".scr-hy-info>ul>li").eq(index).css("display")=="none") {
				$('.scr-hy-info-all>ul>li').hide();
				$('.scr-hy-all li').removeClass('active');
				$('.scr-hy-info>ul>li').stop();
				$('.scr-hy-info>ul>li').eq(index).slideDown().siblings().slideUp();
			}else{
				$('.scr-hy-info>ul>li').eq(index).slideUp();
				$('.scr-hy-title li').removeClass('active');
			}
		}
		
		index1 = false;
	})
	
	$('.scr-hy-all li').click(function(){
		index1 = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		if($(".scr-hy-info-all>ul>li").eq(index1).css("display")=="none") {
			$('.scr-hy-info>ul>li').hide();
			$('.scr-hy-title li').removeClass('active');
			$('.scr-hy-info-all>ul>li').stop();
			$('.scr-hy-info-all>ul>li').eq(index1).slideDown().siblings().slideUp();
		}else{
			$('.scr-hy-info-all>ul>li').eq(index1).slideUp();
			$('.scr-hy-all li').removeClass('active');
		}
		index=false;
	})
	
	$('.scr-hy-once li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		index2 = $(this).index();
		if (index==false) {
			console.log(index1+10+"..."+index2);
		} else{
			console.log(index+"..."+index2);
		}
	})
	
	/*筛选*/
	$('.screen ul li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})

	var module1 = document.querySelectorAll('.list_ct_right');
	for (var i=0;i<module1.length; i++) {
		$clamp(module1[i], {clamp: 2});
	}
})
