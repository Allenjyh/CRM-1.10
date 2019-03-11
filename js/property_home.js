$(function(){
	$('.lastsubmit').click(function(){
		$('.thissubmit').click();
	});
    $('#demo1').click(function(){
        $('#test1').click();
    })
    $('.propert_textarea').keydown(function(){
        let text = $('.propert_textarea').val();
        let textnumber = $('.propert_textarea').val().length;
        if(textnumber <= 600){
            $('.newnumber').text(textnumber);
        }else{
            $('.propert_textarea').val(text.substring(0,600));
        }
        console.log(textnumber);
    })
    function textnull(thisclass){   //不为空判断
        let Unull = $(thisclass).val();
        if(Unull == ''){
            $(thisclass).css({'border':'1px solid #F52230'});
            return false;
        }else{
            $(thisclass).css({'border':'1px solid #5FCC29'});
            return true;
        }
    }

    $('#propertyform').submit(function(){
        if(textnull('.property_text') == true && textnull('.propert_textarea') == true){
            return true;
        }else{
            return false;
        }
    })
})