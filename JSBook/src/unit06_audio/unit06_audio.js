var Unit06_AudioScene = cc.Scene.extend({
    ctor : function(){
        this._super();
        cc.log("SceneA : ctor");
    },
    onEnter : function () {
        this._super();
        cc.log("SceneA : onEnter");
        // SceneA 标签显示
        var label = new cc.LabelTTF("This is SceneA.", "", 36);
        this.addChild(label);
        label.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        // 下一帧切换场景
        var callback = cc.callFunc(function(sender){
            var scene = new SceneB();
            cc.director.runScene(scene);
        }.bind(this));
        var seq = cc.sequence(callback);
        this.runAction(seq);
    },
    onEnterTransitionDidFinish : function () {
        this._super();
        cc.log("SceneA : onEnterTransitionDidFinish");
    },
    onExitTransitionDidStart : function () {
        cc.log("SceneA : onExitTransitionDidStart");
        this._super();
    },
    onExit : function () {
        cc.log("SceneA : onExit");
        this._super();
    }
});

var SceneB = cc.Scene.extend({
    ctor : function(){
        this._super();
        cc.log("SceneB : ctor");
        // 播放播放背景音乐
        cc.audioEngine.playMusic("res/unit06_audio/main_music.mp3");
    },
    onEnter : function () {
        this._super();
        cc.log("SceneB : onEnter");
        // SceneB 标签显示
        var label = new cc.LabelTTF("This is SceneB.", "", 36);
        this.addChild(label);
        label.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 - 100);
        // 创建15000个精灵
        for (var i = 0; i < 15000; i++){
            var node = new cc.Sprite(res.sh_node_128_png);
            this.addChild(node);
            node.setPosition(1.2 * i, cc.winSize.height / 2);
        }
    },
    onEnterTransitionDidFinish : function () {
        this._super();
        cc.log("SceneB : onEnterTransitionDidFinish");
    },
    onExitTransitionDidStart : function () {
        cc.log("SceneB : onExitTransitionDidStart");
        this._super();
    },
    onExit : function () {
        cc.log("SceneB : onExit");
        this._super();
    }
});

