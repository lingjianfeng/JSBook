// 虚拟摇杆类型
var ROCKER_TYPE = ROCKER_TYPE || {};
ROCKER_TYPE.DEFAULT = "DEFAULT";// 默认类型
ROCKER_TYPE.AUTO = "AUTO";      // 自动类型
ROCKER_TYPE.HIDE = "HIDE";      // 隐藏类型
ROCKER_TYPE.OPACITY = 255;      // 不透明类型

// 方向（0表示原点，从1开始，顺时针方向定义出方向）
var ROCKER_DIRECTION = ROCKER_DIRECTION || {};
ROCKER_DIRECTION.RIGHT          = "RIGHT";      // 向右
ROCKER_DIRECTION.RIGHT_UP       = "RIGHT_UP";   // 右上
ROCKER_DIRECTION.UP             = "UP";         // 向上
ROCKER_DIRECTION.LEFT_UP        = "LEFT_UP";    // 左上
ROCKER_DIRECTION.LEFT           = "LEFT";       // 向左
ROCKER_DIRECTION.LEFT_DOWN      = "LEFT_DOWN";  // 左下
ROCKER_DIRECTION.DOWN           = "DOWN";       // 向下
ROCKER_DIRECTION.RIGHT_DOWN     = "RIGHT_DOWN"; // 右下
ROCKER_DIRECTION.ORIGIN         = "ORIGIN";     // 原点

// 方向数组
var ROCKER_DIRECTION_ARRAY = [
    ROCKER_DIRECTION.RIGHT,
    ROCKER_DIRECTION.RIGHT_UP,
    ROCKER_DIRECTION.UP,
    ROCKER_DIRECTION.LEFT_UP,
    ROCKER_DIRECTION.LEFT,
    ROCKER_DIRECTION.LEFT_DOWN,
    ROCKER_DIRECTION.DOWN,
    ROCKER_DIRECTION.RIGHT_DOWN,
    ROCKER_DIRECTION.ORIGIN
];

// 8个方向的角度数组
var ROCKER_ANGLE_ARRAY = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

