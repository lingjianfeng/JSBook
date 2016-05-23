var Unit05_EventScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        // ------ 触摸相关 ------
        //var layer = new TouchOneByOneLayer();
        //var layer = new TouchAllAtOnceLayer();
        //var layer = new TouchPriorityLayer();

        // ------ 重力感应 ------
        // var layer = new AccelerationLayer();

        // ------ 键盘 ------
        //var layer = new KeyboardLayer();

        // ------ 鼠标 ------
        //var layer = new MouseLayer();

        // ------ 自定义 ------
        //var layer = new CustomLayer();

        // 摇杆Demo
        var layer = new RockerLayer();
        this.addChild(layer);

    }
});

var RockerLayer = cc.LayerColor.extend({
    rocker      : null,
    cocosIcon   : null,
    ctor : function(){
        this._super(cc.color(150, 150, 150));
        // 加载[色块精灵]
        this.loadCocosIcon();
        // 加载[摇杆]
        this.loadRocker();
        return true;
    },
    loadCocosIcon : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        this.cocosIcon = node;
        node.setPosition(480, 320);
    },
    // 加载[摇杆]
    loadRocker1 : function(){
        var node = new Rocker(res.u5_control_base_png, res.u5_control_knob_png, ROCKER_TYPE.DEFAULT);
        //var node = new Rocker(res.u5_control_base_png, res.u5_control_knob_png, ROCKER_TYPE.AUTO);
        //var node = new Rocker(res.u5_control_base_png, res.u5_control_knob_png, ROCKER_TYPE.HIDE);
        //var node = new Rocker(res.u5_control_base_png, res.u5_control_knob_png, 128);
        this.addChild(node);
        this.rocker = node;
        node.setPosition(200, 130);
    },
    // 加载[摇杆]
    loadRocker : function(){
        var node = new Rocker(res.u5_control_base_png, res.u5_control_knob_png, ROCKER_TYPE.DEFAULT);
        this.addChild(node);
        node.setCallback(function(vec){
            cc.log("---------------");
            cc.log("速度，x：", vec.x, " y：", vec.y);
            cc.log("角度：", node.angle);
            cc.log("方向：", node.direction);
            this.cocosIcon.x += vec.x * 10;
            this.cocosIcon.y += vec.y * 10;
        }.bind(this));
        node.setPosition(200, 130);
    }
});

// ==================================================================
// -------------------- TOUCH_ONE_BY_ONE 示例 -----------------------
// ==================================================================
var TouchOneByOneLayer = cc.Layer.extend({
    cyanBlock       : null,
    magentaBlock    : null,
    yellowBlock     : null,
    ctor : function () {
        this._super();
        this.loadSprite();
        this.bindEventListener();
    },
    loadSprite : function(){
        this.cyanBlock = new cc.Sprite(res.u5_cyan_block_png);
        this.cyanBlock.setPosition(
            cc.winSize.width / 2 - this.cyanBlock.getContentSize().width / 2,
            cc.winSize.height / 2 + this.cyanBlock.getContentSize().height / 2);
        this.addChild(this.cyanBlock);

        this.magentaBlock = new cc.Sprite(res.u5_magenta_block_png);
        this.magentaBlock.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(this.magentaBlock);

        this.yellowBlock = new cc.Sprite(res.u5_yellow_block_png);
        this.yellowBlock.setPosition(this.yellowBlock.getContentSize().width , 0);
        this.magentaBlock.addChild(this.yellowBlock);
    },
    bindEventListener : function(){
        var listener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,    // TODO【事件吞噬】，阻止事件传递给下一层(层根据事件优先级而定，而非对象(节点)的zOrder值)
            target : this,  // 指定事件源
            onTouchBegan: function (touch, event) {
                // 获取当前触发事件的对象 TODO【备注】：有比getCurrentTarget更好的选择。
                //  但这里主要是3个精灵引用了同一套的事件处理方案，所以采用此方式。见下面的.clone
                var target = event.getCurrentTarget();
                // 获取点击坐标[基于本地坐标]
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                // 获取当前节点大小
                var size = target.getContentSize();
                // 区域设定
                var rect = cc.rect(0, 0, size.width, size.height);
                // 判断触摸点是否在节点区域内
                if (!(cc.rectContainsPoint(rect, locationInNode))) {
                    return false;
                }
                // 开始逻辑处理
                cc.log("onTouchBegan : x = " + locationInNode.x + ", y = " + locationInNode.y);
                target.setOpacity(180)// TODO  true 和 false 的区别。 return false 的话，onTouchMoved和onTouchEnded不会被调用到
                return true;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                // 返回从【前一个】触摸点【到当前点】的delta【距离】
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                target.opacity = 255;
            }
        });

        cc.eventManager.addListener(listener, this.cyanBlock);
        cc.eventManager.addListener(listener.clone(), this.magentaBlock);
        cc.eventManager.addListener(listener.clone(), this.yellowBlock);
    }
});

