$(function(){
	// 消息头 合作客户 发布信息
	// $('.msg_head ul li').click(function(){
	// 	let msgID = $(this).index();
	// 	console.log(msgID)
	// })
	// 右边第一个卡片 通知 客户 聊天
	// $('.f_card ul li').click(function(){
	// 	let fcID=$(this).index();
	// 	$(this).addClass('f_card_active').siblings().removeClass('f_card_active');
	// 	console.log(fcID)
	// })
	//弹框消息开始 
	$('.thisclose').click(function(){
		$('.ul_msg li').fadeOut(500)
	});
	$(document).ready(function () { 
		let I = 1;
		// $('.popout_msg ul li:eq(' + I  + ')').addClass('popout_msg_active').siblings().removeClass('popout_msg_active').hide();
		$('.popout_msg ul li:eq(0)').addClass('popout_msg_active')
		$('.popout_msg ul li:eq(1)').addClass('popout_msg_active')
		$('.popout_msg ul li:eq(2)').addClass('popout_msg_active')
		$('.popout_msg ul li:eq(3)').addClass('popout_msg_active')
	} )
	//弹框消息结束
	 /*关注或取消关注*/
	 $('.cont_type .focus,.cont_type .cont_typelastli').click(function () {
		var thisId = $(this).attr('data-code');
		if ($(this).prop("className") == 'focus') {
			$(this).hide().siblings().show();
		} else {
			$('.cont_type .cont_typelastli').hide();
			$('.cont_type .focus').show();
		}
		// $.ajax({
		// 	type: "post",
		// 	url: "/follow",
		// 	data: {suffer_code: thisId},
		// 	dataType: 'json',
		// 	contentType: "application/x-www-form-urlencoded",
		// 	success: function (res) {
		// 		console.log(res);
		// 	},
		// 	error: function (msg) {
		// 		console.log(msg);
		// 	}
		// });
	})
	// 点击合作客户信息li
	$('.msg_company ul li').click(function(){
		var msg_company_id = $(this).index()
		console.log(msg_company_id)
	})
});