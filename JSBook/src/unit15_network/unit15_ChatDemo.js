var SocketIO = SocketIO || window.io;
var Unit15_ChatDemoScene = cc.Scene.extend({
    onEnter : function () {
        this._super();
        this.loadLayer();
    },
    loadLayer : function(){
        var node = new Unit15_ChatDemoLayer();
        this.addChild(node);
    }
});

var Unit15_ChatDemoLayer = cc.Layer.extend({
    socketIO        : null,
    playerData      : {},
    isLogin         : false,
    listView        : null,
    inputText       : null,
    onlineCountText : null,
    ctor : function(){
        this._super();
        this.loadData();
        this.loadUserInfo();
        this.loadListView();
        this.loadInputTextFiled();
        this.loadSendButton();
        this.loadSocketIO();
    },
    loadData : function(){
        var data = {
            playerId : 10001,
            playerName : "吕布"
        };
        this.playerData = data;
    },
    // 加载[玩家信息显示]
    loadUserInfo : function(){
        var offset = 30;
        var id = this.playerData.playerId;
        var name = this.playerData.playerName;
        // 玩家名字
        var playerNameText = new ccui.Text("玩家名字：" + name.toString(), "", 22);
        this.addChild(playerNameText);
        playerNameText.setAnchorPoint(0.5, 0);
        playerNameText.setPosition(cc.winSize.width / 2 , 30);
        // 玩家ID
        var playerIdText = new ccui.Text("玩家ID：" + id.toString(), "", 22);
        this.addChild(playerIdText);
        playerIdText.setAnchorPoint(0.5, 0);
        playerIdText.setPosition( playerNameText.x - playerNameText.width  - offset, 30);
        // 在线人数
        var onlineCountText = new ccui.Text("在线人数：1", "", 22);
        this.addChild(onlineCountText);
        this.onlineCountText = onlineCountText;
        onlineCountText.setAnchorPoint(0.5, 0);
        onlineCountText.setPosition( playerNameText.x + playerNameText.width  + offset, 30);
    },
    // 加载[聊天列表视图]
    loadListView : function(){
        var node = new ccui.ListView();
        this.addChild(node);
        this.listView = node;
        node.setContentSize(cc.size(568, 320));
        node.setItemsMargin(8);
        node.setPosition((cc.winSize.width - node.width) / 2,
            (cc.winSize.height - node.height) / 2 + 30);
        node.setDirection(ccui.ScrollView.DIR_VERTICAL);
        node.setTouchEnabled(true);
        node.setBounceEnabled(true);
        node.setBackGroundImage("res/unit10_ui/scale9.png");
        node.setBackGroundImageScale9Enabled(true);
    },
    loadInputTextFiled : function(){
        var node = new ccui.TextField("请输入你要说的话...", "Arial", 30);
        this.addChild(node);
        this.inputText = node;
        node.setAnchorPoint(0.5, 0);
        node.setPosition(cc.winSize.width / 2, 130);
    },
    // 加载[发送按钮]
    loadSendButton : function(){
        // ... ...
        var fileName = "res/unit10_ui/scale9.png";
        var node = new ccui.Button();
        this.addChild(node);
        node.setAnchorPoint(0.5, 0);
        node.setPosition(cc.winSize.width / 2, 70);
        node.loadTextures(fileName, fileName, fileName);
        node.setTouchEnabled(true);     // 设置触摸
        node.setScale9Enabled(true);    // 设置是9宫格按钮
        node.setContentSize(cc.size(150, 48));  // 设置内容大小
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.1);
        node.setTitleText("发送");
        node.setTitleFontSize(28);
        node.addTouchEventListener(function(sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    var message = this.inputText.getString();
                    this.onSendMessage(message);
                    this.inputText.setString(""); // 清空编辑框内容
                break;
            }
        }.bind(this));
    },
    loadSocketIO : function(){
        var socketIO = SocketIO.connect('127.0.0.1:3000' );
        this.socketIO = socketIO;   // 保存socketIO

        var self = this;
        socketIO.on("connect", function(data){
            cc.log("连接服务器成功...");
            // 发送[登录请求]
            socketIO.emit('login', JSON.stringify(self.playerData));

            // 监听[玩家登录]
            socketIO.on('login', function(obj){
                var data = JSON.parse(obj);
                self.isLogin = true;
                self.onlineCountText.setString("在线人数：" + data.onlineCount);
                cc.log("玩家【" + data.player.playerName + "】进入游戏了！");
            });

            // 监听[玩家聊天]
            socketIO.on('message', function(obj){
                var data = JSON.parse(obj);
                var string = data.playerName + "[" + data.playerId + "] 说：" + data.content;
                self.applyMessageText(string);
            });

            // 监听[玩家退出]
            socketIO.on('logout', function(obj){
                var data = JSON.parse(obj);
                self.onlineCountText.setString("在线人数：" + data.onlineCount);
                cc.log("玩家【" + data.player.playerName + "】退出游戏！");
            });
        });
    },
    // 发送[信息]
    onSendMessage : function(message){
        if (!this.isLogin){ cc.log("没有登录"); return }
        if (!message) { return; }   // 空字符串则不发送

        var messageData = {
            playerId : this.playerData.playerId,
            playerName : this.playerData.playerName,
            content : message
        };
        // 发送[聊天请求]
        this.socketIO.emit('message', JSON.stringify(messageData));
    },
    // 添加信息文本到ListView
    applyMessageText : function(string){
        var layout = new ccui.Layout();
        this.listView.pushBackCustomItem(layout);

        var text = new ccui.Text(string, "", 18);
        layout.setContentSize(text.getContentSize());
        text.setPosition(layout.width / 2, layout.height / 2);
        layout.addChild(text);
    },
    onExit : function(){
        this.socketIO.disconnect(); // 关闭连接
        this._super();
    }
});