// ==================================================================
// -------------------- TOUCH_ALL_AT_ONCE 示例 ----------------------
// ==================================================================
var TouchAllAtOnceLayer =  cc.Layer.extend({
    touchNode : null,
    ctor : function () {
        this._super();
        this.loadSprite();
        this.bindEventListener();
        return true;
    },
    loadSprite : function(){
        // 左上角的精灵
        this.touchNode = new cc.Sprite(res.sh_node_256_png);
        this.touchNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(this.touchNode);
    },
    bindEventListener : function(){
        // 判断当前平台是否支持多点触控
        if( 'touches' in cc.sys.capabilities ) {
            var listener = cc.EventListener.create({
                //  TODO 不支持事件吞噬。
                event           : cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan  : this.onTouchesBegan,
                onTouchesMoved  : this.onTouchesMoved,
                onTouchesEnded  : this.onTouchesEnded
            });
            cc.eventManager.addListener(listener, this.touchNode);
        }else{
            // 当前平台不支持多点触摸
            cc.log("当前平台不支持多点触摸")
        }
    },
    onTouchesBegan: function (touches, event) {
        var self = event.getCurrentTarget();
        // touches[0] 表示捕获第一个触摸点，touches为触摸点集合
        for (var i = 0; i < touches.length;i++ ) {
            var touch = touches[i];
            var pos = touch.getLocation();
            var id = touch.getID();
            // 获取点击坐标[基于本地坐标]
            var locationInNode = self.convertToNodeSpace(touch.getLocation());
            // 获取当前节点大小
            var size = self.getContentSize();
            // 区域设定
            var rect = cc.rect(0, 0, size.width, size.height);
            // 判断触摸点是否在节点区域内
            if (!(cc.rectContainsPoint(rect, locationInNode))) {
                return false;
            }
            cc.log("onTouchesBegan at: " + pos.x + " " + pos.y + " Id:" + id);
            return true;
        }
    },
    onTouchesMoved : function (touches, event) {
    },
    onTouchesEnded : function (touches, event) {
    }
});

// ==================================================================
// ----------------------- 触摸优先级 示例 ----------------------------
// ==================================================================
var TouchPriorityLayer =   cc.Layer.extend({
    cyanBlock       : null,
    magentaBlock    : null,
    ctor : function () {
        this._super();
        this.loadSprite();
        this.bindEventListener();
    },
    loadSprite : function(){
        this.cyanBlock = new cc.Sprite(res.u5_cyan_block_png);
        this.cyanBlock.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(this.cyanBlock);

        this.magentaBlock = new cc.Sprite(res.u5_magenta_block_png);
        this.magentaBlock.setPosition(cc.winSize.width / 2 + 20, cc.winSize.height / 2 + 20);
        this.addChild(this.magentaBlock);

    },
    bindEventListener : function(){
        var listenerA = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            target : this.cyanBlock, // TODO 注意，这里只能用target的方式。
            swallowTouches : true,
            onTouchBegan: function (touch, event) {
                var target = this.target; // TODO 注意，这里只能用this.target的方式。这里不能用getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.height);
                if (!(cc.rectContainsPoint(rect, locationInNode))) {
                    return false;
                }
                cc.log("listenerA  onTouchBegan : x = " + locationInNode.x + ", y = " + locationInNode.y);
                target.setOpacity(180);
                return true;
            },
            onTouchMoved: function (touch, event) {
                var target = this.target;
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                var target = this.target;
                target.opacity = 255;
            }
        });


        var listenerB = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            target : this.cyanBlock,
            swallowTouches : true,
            onTouchBegan: function (touch, event) {
                var target = this.target;
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var size = target.getContentSize();
                var rect = cc.rect(0, 0, size.width, size.height);
                if (!(cc.rectContainsPoint(rect, locationInNode))) {
                    return false;
                }
                cc.log("listenerB  onTouchBegan : x = " + locationInNode.x + ", y = " + locationInNode.y);
                target.setOpacity(180);
                return true;
            },
            onTouchMoved: function (touch, event) {
                var target = this.target;
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                var target = this.target;
                target.opacity = 255;
            }
        });

        cc.eventManager.addListener(listenerA, -999);
        cc.eventManager.addListener(listenerB, -998);
    }
});

