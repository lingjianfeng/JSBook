var Unit14_ChipmunkScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        //this.loadLayer();
        this.loadExample();
    },
    loadLayer : function(){
        var node = new Unit14_ChipmunkLayer();
        this.addChild(node);
    },
    loadExample : function(){
        var node = new Unit14_Chipmunk_ExampleLayer();
        this.addChild(node);
    }
});

var Unit14_ChipmunkLayer = cc.Layer.extend({
    space : null,
    bodyA : null,
    bodyB : null,
    pivotJoint  : null, // Pivot关节
    mouseBody   : null, // 鼠标刚体
    ctor : function() {
        this._super();
        // 加载[物理空间]
        this.loadPhysicsSpace();
        // 加载[物理空间Debug]
        this.loadDebugPhysicsSpace();

        // 加载[精灵刚体]
        //this.loadSpriteBody();
        // 加载[静态刚体]
        //this.loadStaticBody();


        // 加载[2个刚体]
        this.loadBaseBody();
        //加载[Pin Joint]约束
        //this.loadPinJoint();
        // 加载[Slide Joint]约束
        //this.loadSlideJoint();

        this.loadPivotJoint();

        // 调度器[update]
        this.scheduleUpdate();
        // 注册[事件]
        this.registerEvent();
        //this.scale = 0.8
    },
    registerEvent : function(){
        this.listenerTouchOneByOne = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : true,
            onTouchBegan  : this.onTouchBegan,
            onTouchMoved  : this.onTouchMoved,
            onTouchEnded  : this.onTouchEnded,
            onTouchCancelled : this.onTouchCancelled
        });
        cc.eventManager.addListener(this.listenerTouchOneByOne, this);
    },
    // 加载[物理空间]
    loadPhysicsSpace : function(){
        this.space = new cp.Space();            // 创建[物理空间]
        this.space.gravity = cp.v(0, -150);     // 设置[物理空间重力]
        this.space.sleepTimeThreshold = 0.5;    // 设置[睡眠检测临界值]

        var thickness = 100;    // 物理空间围墙厚度
        var staticBody = this.space.staticBody; // 创建[静态刚体]
        var walls = [
            new cp.SegmentShape(staticBody, cp.v(-thickness, -thickness), cp.v(cc.winSize.width, -thickness), thickness),  // 底部
            new cp.SegmentShape(staticBody, cp.v(-thickness, -thickness), cp.v(-thickness, cc.winSize.height), thickness), // 左边
            new cp.SegmentShape(staticBody, cp.v(cc.winSize.width + thickness, -thickness), cp.v(cc.winSize.width + thickness, cc.winSize.height), thickness ),     // 右边
            new cp.SegmentShape(staticBody, cp.v(-thickness, cc.winSize.height + thickness), cp.v(cc.winSize.width, cc.winSize.height + thickness), thickness)      // 顶部
        ];

        // 创建围墙
        for(var i = 0; i < walls.length; i++){
            var shape = walls[i];
            shape.setElasticity(0.5);   // 设置[围墙的弹性系数]
            shape.setFriction(0);       // 设置[围墙的摩擦力]
            shape.setCollisionType("212");
            this.space.addStaticShape(shape);   // 添加[围墙到物理空间中]
        }

        this.space.addCollisionHandler("121", "212",
            this.collisionBegin.bind(this),
            this.collisionPre.bind(this),
            this.collisionPost.bind(this),
            this.collisionSeparate.bind(this)
        );
    },
    // 加载[物理空间Debug]
    loadDebugPhysicsSpace : function(){
        var node = new cc.PhysicsDebugNode(this.space);
        this.addChild(node, Number.MAX_VALUE);
    },
    update : function(dt){
        this.space.step(dt);    // 物理空间[迭代]
    },
    // 加载[精灵刚体]
    loadSpriteBody : function(){
        // 创建物理精灵
        var node = new cc.PhysicsSprite(res.sh_node_256_png);
        this.addChild(node);

        var mess = 10;      // 质量
        var body = new cp.Body(mess, cp.momentForBox(mess, node.width, node.height));
        this.space.addBody(body);
        body.setPos(cp.v(cc.winSize.width / 2, cc.winSize.height / 2));
        body.applyImpulse(cp.v(3000, 3000), cp.v(0, 0));

        var shape = new cp.BoxShape(body, node.width, node.height);
        this.space.addShape(shape); // 物理空间添加形状
        node.setBody(body);         // 精灵设置刚体
        shape.setElasticity(0.5);   // 设置[弹性系数]
        shape.setFriction(0.5);     // 设置[摩擦力]
        shape.setCollisionType(121);
    },
    // 加载[静态刚体]
    loadStaticBody : function(){
        // 创建物理精灵
        var node = new cc.PhysicsSprite(res.sh_node_256_png);
        this.addChild(node);

        // 创建静态刚体
        var body = this.space.staticBody;
        node.setBody(body); // 精灵绑定刚体
        body.setPos(cp.v(cc.winSize.width / 2, cc.winSize.height / 2));

        // 形状创建
        var shape = new cp.BoxShape(body, node.width, node.height);
        this.space.addShape(shape); // 形状添加到物理空间
        shape.setElasticity(1);     // 设置[弹性系数]
        shape.setFriction(1);       // 设置[摩擦力]
    },
    // 加载[2个刚体]
    loadBaseBody : function(){
        var posY = cc.winSize.height / 2;
        var offsetY = 200;
        this.bodyA = this.createBody(res.sh_node_128_png, cp.v(cc.winSize.width / 2 - offsetY, posY));
        this.bodyB = this.createBody(res.sh_node_128_png, cp.v(cc.winSize.width / 2 + offsetY, posY));
    },
    // 加载[Pin Joint]约束
    loadPinJoint : function(){
        this.bodyB.applyImpulse(cp.v(-5000, 0), cp.v(0, 0));
        var pinJoint = new cp.PinJoint(this.bodyA, this.bodyB, cp.v(0, 10), cp.v(0, 0));
        this.space.addConstraint(pinJoint);
        cc.log("pin joint dist : " + pinJoint.dist);
    },
    // 加载[Slide Joint]约束
    loadSlideJoint : function(){
        this.bodyB.applyImpulse(cp.v(-5000, 0), cp.v(0, 0));
        var slideJoint = new cp.SlideJoint(this.bodyA, this.bodyB, cp.v(0, 10), cp.v(0, 0), 300, 500);
        this.space.addConstraint(slideJoint);
    },
    // 加载[Pivot Joint]约束
    loadPivotJoint : function(){
        // TODO 见example.js
    },
    createBody : function(fileName, position, m){
        var mess = m || 10;      // 质量
        var pos = position || cp.v(cc.winSize.width / 2, cc.winSize.height / 2);
        var file = fileName || res.sh_node_64_png;

        var node = new cc.PhysicsSprite(file);
        this.addChild(node);

        var body = new cp.Body(mess, cp.momentForBox(mess, node.width, node.height));
        this.space.addBody(body);
        body.setPos(pos);
        body.sprite = node;

        var shape = new cp.BoxShape(body, node.width, node.height);
        this.space.addShape(shape); // 物理空间添加形状
        node.setBody(body);        // 精灵设置刚体
        shape.setCollisionType("121");

        return body;
    },
    // 碰撞
    collisionBegin : function ( arbiter, space ) {
        cc.log("碰到了。");
        return true;
    },
    // 碰撞[计算前]
    collisionPre : function ( arbiter, space ) {
        return true;
    },
    // 碰撞[xx]
    collisionPost : function ( arbiter, space ) {
    },
    // 碰撞[分开]
    collisionSeparate : function ( arbiter, space ) {
    },
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var position = touch.getLocation();

        var mouseBody = new cp.StaticBody();
        mouseBody.setPos(cp.v(position.x, position.y));
        var joint = new cp.PivotJoint(target.bodyA, mouseBody, cp.v(position.x, position.y));
        target.space.addConstraint(joint);
        target.mouseBody = mouseBody;
        target.pivotJoint = joint;

        return true;
    },
    onTouchMoved : function (touch, event) {
        var target = event.getCurrentTarget();
        if(target.mouseBody) {
            var position = touch.getLocation();
            target.mouseBody.setPos(cp.v(position.x, position.y));
        }
    },
    onTouchEnded : function (touch, event) {
        var target = event.getCurrentTarget();
        if(target.mouseBody){
            target.space.removeConstraint(target.pivotJoint);
        }
    },
    onTouchCancelled : function (touch, event) {
        var target = event.getCurrentTarget();
        target.onTouchEnded(touch, event);
    }
});
