var Unit07_DesignScene = cc.Scene.extend({
    onEnter : function(){
        this._super();

        //cc.view.setDesignResolutionSize(1136, 640, cc.ResolutionPolicy.FIXED_HEIGHT);
        //cc.director.setContentScaleFactor(768 / 640);

        //cc.view.setDesignResolutionSize(1024, 768, cc.ResolutionPolicy.SHOW_ALL);
        //cc.view.setDesignResolutionSize(1024, 768, cc.ResolutionPolicy.NO_BORDER);
        //cc.view.setDesignResolutionSize(1024, 768, cc.ResolutionPolicy.EXACT_FIT);
        //cc.view.setDesignResolutionSize(1024, 768, cc.ResolutionPolicy.FIXED_WIDTH);
        //cc.view.setDesignResolutionSize(1136, 640, cc.ResolutionPolicy.FIXED_HEIGHT);

        this.loadLayer();
    },
    loadLayer : function(){
        var node = new Unit07_DesignLayer();
        this.addChild(node);
    }
});

var Unit07_DesignLayer = cc.Layer.extend({
    ctor : function(){
        this._super();
        this.loadBackground();
    },
    loadBackground : function(){
        var node = new cc.Sprite("res/unit07_design/background.png");
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    }
});