// 说明： 这是服务端代码。
// 说明： 这是服务端代码。
// 说明： 这是服务端代码。
// 说明： 这是服务端代码。

var app = require("express")();          // 引入express模块
var http =  require("http").Server(app); // 引入http模块
var io = require("socket.io")(http);     // 引socket.io模块
var onlineplayers = {};     // 在线玩家信息
var onlineCount = 0;        // 当前在线人数

// 监听连接
io.on("connect", function (socket) {
    console.log("一个用户连接了！");

    // 监听玩家[登录]
    socket.on("login", function(obj){
        var data = JSON.parse(obj); // 从字符串中解析出json对象
        // 将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = data.playerId;
        // 检查在线列表，如果不在里面就加入
        if(!onlineplayers.hasOwnProperty(data.playerId)) {
            onlineplayers[data.playerId] = data.playerName;
            onlineCount++;  //在线人数+1
        }
        var loginData = {onlineplayers : onlineplayers, onlineCount : onlineCount, player : data};
        // 向所有客户端广播用户加入
        io.emit("login", JSON.stringify(loginData));
        console.log("【" + data.playerName + "】进入了游戏！");
    });

    // 监听玩家发布聊天内容
    socket.on("message", function(obj){
        // 向所有客户端广播发布的消息
        io.emit("message", obj);
        var data = JSON.parse(obj);
        console.log(data.playerName + "说：" + data.content);
    });

    // 监听玩家[退出]
    socket.on("disconnect", function(){
        //将退出的用户从在线列表中删除
        if(onlineplayers.hasOwnProperty(socket.name)) {
            // 退出玩家的信息
            var playerData = { playerId : socket.name, playerName : onlineplayers[socket.name]};
            delete onlineplayers[socket.name];  // 删除玩家
            onlineCount--;  // 在线人数-1

            var logoutData = {onlineplayers : onlineplayers, onlineCount : onlineCount, player : playerData};
            //向所有客户端广播用户退出
            io.emit("logout", JSON.stringify(logoutData));
            console.log(playerData.playerName + "退出了游戏");
        }
    });
});

http.listen(3000, function(){
    console.log("listening on : 3000");
});