var SupportPoolHero = cc.Sprite.extend({
    _hp : 0,    // 血量
    _sp : 0,    // 愤怒
    _mp : 0,    // 魔法
    ctor: function (hp, mp, sp) {
        this._super(res.sh_node_64_png);
        this.initData(hp, mp, sp);
    },
    initData: function (hp, mp, sp) {
        this._hp, this._mp, this._sp = hp, mp, sp;
    },
    unuse: function () {
        this._hp = this._mp = this._sp = 0;
        this.retain(); // 使其引用计数+1，防止被内存回收
        this.removeFromParent();
    },
    reuse: function (hp, mp, sp) {
        this.initData(hp, mp, sp);
    }
});

SupportPoolHero.create = function (hp, mp, sp) {
    return new SupportPoolHero(hp, mp, sp)
};

SupportPoolHero.reCreate = function (hp, mp, sp) {
    // 判断[对象缓冲池中是否有可用对象]
    if (cc.pool.hasObject(SupportPoolHero)){
        // 从对象缓冲池中获取对象
        return cc.pool.getFromPool(SupportPoolHero, hp, mp, sp);
    }else{
        // 创建一个新的对象
        return  SupportPoolHero.create(hp, mp, sp);
    }
};