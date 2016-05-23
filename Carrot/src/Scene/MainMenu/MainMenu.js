var MainMenuScene = cc.Scene.extend({
    backgroundLayer : null,
    mainLayer       : null,
    unlockLayer     : null,
    ctor : function(){
        this._super();
        cc.audioEngine.playMusic(res.sd_mm_BGMusic_mp3, true);
    },
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
        var listener = cc.EventListener.create({
            event       : cc.EventListener.CUSTOM,
            target      : this,
            eventName   : jf.EventName.OPEN_UNLOCK_UP_LAYER,
            callback    : this.onLoadUnlockLayer
        });
        cc.eventManager.addListener(listener, this);
    },
    onLoadUnlockLayer : function(event){
        var target = event.getCurrentTarget();  // 获取当前事件监听器的事件源
        target.unlockLayer = new MMUnlockLayer();
        target.addChild(target.unlockLayer);
    },
    loadResource : function(){
    },
    loadBackgroundLayer : function(){
        this.backgroundLayer = new MMBackgroundLayer();
        this.addChild(this.backgroundLayer);
    },
    loadMainLayer : function(){
        this.mainLayer = new MMMainLayer();
        this.addChild(this.mainLayer);
    }
});