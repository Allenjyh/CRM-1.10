$(function(){
	var content_input,title_input;
	$(".submit_btn").click(function(){
		title_input =$(".title-input").val();
		content_input =$("#content-input").val();
        
		if(title_input.length == 0 || content_input.length == 0){
			if(title_input.length == 0){
				alert("公告标题");
				return;
			}else{
				alert("公告内容")
				return;
			}
		}else if(title_input.length >0 && content_input.length >0){
			console.log(title_input)
			console.log(content_input)
              
		}
	})

	




})