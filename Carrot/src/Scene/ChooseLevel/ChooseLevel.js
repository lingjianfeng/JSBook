var ChooseLevelScene = cc.Scene.extend({
    backgroundLayer : null,
    uiLayer         : null,
    ctor : function(){
        this._super();
        if (!cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.playMusic("res/Sound/MainMenu/BGMusic.mp3", true);
        }
    },
    onEnter : function () {
        this._super();
        // 加载[资源]
        this.loadResource();
        // 加载[背景层]
        this.loadBackgroundLayer();
        // 加载[主层]
        this.loadMainLayer();
    },
    loadResource : function(){
        cc.spriteFrameCache.addSpriteFrames(res.cl_route_plist, res.cl_route_png);
    },
    loadBackgroundLayer : function(){
        this.backgroundLayer = new CLBackgroundLayer();
        this.addChild(this.backgroundLayer);
    },
    loadMainLayer : function(){
        this.uiLayer = new CLUILayer();
        this.addChild(this.uiLayer);
    }
});
