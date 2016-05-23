var GameResultScene = cc.Scene.extend({
    backgroundLayer : null, // 背景层
    mainLayer       : null, // 玩法层
    onEnter : function () {
        this._super();
        // 加载[资源]
        this.loadResource();
        // 加载[背景层]
        this.loadBackgroundLayer();
        // 加载[主层]
        this.loadMainLayer();
        // 注册[事件]
        this.registerEvent();
    },
    registerEvent : function(){
    },
    loadResource : function(){
    },
    loadBackgroundLayer : function(){
        var node = new GSBackgroundLayer();
        this.addChild(node);
        this.backgroundLayer = node;
    },
    loadMainLayer : function(){
        var node = new GSMainLayer();
        this.addChild(node);
        this.mainLayer = node;
    }
});