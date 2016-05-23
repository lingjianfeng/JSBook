var GPBackgroundLayer = cc.Layer.extend({
    onEnter : function () {
        this._super();
        // 加载[背景]
        this.loadBackgound();
    },
    loadBackgound : function(){
        var themID = GameManager.getThemeID();
        var node = new cc.Sprite("res/GamePlay/Theme/Theme" + themID + "/BG0/BG" + themID + ".png");
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    }
});