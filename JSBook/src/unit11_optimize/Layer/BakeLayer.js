var BakeLayer = cc.Layer.extend({
    lastPrince : null,
    ctor : function(){
        this._super();

        this.loadMenu();
        this.loadSomePrince();
    },
    loadMenu : function(){
        var itemBake = new cc.MenuItemFont("bake", this.onBake, this);
        var itemUnbake = new cc.MenuItemFont("unbake", this.onUnbake, this);
        var itemRunAction = new cc.MenuItemFont("run action", this.onRunAction, this);

        var menu = new cc.Menu(itemBake, itemUnbake, itemRunAction);
        this.addChild(menu, 1);
        menu.alignItemsVertically();
        menu.x = cc.winSize.width - 100;
        menu.y = cc.winSize.height - 80;
    },
    loadSomePrince : function(){
        var node = null;
        var pos = cc.p(0, 0);
        for (var i = 0; i < 8000; i++) {    // 创建8000个精灵
            node = new cc.Sprite("#prince_stand_1.png");
            this.addChild(node);

            // 属性配置
            pos.x = Math.random() * cc.winSize.width + 150;
            pos.y = Math.random() * cc.winSize.height * 0.65;
            node.setPosition(pos);

            this.lastPrince = node;
        }
    },
    onBake : function(){
        this.bake();
    },
    onUnbake : function(){
        this.unbake();
    },
    onRunAction : function(){
        var move = cc.moveBy(2, cc.p(0, -200));
        //this.runAction(move);

        this.lastPrince.runAction(move);
    }
});
