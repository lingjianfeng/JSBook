var Unit09_ParticleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new ParticleLayer();
        this.addChild(layer);
    }
});

// ==================================================================
// --------------------------- 粒子系统  -----------------------------
// ==================================================================
var ParticleLayer = cc.Layer.extend({
    ctor : function () {
        this._super();

        var particle = new cc.ParticleSystem(res.u9_fire_plist);
        this.addChild(particle);
        particle.setPosition(cc.winSize.width / 2, 100);
    }
});

