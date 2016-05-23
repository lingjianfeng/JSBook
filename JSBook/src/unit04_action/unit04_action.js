var Unit04_ActionScene = cc.Scene.extend({
    onEnter : function () {
        this._super();
        this.loadMainLayer();
    },
    loadMainLayer : function(){
        var layer = new Unit04_ActionLayer();
        this.addChild(layer);
    }
});

var Unit04_ActionLayer = cc.Layer.extend({
    ctor : function () {
        this._super();

        //this.loadMoveAction();
        //this.loadJumpAction();
        //this.loadBezierAction();
        //this.loadScaleToAction();
        //this.loadRotateAction();

        // 视觉特效动作
        //this.loadFadeAction();
        //this.loadTintAction();
        //this.loadBlinkAction();
        //this.loadOrbitCameraAction();
        this.loadAnimationByPlistAction();
        //this.loadAnimationByFileAction();

        // 复合动作
        //this.loadDelayTimeAction();
        //this.loadRepeatAction();
        //this.loadRepeatForeverAction();
        //this.loadSequenceAction();
        //this.loadSpawnAction();

        // 速度变化
        //this.loadSpeedAction();
        //this.loadActionEaseAction();
    },

    loadMoveAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        var moveTo = cc.moveTo(1, cc.p(200, 100));
        var moveBy = cc.moveBy(1, cc.p(0, 100));
        node.runAction(cc.sequence(moveTo, moveBy));
    },
    loadJumpAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        //------------------------------------------------------------------
        //  cc.jumpTo && cc.jumpBy  跳跃动作
        //------------------------------------------------------------------
        //【接口】: cc.jumpTo(duration, position, y, height, jumps);
        var duration, position, y, height, jumps;
        cc.jumpTo(duration, position, y, height, jumps);
        cc.jumpBy(duration, position, y, height, jumps);

        //【例子】 : 1秒时间，跳到(100, 86)，跳跃高度为50像素，总共跳跃4次
        var jumpTo = cc.jumpTo(1, cc.p(100, 86), 50, 4);
        //【例子】 : 1秒时间，原地跳，跳跃高度为100像素，总共跳跃4次
        var jumpBy = cc.jumpBy(1, cc.p(0, 0), 100, 4);
        node.runAction(cc.sequence(jumpTo, jumpBy));
    },
    loadBezierAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(0, 0);

        // ------------------------------------------------------------------
        // cc.bezierTo && cc.bezierBy 贝塞尔曲线运动动作
        // ------------------------------------------------------------------
        //【接口】: cc.bezierTo(time, control);
        var duration, control;
        cc.bezierTo(duration, control);
        cc.bezierBy(duration, control);

        var size = cc.winSize;
        // 【举例】:
        //  条件：当前节点坐标为cc.p(0, 0)
        //  要求：用1秒时间，做贝塞尔曲线运动，将节点从当前的位置移动到屏幕右下角
        var bezierToConfig = [
            cc.p(0, size.height),            // 起点控制点
            cc.p(size.width, size.height),   // 终点控制点
            cc.p(size.width, 0)              // 终点
        ];
        var bezierTo = cc.bezierTo(1, bezierToConfig);

        //【举例】:
        //  条件：当前节点坐标为cc.p(cc.winSize.width, 0)
        //  要求：1秒时间，做相对贝塞尔曲线运动，将x轴往负方向移动到屏幕宽度的一半
        var bezierByConfig = [
            cc.p(0, size.height),
            cc.p(-size.width / 2, size.height),
            cc.p(-size.width / 2, 0)
        ];
        var bezierBy = cc.bezierBy(1, bezierByConfig);
        node.runAction(cc.sequence(bezierTo, bezierBy));

    },
    loadScaleToAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        //------------------------------------------------------------------
        //cc.scaleTo && cc.scaleBy  缩放动作
        //------------------------------------------------------------------
        //【作用】 : 创建一个缩放的动作, 支持反向.reverse()
        //参数1 : 达到缩放大小的所需【时间】
        //参数2 : x缩放【比例】，若【没有】参数3，则表示x和y【都】缩放对应的比例
        //参数3 : y缩放【比例】

        //【接口】:
        var duration, sx, sy;
        cc.scaleTo(duration, sx, sy);
        cc.scaleBy(duration, sx, sy);

        //【例子】: 用1秒的时间，把图片缩放到【原始】大小的50%
        var scaleTo = cc.scaleTo(1, 0.5);
        //【例子】: 用1秒的时间，把图片缩放到【当前】大小的200%
        var scaleBy = cc.scaleBy(1, 2);
        //【例子】: 用1秒的时间，把x方向缩放到【原始】大小的50%， y方向缩放到【原始】大小的150%
        var scale = cc.scaleBy(1, 0.5, 1.5);
        var scaleReverse = scale.reverse();
        node.runAction(cc.sequence(scaleTo, scaleBy, scale, scaleReverse));

    },
    loadRotateAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        //------------------------------------------------------------------
        //cc.rotateTo && cc.rotateBy  旋转动作
        //------------------------------------------------------------------
        //【作用】 : 创建一个旋转的动作
        //参数1 : 旋转的【时间】
        //参数2 : 旋转的【角度】，数值【正】为【顺】时针，【负】为【逆】时针

        //【接口】:
        var duration, deltaAngleX, deltaAngleY;
        cc.rotateTo(duration, deltaAngleX, deltaAngleY);
        cc.rotateBy(duration, deltaAngleX, deltaAngleY);

        //【例子】 :  用1秒的时间，将x轴旋转到-90度，y轴旋转到-45度
        var rotate = cc.rotateTo(1, -90, -45);
        //【例子】 :  用1秒的时间，整体旋转到90度
        var rotateTo = cc.rotateTo(1, 90);
        //【例子】 :  用1秒的时间，基于【当前】的角度整体旋转-90度
        var rotateBy = cc.rotateBy(1, -90);
        node.runAction(cc.sequence(rotate, rotateTo, rotateBy));
        //【备注】 :  在Cocos2d-JS中，向上为0度，右x轴正方向为90度，右x轴负方向为-90度
    },
    loadFadeAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        //------------------------------------------------------------------
        // cc.fadeIn && cc,fadeOut 渐变动作
        //-----------------------------------------------------------------
        //【作用】：创建一个渐变出现的动作, 支持反向
        // 参数：时间

        //【接口】：
        var duration, opacity;
        cc.fadeIn(duration);
        cc.fadeOut(duration);
        cc.fadeTo(duration, opacity);

        //【举例】：用1秒的时间，淡出
        var fadeOut = cc.fadeOut(1);
        //【举例】：用1秒的时间，淡入
        var fadeIn = cc.fadeIn(1);
        //【举例】：用1秒的时间，透明度渐变到半透明(128)
        var fadeTo = cc.fadeTo(1, 128);
        node.runAction(cc.sequence(fadeOut, fadeIn, fadeTo));
    },
    loadTintAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        //------------------------------------------------------------------
        //cc.tintTo && cc.tintBy 色彩变化的消失动作
        //------------------------------------------------------------------
        //【作用】：创建一个色彩变化的动作 ， 支持反向
        //参数1：色彩变化的动作【时间】
        //参数2：红色分量
        //参数3：蓝色分量
        //参数4：绿色分量

        //【接口】：
        var duration, deltaRed, deltaGreen, deltaBlue;
        cc.tintTo(duration, deltaRed, deltaGreen, deltaBlue);
        cc.tintBy(duration, deltaRed, deltaGreen, deltaBlue);

        //【举例】：用1秒的时间，红色和蓝色分量升到255，绿色分量降到0。
        var tintTo = cc.tintTo(1, 255, 255, 0);
        //【举例】：用1秒的时间，基于【当前】的颜色分量值，红色和蓝色分量不变，绿色分量上升255。
        var tintBy = cc.tintBy(1, 0, 0, 255);
        node.runAction(cc.sequence(tintTo, tintBy));

    },
    loadBlinkAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        //------------------------------------------------------------------
        // cc.blink  闪烁的动作
        //------------------------------------------------------------------
        //【作用】：创建一额闪烁的动1
        //参数1：闪烁完成的时间
        //参数2:闪烁的次数

        //【接口】：
        var duration, blinks;
        cc.blink(duration, blinks);

        //【举例】：1秒时间，闪烁10次
        var actionBlink = cc.blink(1, 10);
        node.runAction(actionBlink);
    },
    loadOrbitCameraAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        //------------------------------------------------------------------
        //cc.orbitCamera   摄像机动作
        //------------------------------------------------------------------
        //【作用】：创建一个球面坐标轨迹进行旋转的动作
        //参数1 ：旋转轨迹的时间
        //参数2 ：起始半径
        //参数3 ：半径差
        //参数4 ：起始z角
        //参数5 ：旋转z角的差
        //参数6 ：起始x角
        //参数7 ：旋转x角的差
        //【举例】：
        var orbit1 = cc.orbitCamera(2,10, 0, 0, 180, 0, 0);
        var orbit2 = cc.orbitCamera(2,10, 0, 0, 180, -45, 0);
        var orbit3 = cc.orbitCamera(2,10, 0, 0, 180, 90, 0);
        var orbitCamera = cc.sequence(orbit1, orbit2, orbit3);
        node.runAction(orbitCamera);

    },
    loadAnimationByPlistAction : function(){
        cc.spriteFrameCache.addSpriteFrames(res.u4_dance_plist, res.u4_dance_png); // 添加帧缓存
        var node = new cc.Sprite("#dance_0.png"); // 创建节点

        node.runAction(cc.rotateBy(2, -90).repeatForever());
        this.addChild(node);
        node.setPosition(568, 320);
        var frames = [];
        for (var i = 0; i < 13; i++) {
            var str = "dance_" + i + ".png";  // 注意：这里不需要加#号
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }
        var animation = new cc.Animation(frames, 0.15);
        animation.setRestoreOriginalFrame(true);   // 设置[是否恢复到第一帧]
        var animate = cc.animate(animation);    // 用cc.animate将animation包装成动作
        node.runAction(animate);
    },
    loadAnimationByFileAction : function(){
        var node = new cc.Sprite(res.sh_node_64_png);
        this.addChild(node);
        node.setPosition(568, 320);

        var animation = new cc.Animation();        // 创建动画
        animation.addSpriteFrameWithFile(res.sh_node_64_png);
        animation.addSpriteFrameWithFile(res.sh_node_128_png);
        animation.addSpriteFrameWithFile(res.sh_node_256_png);
        animation.addSpriteFrameWithFile(res.sh_node_512_png);
        animation.setDelayPerUnit(0.15);           // 设置[帧间隔]
        animation.setRestoreOriginalFrame(true);   // 设置[是否恢复到第一帧]

        var animate = cc.animate(animation);  // 用cc.animate将animation包装成动作
        node.runAction(animate);
    },
    loadDelayTimeAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        var duration;
        cc.delayTime(duration);
        //【举例】：延时0.5秒，将节点的x轴坐标左移100
        var delay = cc.delayTime(0.5);
        var moveBy = cc.moveBy(1, cc.p(-100, 0));
        var sequence = cc.sequence(delay, moveBy);
        node.runAction(sequence);
    },
    loadRepeatAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        //【举例】：用时0.5秒，节点旋转-90度，重复4次。
        var rotate = cc.rotateBy(0.5, -90);
        var repeat = rotate.repeat(4); // 重复4次。
        node.runAction(repeat);
    },
    loadRepeatForeverAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        //【举例】：用时0.5秒，节点旋转-90度，一直重复执行。
        var rotate = cc.rotateBy(0.5, -90);
        var repeat = rotate.repeatForever(); // 一直重复
        node.runAction(repeat);
    },
    loadSequenceAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        //【举例】：每个动作耗时0.5秒，先后按顺序执行了移动、闪烁、缩放和旋转4个动作。
        var moveBy = cc.moveBy(0.5, cc.p(-100, 0));
        var blink = cc.blink(0.5, 8);
        var scale = cc.scaleTo(0.5, 1.5);
        var rotate = cc.rotateTo(0.5, 90);
        var sequence = cc.sequence(blink, moveBy, scale, rotate);
        node.runAction(sequence);
    },
    loadSpawnAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        //【举例】：两个动作并发执行。其一：用1秒的时间，节点的x轴坐标左移200。其二：用时0.5秒，闪烁8次。
        var moveBy = cc.moveBy(1, cc.p(-200, 0));
        var blink = cc.blink(0.5, 8);
        var spawn = cc.spawn(blink, moveBy);
        node.runAction(spawn);
    },
    loadSpeedAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        //【举例】：用时0.5秒，节点旋转-90度，重复4次，速度为原来的5倍
        var rotate = cc.rotateBy(0.5, -90);
        var repeat = rotate.repeatForever();
        var speed = cc.speed(repeat, 5);
        node.runAction(speed);
    },
    loadActionEaseAction : function(){
        var node = new cc.Sprite(res.sh_node_128_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        //【例子】：2秒时间，携带弹性缓冲效果，让节点的X轴坐标向左移动300像素
        var moveTo = cc.moveBy(2, cc.p(300, 0));
        var elasticInMoveTo = moveTo.easing(cc.easeElasticIn());
        node.runAction(elasticInMoveTo);
    }
});