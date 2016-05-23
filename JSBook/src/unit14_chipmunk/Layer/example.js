var Unit14_Chipmunk_ExampleLayer = cc.Layer.extend({
    space : null,           // 物理空间
    mousePhysicsSprite  : null,
    collisionType : {},     // 碰撞类型
    ctor : function() {
        this._super();
        // 加载[物理空间]
        this.loadPhysicsSpace();
        // 加载[物理空间Debug]
        this.loadDebugPhysicsSpace();
        // 加载[可以拖拽的刚体]
        this.loadTapBody();
        // 调度器[update]
        this.scheduleUpdate();
    },
    update : function(dt){
        this.space.step(dt);
    },
    // 加载[配置]
    loadConfig : function(){
        this.collisionType = {};
        this.collisionType.walls = "walls";
        this.collisionType.tapBody = "tapBody";
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

        // 创建[围墙]
        for(var i = 0; i < walls.length; i++){
            var shape = walls[i];
            shape.setElasticity(0.5);   // 设置[围墙的弹性系数]
            shape.setFriction(0);       // 设置[围墙的摩擦力]
            shape.setCollisionType(this.collisionType.walls);
            this.space.addStaticShape(shape);   // 添加[围墙到物理空间中]
        }

        // 添加[碰撞监听]
        this.space.addCollisionHandler(
            this.collisionType.walls,
            this.collisionType.tapBody,
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
    // 加载[可以拖拽的刚体]
    loadTapBody : function(){
        var node = new MousePhysicsSprite(res.sh_node_128_png);
        this.addChild(node);
        this.mousePhysicsSprite = node;

        var mess = 10;      // 质量
        var body = new cp.Body(mess, cp.momentForBox(mess, node.width, node.height));
        this.space.addBody(body);
        node.setBody(body);         // 精灵设置刚体
        body.setPos(cp.v(cc.winSize.width / 2, cc.winSize.height / 2));
        body.sprite = node;         // 给body添加sprite属性，指向node

        var shape = new cp.BoxShape(body, node.width, node.height);
        this.space.addShape(shape); // 物理空间添加形状
        shape.setElasticity(0.5);   // 设置[弹性系数]
        shape.setFriction(0.5);     // 设置[摩擦力]
        shape.setCollisionType(this.collisionType.tapBody);
        return body;
    },
    // 刚开始接触时的回调
    collisionBegin : function(arbiter, space){
        var bodyArray = [];
        bodyArray.push(arbiter.body_a);
        bodyArray.push(arbiter.body_b);

        var body = null;
        for (var i = 0; i < bodyArray.length; i++) {
            body = bodyArray[i];
            if (body.sprite == this.mousePhysicsSprite) {
                var callFunc = function(theBody){
                    // 移除[Shape]
                    theBody.eachShape(function(shape){
                        this.space.removeShape(shape);
                    }.bind(this));
                    // 移除[Body]
                    this.space.removeBody(theBody);
                    // 移除[Sprite]
                    this.removeChild(theBody.sprite);
                }.bind(this, body);
                // 回调函数
                this.space.addPostStepCallback(callFunc);
            }
        }
        return true;
    },
    // 接触的每次step的回调
    collisionPre : function(arbiter, space){
        return true;
    },
    // 接触并且碰撞响应已经被处理的回调
    collisionPost : function(arbiter, space){
    },
    // 开始分离的step的回调
    collisionSeparate : function(arbiter, space){
    }

});