// ==================================================================
// --------------------------- 重力加速计 ----------------------------
// ==================================================================
var AccelerationLayer =  cc.Layer.extend({
    touchNode : null,
    ctor : function () {
        this._super();
        this.loadSprite();
        this.bindEventListener();
        return true;
    },
    loadSprite : function(){
        // 左上角的精灵
        this.touchNode = new cc.Sprite(res.sh_node_128_png);
        this.touchNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(this.touchNode);
    },
    bindEventListener : function(){
        // 判断当前平台是否支持多点触控
        if( 'accelerometer' in cc.sys.capabilities ) {
            // 开启加速计
            cc.inputManager.setAccelerometerEnabled(true);
            var listener = cc.EventListener.create({
                event       : cc.EventListener.ACCELERATION,
                callback : function (acc, event) {
                    cc.log("accX = ", acc.x);       // x轴分量
                    cc.log("accY = ", acc.y);       // x轴分量
                    cc.log("accZ = ", acc.z);       // x轴分量
                }
            });
            cc.eventManager.addListener(listener, this);
        }else{
            cc.log("accelerometer not supported");
        }
    },
    onListenerAccelerometer : function(acc, event){
        cc.log( "acc.x : " + acc.x + "   acc.y : " +acc.y);
        // 备注：acc.x 和 acc.y 取值范围 [-1 到 1].
        var target = event.getCurrentTarget();
        var ballSize  = target.getContentSize();
        var currPos  = target.getPosition();

        // TODO 速度定义
        target.x = AccelerationLayer.fixPos(
            currPos.x + acc.x * 20,
            ballSize.width / 2,
            cc.winSize.width - ballSize.width / 2);
        target.y = AccelerationLayer.fixPos(
            currPos.y + acc.y * 20,
            ballSize.height / 2,
            cc.winSize.height - ballSize.height / 2);
    }
});
// 限制范围内
AccelerationLayer.fixPos = function(pos, min, max){
    var ret = pos;
    if(pos < min)
        ret = min;
    else if(pos > max)
        ret = max;
    return ret;
};

// ==================================================================
// ---------------------------- 键盘事件 -----------------------------
// ==================================================================
var KeyboardLayer =  cc.Layer.extend({
    labInfo : null,
    ctor : function () {
        this._super();
        // 创建一个label
        this.labInfo = new cc.LabelTTF("没有收到的键盘事件！", "", 48);
        this.addChild(this.labInfo);
        this.labInfo.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        if( 'keyboard' in cc.sys.capabilities ) {
            // 为this.labInfo 添加一个键盘监听事件
            cc.eventManager.addListener({
                event           : cc.EventListener.KEYBOARD,
                target          : this.labInfo,
                onKeyPressed    : this.onKeyPressed,
                onKeyReleased   : this.onKeyReleased
            }, this.labInfo);
        }else{
            cc.log("键盘事件不支持");
        }
        return true;
    },
    onKeyPressed : function(keyCode, event){    // 键按下
        // 三目运算 。 isNative 判断是否为本地平台。
        this.target.setString("Key " + (cc.sys.isNative ? this.target.getNativeKeyName(keyCode) : String.fromCharCode(keyCode) ) + "(" + keyCode.toString()  + ") was pressed!");
    },

    onKeyReleased: function(keyCode, event){ // 键释放
        this.target.setString("Key " + (cc.sys.isNative ? this.target.getNativeKeyName(keyCode) : String.fromCharCode(keyCode) ) + "(" + keyCode.toString()  + ") was released!");
    },
    getNativeKeyName:function(keyCode) {     // 返回本地按键名称
        var allCode = Object.getOwnPropertyNames(cc.KEY);
        var keyName = "";
        for(var x in allCode){
            if(cc.KEY[allCode[x]] == keyCode){
                keyName = allCode[x];
                break;
            }
        }
        return keyName;
    }

});


