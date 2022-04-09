$('.bander_2').hide();
$('.bander_3').hide();
var bool = true;

$('.tag_btn_create').click( () => {
    $('.bander_2').show();
})


$('.close_sub_create').click(  () => {
    $('.bander_2').hide();
})


$('.tag_btn_join').click( () => {
    $('.bander_3').show();
})

$('.close_sub_join').click( () => {
    $('.bander_3').hide()
})


$('.change_picture').click( ()=> {
    if(bool){
        $('.upload').css('display' , 'block');
        bool = false;
    }else{
        $('.upload').css('display' , '');
        bool = true;
    }
})







