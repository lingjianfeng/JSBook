var EffectNode = cc.Sprite.extend({
    ctor : function (fileName, rect, rotated) {
        this._super(fileName, rect, rotated);
        this.loadAction();
    },
    loadAction : function(){
        this.stopAllActions();
        this.setScale(0.35);
        this.setOpacity(255);
        var time = 0.8;

        var delay = cc.delayTime(time * 0.8);
        var fadeOut = cc.fadeOut(time * 0.7).easing(cc.easeExponentialOut());
        var delayOut = cc.sequence(delay, fadeOut);
        this.runAction(delayOut);

        var callback = cc.callFunc(this.loadAction.bind(this), this);
        var scaleTo12 = cc.scaleTo(time, 1.35);
        var delayCall = cc.delayTime(1);
        var seq = cc.sequence(scaleTo12, delayCall, callback);
        this.runAction(seq);
    }
});

var RouteButtonEffect = cc.Node.extend({
    effectArray : [],
    ctor : function(){
        this._super();
        this.loadEffectNode();
    },
    loadEffectNode : function(){
        function addEffectNode(){
            node = new EffectNode("res/ChooseLevel/stagemap_local.png");
            this.addChild(node);
            this.effectArray.push(node);
        }
        var node = null;
        for (var i = 0; i < 3; i++) {
            var delayTime = cc.delayTime(0.25 * i);
            var callback = cc.callFunc(addEffectNode.bind(this), this);
            var seq = cc.sequence(delayTime, callback);
            this.runAction(seq);
        }
    }
});