// ==================================================================
// ----------------------------- 鼠标事件 ----------------------------
// ==================================================================
var MouseLayer =   cc.Layer.extend({
    mouseNode : null,
    ctor : function(){
        this._super();

        this.mouseNode = new cc.Sprite(res.sh_node_64_png);
        this.addChild(this.mouseNode);
        this.mouseNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        if( "mouse" in cc.sys.capabilities ) {
            cc.eventManager.addListener({
                event       : cc.EventListener.MOUSE,
                target      : this,
                onMouseDown : this.onMouseDown,
                onMouseUp   : this.onMouseUp,
                onMouseMove : this.onMouseMove,
                onMouseScroll:this.onMouseScroll
            }, this);
        }else{
            cc.log("mouse not support");
        }

    },
    // 鼠标事件[按下]
    onMouseDown: function(event){
        var pos = event.getLocation();
        var button = event.getButton();
        if (button == cc.EventMouse.BUTTON_LEFT){
            // 左键
            cc.log("左键按下", + pos.x + " " + pos.y);
        }else if(button == cc.EventMouse.BUTTON_RIGHT){
            // 右键
            cc.log("右键按下", + pos.x + " " + pos.y);
        }else if(button == cc.EventMouse.BUTTON_MIDDLE){
            // 滚轮
            cc.log("右键按下");
        }
    },
    // 鼠标事件[抬起]
    onMouseUp: function(event){
        var pos = event.getLocation();
        var button = event.getButton();
        if (button == cc.EventMouse.BUTTON_LEFT){
            // 左键
            cc.log("左键抬起", + pos.x + " " + pos.y);
        }else if(button == cc.EventMouse.BUTTON_RIGHT){
            // 右键
            cc.log("右键抬起", + pos.x + " " + pos.y);
        }else if(button == cc.EventMouse.BUTTON_MIDDLE){
            // 滚轮
            cc.log("右键抬起");
        }

    },
    // 鼠标事件[移动]
    onMouseMove: function(event){
        var pos = event.getLocation();
        this.target.mouseNode.x = pos.x;
        this.target.mouseNode.y = pos.y;
    },
    // 鼠标事件[滚动轮滚动]
    onMouseScroll: function(event){
        // 实现节点放大缩小
        var pos = cc.p(event.getScrollX(), event.getScrollY());
        if (pos.y > 0){
            this.target.mouseNode.scale += 0.05;
        }else{
            this.target.mouseNode.scale -= 0.05;
        }
    }
});


var MouseLayer =   cc.Layer.extend({
    ctor : function(){
        this._super();
        // 判断当前平台是否支持鼠标事件
        if( "mouse" in cc.sys.capabilities ) {
            var listener = cc.EventListener.create({
                event       : cc.EventListener.MOUSE,
                target      : this,
                onMouseDown : function(event){      // 鼠标事件[按下]
                    var pos = event.getLocation();
                    var button = event.getButton();
                    if (button == cc.EventMouse.BUTTON_LEFT){       // 左键
                        cc.log("左键按下    ", + pos.x + " " + pos.y);
                    }else if(button == cc.EventMouse.BUTTON_RIGHT){ // 右键
                        cc.log("右键按下    ", + pos.x + " " + pos.y);
                    }else if(button == cc.EventMouse.BUTTON_MIDDLE){// 滚轮
                        cc.log("右键按下    ");
                    }
                },
                onMouseUp   : function(event){      // 鼠标事件[抬起]
                },
                onMouseMove: function(event){       // 鼠标事件[移动]
                    var pos = event.getLocation();
                    cc.log("鼠标当前位置：", pos.x, pos.y)
                },
                onMouseScroll:function(event){      // 鼠标事件[滚轮滚动]
                    var pos = cc.p(event.getScrollX(), event.getScrollY());
                    cc.log("鼠标滚轮滚动x：", pos.x + " y: " + pos.y);
                }
            });
            cc.eventManager.addListener(listener, this);
        }else{
            cc.log("不支持鼠标事件");
        }
    }
});

// ==================================================================
// -------------------------- 自定义事件 ------------------------------
// ==================================================================
var CustomLayer =  cc.Layer.extend({
    _listener1  : null,
    _item1Count : 0,
    label       : null,
    onEnter : function () {
        this._super();

        // TODO 取代了cocos2d-x 2.x版本中的NotificationCenter。
        this.label = new cc.LabelTTF("No custom event 1 received!", "", 20);
        this.addChild(this.label);
        this.label.setPosition(cc.winSize.width / 2, cc.winSize.height - 150);

        // 自定义事件回调函数
        cc.eventManager.addListener({
            event       : cc.EventListener.CUSTOM,
            target      : this.label,
            eventName   : "custom_event1",
            callback    : this.customCallBack
        }, this.label);

        // 作用域保存
        var self = this;
        var sendItem = new cc.MenuItemFont("Send Custom Event 1", function(sender){
            self._item1Count++;
//            sender.parent 为【菜单】， sender.parent.parent 为当前层
//            sender.parent.parent._item1Count++;  // 效果等同上面那行代码，但是，我们一般不这样做。
            var event = new cc.EventCustom("custom_event1");
            event.setUserData(self._item1Count.toString());
//            手工分发事件，触发前面定义的回调函数
            cc.eventManager.dispatchEvent(event);
        });
        sendItem.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        var menu = new cc.Menu(sendItem);
        menu.setPosition(0, 0);
        menu.setAnchorPoint(0, 0);
        this.addChild(menu, 1);


        return true;
    },
    customCallBack : function(event){
        var target = event.getCurrentTarget();
        // 可以通过getUserData来设置需要传输的用户自定义数据
        target.setString("Custom event 1 received, " + event.getUserData() + " times");
    }

});

