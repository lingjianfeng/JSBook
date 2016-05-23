var BatchNodeLayer = cc.Layer.extend({
    batchNode : null,
    ctor : function(){
        this._super();
        // 第一步：加载[资源]
        this.loadResource();
        // 第二步：加载[BatchNode]
        this.loadBatchNode();
        // 第三步：加载[8000个精灵]
        this.loadSomePrince();
    },
    // 加载[资源]
    loadResource : function(){
        cc.textureCache.addImage(res.u13_prince_png);
        cc.spriteFrameCache.addSpriteFrames(res.u13_prince_plist);
    },
    // 加载[SpriteBatchNode]
    loadBatchNode : function(){
        this.batchNode = new cc.SpriteBatchNode(res.u13_prince_png);
        this.addChild(this.batchNode);
    },
    // 加载[8000个精灵]_并将其添加到this.batchNode中
    loadSomePrince : function(){
        var node = null;
        var pos = cc.p(0, 0);
        for (var i = 0; i < 8000; i++) {    // 创建8000个精灵
            node = new cc.Sprite("#prince_stand_1.png");
            //this.batchNode.addChild(node);  // 添加到batchNode对象中
            this.addChild(node);

            pos.x = Math.random() * cc.visibleRect.width;
            pos.y = Math.random() * cc.visibleRect.height;
            node.setPosition(pos);
        }
    }
});
