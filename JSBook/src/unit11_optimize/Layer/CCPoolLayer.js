var CCPoolLayer = cc.Layer.extend({
    createCount         : 3000,
    createHeroList      : [],
    reCreateHeroList    : [],
    timeList            : {},
    ctor : function(){
        this._super();
        // 加载[菜单]_2种方式创建对象
        this.loadMenu();
        // 加载[标签]_加载时间反馈
        this.loadLabelInfo();
        // 为pool准备对象
        this.prepareHeroForPool();
    },
    // 加载[菜单]_2种方式创建对象
    loadMenu : function(){
        // 创建[标签]_按钮文本说明
        var labCreate = new cc.LabelTTF("直接创建" + this.createCount + "个精灵！", "Arial", 24);
        var labReCreate = new cc.LabelTTF("使用pool创建" + this.createCount + "个精灵！", "Arial", 24);

        // 创建[菜单项]
        var itemCreate = new cc.MenuItemLabel(labCreate, this.addSpriteByCreate, this);
        var itemReCreate = new cc.MenuItemLabel(labReCreate, this.addHeorByPool, this);

        // 创建[菜单]
        var menu = new cc.Menu(itemCreate, itemReCreate);
        menu.alignItemsHorizontallyWithPadding(150);
        this.addChild(menu);
    },
    // 加载[标签]_加载时间反馈
    loadLabelInfo : function(){
        // 创建[标签]
        this.labDirect = new cc.LabelTTF("直接创建耗费:", "Arial", 18);
        this.labDirect.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(-230, -65)));
        this.labDirect.anchorY = 0;
        this.addChild(this.labDirect);

        // 创建[标签]
        this.poolLabel = new cc.LabelTTF("使用pool创建耗费:", "Arial", 18);
        this.poolLabel.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(200, -65)));
        this.poolLabel.anchorY = 0;
        this.addChild(this.poolLabel);
    },
    // 准备工作[创建好对象，并把他们放入对象缓冲池]
    prepareHeroForPool : function(){
        for (var i = 0; i < this.createCount; i++) {
            var node = SupportPoolHero.create(0, 0, 0);
            this.addChild(node);
            cc.pool.putInPool(node);
        }
    },
    // 添加[精灵]_直接生成
    addSpriteByCreate: function () {
        this.createHeroList = [];
        this.timeStart("directly");
        for (var i = 0; i < this.createCount; i++) {
            var node = SupportPoolHero.create(1, 2, 3);
            this.createHeroList.push(node);
            this.addChild(node);
            node.setPosition(10 * i, cc.visibleRect.height * 0.8);
        }
        this.setDirectLabel(this.timeEnd("directly"));
        this.scheduleOnce(function(){
            for (var i = 0; i < this.createHeroList.length; i++) {
                this.createHeroList[i].removeFromParent(true);
            }
            this.createHeroList = [];
        }, 0.5);
    },
    // 从pool中获取英雄
    addHeorByPool: function () {
        this.reCreateHeroList = [];
        this.timeStart("use Pool");
        for (var i = 0; i < this.createCount; i++) {
            var node = SupportPoolHero.reCreate(4, 5, 6);
            this.reCreateHeroList.push(node);
            this.addChild(node);
            node.setPosition(10 * i, cc.visibleRect.height * 0.8);
        }
        this.setPoolLabel(this.timeEnd("use Pool"));
        this.scheduleOnce(function(){
            for (var i = 0; i < this.reCreateHeroList.length; i++) {
                cc.pool.putInPool(this.reCreateHeroList[i]);
            }
            this.reCreateHeroList = [];
        }, 0.5);
    },
    timeStart: function (name) {
        this.timeList[name] = {startTime: Date.now(), EndTime: 0, DeltaTime: 0};
    },
    timeEnd: function (name) {
        var obj = this.timeList[name];
        obj.EndTime = Date.now();
        obj.DeltaTime = obj.EndTime - obj.startTime;
        return obj.DeltaTime;
    },
    setDirectLabel: function (time) {
        if (time == 0) {
            time = "<1";
        }
        this.labDirect.setString("直接创建耗费:" + time + "ms");
    },
    setPoolLabel: function (time) {
        if (time == 0) {
            time = "<1";
        }
        this.poolLabel.setString("使用pool创建耗费::" + time + "ms");
    }
});

