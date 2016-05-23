/** @expose */
window.io;
// 获取SocketIO
var SocketIO = SocketIO || window.io;

var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;
var Unit15_NetworkLayer = cc.Layer.extend({
    socket : null,
    ctor : function(){
        this._super();
        this.loadXMLHttpRequest();
        //this.loadWebSocket();
    },
    loadXMLHttpRequest : function(){
        var xhr = cc.loader.getXMLHttpRequest();
        // 链接服务器，url格式为： <URL>?xxx=xxx&yyy=yyy
        //xhr.open("GET", "http://httpbin.org/get?show_env=1", true);
        xhr.open("POST", "http://httpbin.org/post");
        // 请求发送
        //xhr.send();
        xhr.send("This is message...(use POST)!");
        // 回调函数
        xhr.onreadystatechange = function () {
            // 请求结束
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                cc.log("Get 请求成功！");
                cc.log("请求状态码：", xhr.status);
                cc.log("响应状态：", xhr.statusText);
                cc.log("响应报文：", xhr.responseText);
            }
        };
    },
    loadWebSocket : function(){

        var self = this;
        var socket = new WebSocket("ws://echo.websocket.org");
        this.socket = socket;
        socket.binaryType = "arraybuffer";
        socket.onopen = function(event) {    // 打开
            cc.log("连接成功！开始发送数据");
        };
        socket.onmessage = function(event) { // 响应
            var arrData = new Uint16Array(event.data);
            var data = "";
            for (var i = 0; i < arrData.length; i++) {
                if (arrData[i] == 0) {
                    data += "\'\\0\'";
                } else {
                    var hexChar = "0x" + arrData[i].toString("16").toUpperCase();
                    data += String.fromCharCode(hexChar);
                }
            }
            cc.log("收到响应数据：", data);
        };
        socket.onerror = function(event) {   // 错误
            cc.log("发生错误！");
        };
        socket.onclose = function(event) {   // 关闭
            cc.log("链接关闭！");
            self.socket = null;
        };

        // 延迟一段时间之后发送数据
        var delay = cc.delayTime(2);
        var callFunc = cc.callFunc(function(){
            if (socket.readyState == WebSocket.OPEN) {
                var strData = "这是客户端发送的字符码数据。";
                var arrData = new Uint16Array(strData.length);
                for (var i = 0; i < strData.length; i++) {
                    arrData[i] = strData.charCodeAt(i);
                }
                socket.send(arrData.buffer);
                cc.log("数据发送完毕！");
            } else {
                cc.log("连接未打开！");
            }
        }.bind(this));
        this.runAction(cc.sequence(delay, callFunc));
    },
    onExit : function(){
        this.socket.close();
        this._super();
    }
});

var Unit15_NetworkScene = cc.Scene.extend({
    onEnter : function () {
        this._super();
        this.loadLayer();
    },
    loadLayer : function(){
        var node = new Unit15_NetworkLayer();
        this.addChild(node);
    }
});