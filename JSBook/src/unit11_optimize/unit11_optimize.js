var Unit11_OptimizeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.loadResource();
        // 加载[cc.pool示例]
        this.loadCCPoolLayer();
        //this.loadBatchNodeLayer();
        //this.loadBakeLayer();

    },
    // 加载[资源]
    loadResource : function(){
        cc.spriteFrameCache.addSpriteFrames(res.u11_prince_plist, res.u11_prince_png);
    },
    loadCCPoolLayer : function(){
        var layer = new CCPoolLayer();
        this.addChild(layer);
    },
    loadBatchNodeLayer : function(){
        var layer = new BatchNodeLayer();
        this.addChild(layer);
    },
    loadBakeLayer : function(){
        var layer = new BakeLayer();
        this.addChild(layer);
    }
});


// 书中代码
var Code = cc.Layer.extend({
    ctor : function(){
        this._super();
        var obj, objClass;
        cc.pool.putInPool(obj);
        cc.pool.hasObject(objClass);
        cc.pool.removeObject(obj);
        cc.pool.getFromPool(objClass);
        cc.pool.drainAllPools();
    },
    // 从pool中获取英雄
    addHeorByPool: function () {
        // ... ...
        for (var i = 0; i < 300; i++) {
            var node = SupportPoolHero.reCreate(4, 5, 6);
            this.addChild(node);
            node.setPosition(10 * i, cc.visibleRect.height * 0.8);
        }
        // ... ...
    },
    code12_1 : function(){

    },
    code12_2 : function(){
        if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
            _p.setTexture = _p._setTextureForWebGL;
            _p.visit = _p._visitForWebGL;
            _p.addChild = _p._addChildForWebGL;
            _p.removeAllChildren = _p._removeAllChildrenForWebGL;
            _p.sortAllChildren = _p._sortAllChildrenForWebGL;
            _p.draw = _p._drawForWebGL;
        } else {
            _p.ctor = _p._ctorForCanvas;
            _p.updateQuadFromSprite = _p._updateQuadFromSpriteForCanvas;
            _p.insertQuadFromSprite = _p._insertQuadFromSpriteForCanvas;
            _p.initWithTexture = _p._initWithTextureForCanvas;
            _p.appendChild = _p._appendChildForCanvas;
            _p.removeSpriteFromAtlas = _p._removeSpriteFromAtlasForCanvas;
            _p.getTexture = _p._getTextureForCanvas;
            _p.setTexture = _p._setTextureForCanvas;
            _p.visit = _p._visitForCanvas;
            _p.removeAllChildren = _p._removeAllChildrenForCanvas;
            _p.addChild = _p._addChildForCanvas;
            _p.sortAllChildren = _p._sortAllChildrenForCanvas;
            _p.draw = cc.Node.prototype.draw;
        }
    },
    code12_3 : function(){
        var layer = new cc.Layer();
        var node = null;
        var pos = cc.p(0, 0);
        for (var i = 0; i < 8000; i++) {    // 创建8000个精灵
            node = new cc.Sprite("#prince_stand_1.png");
            layer.addChild(node);

            // 配置[坐标属性]
            pos.x = Math.random() * cc.visibleRect.width;
            pos.y = Math.random() * cc.visibleRect.height;
            node.setPosition(pos);
        }
        layer.bake();
    },
    setRotation  : function(){
    cc.color(1);
    },
    getRotation : function(){

    },
    setRotationX : function(){

    },
    getRotationX : function(){

    },
    setRotationY : function(){

    },
    getRotationY : function(){

    },
    code03_02 : function(){
        var node, angle, radio;
        nodenode.setRotation(angle);
        node.getRotation();
        node.setRotationX(angle);
        node.getRotationX();
        node.setRotationY(angle);
        node.getRotationY();

        node.setScale(radio)
        node.getScale()
        node.setScaleX(radio)
        node.getScaleX()
        node.setScaleY(radio)
        node.getScaleY()

        var eventListener = cc.EventListener.create({
            event : cc.EventListener.KEYBOARD,
            onKeyPressed : function (keyCode, event) {
                cc.log("keyCode = " + keyCode + ", pressed!");
            },
            onKeyReleased : function (keyCode, envent) {
                cc.log("keyCode = " + keyCode + ", released!");
            }
        });
        // 添加事件监听
        cc.eventManager.addListener(eventListener, this);

    }

});

