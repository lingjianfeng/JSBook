var MousePhysicsSprite = cc.PhysicsSprite.extend({
    space : null,           // 物理空间引用
    mouseBody : null,       // 鼠标刚体
    pivotJoint : null,      // pivot关节
    ctor : function(fileName, rect){
        this._super(fileName, rect);
        // 注册[事件]
        this.registerEvent();
    },
    onEnter : function(){
        this._super();
        this.space = this.getBody().space;
    },
    // 注册[事件]
    registerEvent : function(){
        this.cardTouchListener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches  : true,
            onTouchBegan  : this.onTouchBegan,
            onTouchMoved  : this.onTouchMoved,
            onTouchEnded  : this.onTouchEnded,
            onTouchCancelled : this.onTouchCancelled
        });
        cc.eventManager.addListener(this.cardTouchListener, this);
    },
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();      // 获取[当前事件源]
        var position = touch.getLocation();         // 获取[触摸点位置]
        var locationInNode = target.convertToNodeSpace(position);
        var size = target.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);
        if (!(cc.rectContainsPoint(rect, locationInNode))) {
            return false;
        }

        var mouseBody = new cp.StaticBody();        // 创建[静态刚体]
        mouseBody.setPos(cp.v(position.x, position.y)); // 设置[刚体坐标]
        var joint = new cp.PivotJoint(target.getBody(), mouseBody, cp.v(position.x, position.y));
        target.space.addConstraint(joint);          // 添加[约束]
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