// 摇杆精灵
var Rocker = cc.Sprite.extend({
    _baseNode        : null,      // 底盘[节点]
    _knobNode        : null,      // 把手[节点]
    _touchListener   : null,      // 触摸事件[监听器]
    _radius          : 0,         // 摇杆的可移动半径
    _angle           : 0,         // 角度
    _velocity        : cc.p(0, 0),// 速度
    _callback        : null,      // 回调函数
    _direction       : ROCKER_DIRECTION.ORIGIN, // 方向
    _type            : ROCKER_TYPE.DEFAULT,     // 摇杆类型
    ctor: function(baseTexture, knobTexture, type){
        this._super();
        // 加载[底盘和摇杆精灵]
        this.loadBaseAndKnob(baseTexture, knobTexture);
        // 加载[配置]
        this.loadConfig(type);
        // 注册[监听器]
        this.registerEvent();
        // 调度器[触发callback回调函数]
        this.scheduleUpdate();
        return true;
    },
    onExit : function(){
        this.unRegisterEvent();
        this._super();
    },
    // 注册[触摸事件监听器]
    registerEvent : function(){
        this._touchListener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : true,
            onTouchBegan    : this.onTouchBegan,
            onTouchMoved    : this.onTouchMoved,
            onTouchEnded    : this.onTouchEnded
        });
        cc.eventManager.addListener(this._touchListener, this);
    },
    // 卸载[触摸事件监听器]
    unRegisterEvent : function(){
        cc.eventManager.removeListener(this._touchListener);
    },
    update : function(dt){
        if (this._direction != ROCKER_DIRECTION.ORIGIN) {
            this.onCallback();  // 触发回调函数
        }
    },
    // 加载精灵[_baseNode和_knobNode]
    loadBaseAndKnob : function(baseTexture, knobTexture){
        this._baseNode = new cc.Sprite(baseTexture);
        this._knobNode = new cc.Sprite(knobTexture);
        this.addChild(this._baseNode);
        this.addChild(this._knobNode);
    },
    // 加载配置[半径_radius和类型type等]
    loadConfig : function(type){
        this._radius = this._baseNode.getContentSize().width / 2;
        if (type !== undefined){
            if (isNaN(type)){
                this._type = type;
                if (this._type == ROCKER_TYPE.HIDE){
                    this.setVisible(false);
                }
            }else{
                this._type = ROCKER_TYPE.OPACITY;
                this.setCascadeOpacityEnabled(true); // 开启子节点透明度关联
                this.setOpacity(type);
            }
        }
    },
    onTouchBegan: function (touch, event) {
        var target = this.target;
        var knob = target._knobNode; // 获取把手
        var locationInNode = knob.convertToNodeSpace(touch.getLocation());
        var size = knob.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);
        if (target._type == ROCKER_TYPE.DEFAULT){ // 默认类型
            if (!cc.rectContainsPoint(rect, locationInNode)) {
                return false;
            }
        }else { // 非默认类型
            if (target._type == ROCKER_TYPE.AUTO){
                target.setVisible(true);
            }
            target.setPosition(touch.getLocation());
        }
        return true;
    },
    onTouchMoved: function (touch, event) {
        // 节点获取
        var target = this.target;
        touch.getDelta()
        var knob = target._knobNode;
        // 触摸点转为摇杆的本地坐标
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        target.onUpdate(locationInNode); // 角度、方向、速度等更新
        // 长度获取[当前触摸点相对摇杆中心点]
        var length = cc.pLength(locationInNode);
        var radians = cc.degreesToRadians(target._angle);
        // 限制把手和原点的距离不能超过摇杆的半径
        if ( length > target._radius){
            var x = Math.cos(radians) * target._radius;
            var y = Math.sin(radians) * target._radius;
            knob.setPosition(cc.p(x, y));
        }else{
            knob.setPosition(locationInNode);
        }
    },
    onTouchEnded: function (touch, event) {
        var target = this.target;
        if (target._type == ROCKER_TYPE.AUTO){
            target.setVisible(false);
        }
        target.reset();         // 重置
        target.onCallback();    //  触发回调函数
    },
    // 更新[角度、方向、速度]
    onUpdate : function(pos){
        // 更新[角度]
        this.onUpdateAngle(pos);
        // 更新[方向]
        this.onUpdateDirection(pos);
        // 更新[速度]
        this.onUpdateVelocity();
    },
    // 更新[角度]
    onUpdateAngle: function(pos){
        this._angle = cc.radiansToDegrees(cc.pToAngle(pos));
        if (this._angle < 0) {
            this._angle += 360;
        }
    },
    // 更新[方向]
    onUpdateDirection : function(){
        for (var i = 1; i < ROCKER_ANGLE_ARRAY.length; i++) {
            this._direction = ROCKER_DIRECTION_ARRAY[0]; // 默认向右
            if (this._angle >= ROCKER_ANGLE_ARRAY[i - 1] && this._angle < ROCKER_ANGLE_ARRAY[i]) {
                this._direction = ROCKER_DIRECTION_ARRAY[i];
                break;
            }
        }
    },
    // 更新[速度]
    onUpdateVelocity : function(){
        this._velocity.x = this._knobNode.getPositionX() / this._radius;
        this._velocity.y = this._knobNode.getPositionY() / this._radius;
    },
    // 重置
    reset : function(){
        this._knobNode.setPosition(0, 0);
        this._angle = 0;
        this._velocity = cc.p(0, 0);
        this._direction = ROCKER_DIRECTION.ORIGIN;
    },
    // 触发[回调函数]
    onCallback : function(){
        (this._callback && typeof(this._callback) === "function") && this._callback(this._velocity);
    },
    getBaseNode : function(){
        return this._baseNode;
    },
    setBaseNode : function(baseNode){
        this._baseNode = baseNode;
    },
    getKnobNode : function(){
        return this._knobNode;
    },
    setKnobNode : function(knobNode){
        this._knobNode = knobNode;
    },
    getTouchListener : function(){
        return this._touchListener;
    },
    setTouchListener : function(touchListener){
        this._touchListener = touchListener;
    },
    getRadius : function(){
        return this._radius;
    },
    setRadius : function(radius){
        this._radius = radius;
    },
    getAngle : function(){
        return this._angle;
    },
    setAngle : function(angle){
        this._angle = angle;
    },
    getVelocity : function(){
        return this._velocity;
    },
    setVelocity : function(velocity){
        this._velocity = velocity;
    },
    getCallback : function(){
        return this._callback;
    },
    setCallback : function(callback){
        this._callback = callback;
    },
    getDirection : function(){
        return this._direction;
    },
    setDirection : function(direction){
        this._direction = direction;
    },
    getType : function(){
        return this._type;
    },
    setType : function(type){
        this._type = type;
    }
});

var _p = Rocker.prototype;
cc.defineGetterSetter(_p, "callback", _p.getCallback, _p.setCallback);
/** @expose */
_p.callback;
cc.defineGetterSetter(_p, "baseNode", _p.getBaseNode, _p.setBaseNode);
/** @expose */
_p.baseNode;
cc.defineGetterSetter(_p, "knobNode", _p.getKnobNode, _p.setKnobNode);
/** @expose */
_p.knobNode;
cc.defineGetterSetter(_p, "touchListener", _p.getTouchListener, _p.setTouchListener);
/** @expose */
_p.touchListener;
cc.defineGetterSetter(_p, "radius", _p.getRadius, _p.setRadius);
/** @expose */
_p.radius;
cc.defineGetterSetter(_p, "angle", _p.getAngle, _p.setAngle);
/** @expose */
_p.angle;
cc.defineGetterSetter(_p, "velocity", _p.getVelocity, _p.setVelocity);
/** @expose */
_p.velocity;
cc.defineGetterSetter(_p, "callback", _p.getCallback, _p.setCallback);
/** @expose */
_p.callback;
cc.defineGetterSetter(_p, "direction", _p.getDirection, _p.setDirection);
/** @expose */
_p.direction;
cc.defineGetterSetter(_p, "type", _p.getType, _p.setType);
/** @expose */
_p.type;
