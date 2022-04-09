const express = require('express')
const fs = require('fs');
const { join } = require('path');
const map = new Map();
let socketchat = (io) => {
    let ReadFile = (nameroom) => {
        return fs.readFileSync(nameroom , 'utf8').split('\n');
    }
    let DataFromServer = (map , nameroom , messenger  , user ,  boolean) => {
        const User = map.get(nameroom);
        const User2 = JSON.stringify(Array.from(User))
        const DataToClient = {
            Mes : messenger,
            UserInRoom :  User2 ,
            check : boolean , 
            User : user
        }
        io.in(nameroom).emit('savemes' , JSON.stringify(DataToClient));
    }
    let User = (username , picture) => {
        return {
            name : username , 
            avatar : picture
        }
    }
    io.on('connection' , socket => {
        socket.on('mes' , content => {
            const messenger = {
                id : content.id , 
                name : content.username ,
                picture : content.picture , 
                mes : content.mes,
                check : content.checking
            }
            fs.appendFileSync(content.nameroom , JSON.stringify(messenger) + "\n" , 'utf8');
            socket.to(content.nameroom).emit('givemes' , content);
        })
        socket.on('joinroom' , user => {
            if(map.has(user.nameroom)===false){
                const newmap = new Map();
                newmap.set(user.id , User(user.username , user.picture));
                map.set(user.nameroom , newmap);
                fs.open(user.nameroom , 'w' , err => {
                    if(err) throw err
                })
                socket.join(user.nameroom)
            }else{
                const UserInRoom = map.get(user.nameroom);
                if(UserInRoom.has(user.id)===false){
                    UserInRoom.set(user.id , User(user.username , user.picture));
                    map.delete(user.nameroom);
                    map.set(user.nameroom , UserInRoom);
                    socket.join(user.nameroom)
                    DataFromServer(map , user.nameroom , ReadFile(user.nameroom) , user , true)
                }else{
                    socket.join(user.nameroom);
                    DataFromServer(map , user.nameroom , ReadFile(user.nameroom)  , user ,false);
                }
            }
        })

        socket.on('user_out' , UserOut => {
            const User = map.get(UserOut.nameroom)
            User.delete(UserOut.id);
            map.delete(UserOut.nameroom);
            map.set(UserOut.nameroom , User);
            socket.to(UserOut.nameroom).emit('out_room' , {id : UserOut.id , name : UserOut.user})
            socket.leave(UserOut.nameroom)
        })

        socket.on('image' , infor => {
            const MessenImg = {
                id : infor.id , 
                name : infor.username ,
                picture : infor.picture , 
                mes : infor.mes,
                check : infor.check
            }
            fs.appendFileSync(infor.nameroom , JSON.stringify(MessenImg) + '\n' , 'utf8')
            socket.to(infor.nameroom).emit('givemes' , infor);
        })
    })
}


module.exports = socketchat
