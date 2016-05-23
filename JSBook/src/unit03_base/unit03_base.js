var Unit03_BaseScene = cc.Scene.extend({
    onEnter : function () {
        this._super();
        this.loadMainLayer();
    },
    loadMainLayer : function(){
        var layer = new Unit03_BaseLayer();
        this.addChild(layer);
    }
});

var Unit03_BaseLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        //this.loadSpriteByFile();
        //this.loadSpriteByTexture();
        //this.loadSpriteBySpriteSheet();
        //this.loadSpriteWidthColor();
        //this.loadLabelTTF();
        this.loadLabelBMFont();
    },
    loadSpriteByFile : function(){
        var node = new cc.Sprite(res.sh_node_256_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    },
    loadSpriteByTexture : function() {
        var textrue = cc.textureCache.addImage(res.sh_node_256_png);
        var node = new cc.Sprite(textrue);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    },
    loadSpriteBySpriteSheet : function(){
        cc.spriteFrameCache.addSpriteFrames(res.u11_prince_plist, res.u11_prince_png);
        var node = new cc.Sprite("#prince_stand_1.png");
        this.addChild(node);
        node.setPosition(200, 300);
    },
    loadSpriteWidthColor : function(){
        var node = new cc.Sprite();
        node.setColor(cc.color(255, 200, 10));          // 设置颜色
        node.setTextureRect(cc.rect(0, 0, 200, 200));   // 设置纹理区域
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    },
    loadLabel : function(){
        this.loadLabelTTF();
        this.loadLabelBMFont();
        this.loadLabelAtlas();
    },
    // 加载[LabelTTF字体标签]
    loadLabelTTF : function(){
        var node = new cc.LabelTTF("Hello World", "Arial", 32);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    },
    // 加载[LabelBMFont位图标签]
    loadLabelBMFont : function(){
        var node = new cc.LabelBMFont("123", "res/unit03_base/fonts/number.fnt");
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 - 150);
    },
    loadLabelAtlas : function(){
        var node = new cc.LabelAtlas("789", "res/unit03_base/fonts/score.png", 41, 50, '0');
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 - 75);
    }
});