var CustomLayer =  cc.Layer.extend({
    _listener1  : null,
    _item1Count : 0,
    label       : null,
    onEnter : function () {
        this._super();

        // TODO 取代了cocos2d-x 2.x版本中的NotificationCenter。
        this.label = new cc.LabelTTF("No custom event 1 received!", "", 20);
        this.addChild(this.label);
        this.label.setPosition(cc.winSize.width / 2, cc.winSize.height - 150);

        // 创建自定义函数
        var listener = cc.EventListener.create({
            event       : cc.EventListener.CUSTOM,
            target      : this,             // 事件源
            eventName   : "custom_event",   // 事件名
            callback    : function(event){  // 回调函数
                var target = event.getCurrentTarget();  // 事件源对象
                cc.log("自定义事件被触发...\n携带数据：", event.getUserData());
            }
        });
        cc.eventManager.addListener(listener, this);

        var event = new cc.EventCustom("custom_event"); // 创建自定义事件
        var data = {        // 定义数据
            name : "凌建风",
            age : 23,
            hobby : "吃饭、睡觉、写代码！"
        };
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);   // 分发事件

        return true;
    },
    customCallBack : function(event){
        var target = event.getCurrentTarget();
        // 可以通过getUserData来设置需要传输的用户自定义数据
        target.setString("Custom event 1 received, " + event.getUserData() + " times");
    }

});


// 书中代码
var unit06_eventCode = cc.Layer.extend({
    ctor : function () {
        this._super();

        var argObj,
            listenerType,
            recursive,
            customEventName,
            type,
            target,
            fixedPriority,
            event,
            optionalUserData;

        // 6.1 事件监听器
        {cc.EventListener}cc.EventListener.create(argObj);

        var listener, nodeOrPriority;
        {cc.EventListener}addListener(listener, nodeOrPriority);
        cc.eventManager.addListener(listener, nodeOrPriority);

        var listenerA,listenerB;
        {cc.EventListener}cc.eventManager.addListener(listenerA, -1000);
        {cc.EventListener}cc.eventManager.addListener(listenerB, -500);

        var eventName,callback;
        {cc.EventListener}addCustomListener(eventName, callback);
        cc.eventManager.addCustomListener(eventName, callback);

        // 删除监听器[根据指定监听器]
        cc.eventManager.removeListener(listener);
        // 删除监听器[根据指定类型]
        cc.eventManager.removeListeners(listenerType, recursive);
        // 删除监听器[根据指定监听器]
        cc.eventManager.removeCustomListeners(customEventName);
        // 删除监听器[删除所有监听器]
        cc.eventManager.removeAllListeners();
        // 删除监听器[删除target下指定类型的监听器]
        cc.eventManager.removeEventListener(type, target);


        cc.eventManager.setPriority(listener, fixedPriority);

        cc.eventManager.dispatchEvent(event);        // 分发事件
        // 分发自定义事件
        cc.eventManager.dispatchCustomEvent(eventName, optionalUserData);


        // 6.2
        var listener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,    // 是否吞噬触摸
            onTouchBegan: function (touch, event) {
                // 获取[当前触发事件的对象]
                var target = event.getCurrentTarget();
                // 转换[将点击坐标转换为基于当前触发事件对象的本地坐标]
                var posInNode = target.convertToNodeSpace(touch.getLocation());
                // 获取当前节点大小
                var size = target.getContentSize();
                // 区域设定
                var rect = cc.rect(0, 0, size.width, size.height);
                // 判断触摸点是否在节点区域内
                if (!(cc.rectContainsPoint(rect, posInNode))) {
                    return false;
                }
                // TODO something
                return true;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var delta = touch.getDelta(); // 获取[滑动距离]
                target.x += delta.x;
                target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                // TODO something
            },
            onTouchCancelled : function(touch, event){
                // TODO something
            }
        });

        var sprite1, sprite2, sprite3;
        cc.eventManager.addListener(listener, sprite1);
        cc.eventManager.addListener(listener.clone(), sprite2);
        cc.eventManager.addListener(listener.clone(), sprite3);


        // TODO  true 和 false 的区别。 return false 的话，onTouchMoved和onTouchEnded不会被调用到
        // 是否吞噬触摸，阻止事件传递给下一层(层根据事件优先级而定，而非对象(节点)的zOrder值)
        return true;
    }
});

