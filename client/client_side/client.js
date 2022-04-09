var socket = io();
var pageURL = $(location).attr('href');
var check = true;
if(pageURL.indexOf('name_of_room')!==-1){ 
    var i=pageURL.length-1;
    while(pageURL[i]!=="="){
        i--;
    }
    const content_user = {
        username : $('.username').text(),
        nameroom : pageURL.slice(i+1 , pageURL.length),
        id : $('.id').text(),
        value : true ,
        picture : $('.avatar').attr('src')
    }
    var NameRoom = content_user.nameroom
    socket.emit('joinroom' , content_user);
}

$('.thank').hide();

$('.form_chat').submit(function(e){
   const content = {
        nameroom : NameRoom,
        mes : $('.chat_content').val(),
        username : $('.username').text(),
        id : $('.id').text() , 
        picture : $('.avatar').attr('src'), 
        checking : true
   }
   $('.messenger').append('<div class="chat_right"> Bạn ' + '</div>')
   $('.messenger').append('<div class="chat_right_parent">' + '<span class="chatright">' + content.mes + '</span>' + '</div>')
   socket.emit('mes' , content);
   this.reset()
   return false;
})

socket.on('givemes' , content_mes => {
    const picture = "<img class='avatar_user' src='" + content_mes.picture + "'>"
    $('.messenger').append('<div class="user_name">' + content_mes.username + '</div>')
    if(content_mes.checking){
        $('.messenger').append('<div class="chat_left_parent">' + picture + '<span class="chatleft">' + content_mes.mes + '</span>' + '</div>')
    }else{
        $('.messenger').append('<div class="image_left">'  + picture +  '<img class="pre_left" witdh="150px" height="200px"' + 'src="' + content_mes.mes + '">' + '</div>')
    }
})

socket.on('savemes' , DataFromServer => {
    saveMessenger(DataFromServer)
    UserActive (DataFromServer)
})



$('.send_picture_sub').click(function(){
    if(check===true){
        $('.send_picture_parent').css('display' , 'block');
        $('.send_picture_sub').css('color' , 'hsl(214, 89%, 52%)')
        check=false;
    }else{
        $('.send_picture_parent').css('display' , '');
        $('.send_picture_sub').css('color' , '')
        check=true;
    }
   
})

$('.out_button').click(function(){
    const UserDelete = {
        nameroom : NameRoom,
        id : $('.id').text() ,
        user : $('.username').text()
    }
    socket.emit('user_out' , UserDelete);
    $('.thank').show();
    $('.all').hide();
})

socket.on('out_room' , user => {
    if(user.id !== $('.id').text()){
        $('.messenger').append('<div class="notification">' + user.name + ' had out' + '</div>' )
    }
    $('.live_active > div').each(function(){
        if($(this).children().text()===user.id){
            $(this).remove();
        }
    })
})

$('.form_img').submit(function(e){
    e.preventDefault();
    var file = $('.give_picture')[0].files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
        const infor = {
            nameroom : NameRoom,
            username : $('.username').text() , 
            id : $('.id').text(),
            picture : $('.avatar').attr('src'),
            mes : event.target.result,
            chenking : false
        }
        socket.emit('image', infor);
        $('.messenger').append('<div class="chat_right"> Bạn ' + '</div>')
        $('.messenger').append('<div class="image">'  + '<img class="pre" witdh="150px" height="200px"' + 'src="' + event.target.result + '">' + '</div>')
    }
})

const UserActiveRoom  = [];

function UserInRoom(id , UserActiveRoom) {
    return UserActiveRoom.find(iduser => id === iduser)
}

function saveMessenger(DataFromServer){
    const Data = JSON.parse(DataFromServer);
    if(Data.User.id !== $('.id').text() &&  Data.check === true){
        $('.messenger').append('<div class="notification">' + Data.User.username + ' had join' + '</div>' )
    }
    const vari = Data.Mes;
    if(Data.User.id === $('.id').text()){
        for (var i = 0 ; i < vari.length - 1 ; i++){
            const Messenger1 = vari[i];
            const Messenger = JSON.parse(Messenger1);
            if(Messenger.id === $('.id').text()){
                $('.messenger').append('<div class="chat_right"> Bạn ' + '</div>');
                if(Messenger.check){
                    $('.messenger').append('<div class="chat_right_parent">' + '<span class="chatright">' + Messenger.mes + '</span>' + '</div>');
                }else{
                    $('.messenger').append('<div class="image">'  + '<img class="pre" witdh="100px" height="100px"' + 'src="' + Messenger.mes + '">' + '</div>')
                } 
            }else{
                $('.messenger').append('<div class="user_name">' + Messenger.name + '</div>')
                const picture = '<img class="avatar_user" src="' + Messenger.picture + '">'
                if(Messenger.check){
                    $('.messenger').append('<div class="chat_left_parent">' + picture + '<span class="chatleft">' + Messenger.mes + '</span>' + '</div>')
                }else{
                    $('.messenger').append('<div class="image_left">'  + picture +  '<img class="pre_left" witdh="100px" height="100px"' + 'src="' + Messenger.mes + '">' + '</div>')
                }
            }
        }
    }
}


function UserActive(DataFromServer){
    const Data = JSON.parse(DataFromServer);
    const map  = new Map(JSON.parse(Data.UserInRoom));
    for (const [id , user] of map){
        if(id !== $('.id').text() && UserInRoom(id , UserActiveRoom)===undefined){
            const picture = '<img class="avatar_user" src="' + user.avatar + '">'
            $('.live_active').append('<div class="user_acting">' + picture +  user.name + 
                '<div class="id_user">' + id + '</div>'
                 + '</div>')
            UserActiveRoom.push(id)
        }
    }
}
