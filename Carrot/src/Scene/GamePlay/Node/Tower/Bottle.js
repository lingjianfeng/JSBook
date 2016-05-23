var Bottle = TowerBase.extend({
    ctor : function(data){
        this._super("#Bottle_3.png", data);
        // 0.5 秒开火一次
        this.schedule(this.onRotateAndFire, 0.5);
    },
    loadWeapon : function(){
        var node = new cc.Sprite("#Bottle31.png");
        this.addChild(node);
        this.weapon = node;
        node.setPosition(this.width / 2, this.height / 2);
        node.setRotation(90);
    },
    // 旋转并开火
    onRotateAndFire : function(){
        var nearestEnemy =  this.findNearestMonster();
        if (nearestEnemy != null){
            this.weapon.stopAllActions();

            this.fireTargetPos = nearestEnemy.getPosition();

            var rotateVector = cc.pSub(nearestEnemy.getPosition(), this.getPosition());
            var rotateRadians = cc.pToAngle(rotateVector);
            // Cocos2d-x中规定顺时针方向为正，这显然与我们计算出的角度方向相反，所以转化的时候需要把角度a变为-a
            var rotateDegrees = cc.radiansToDegrees(-1 * rotateRadians);

            // speed表示炮塔旋转的速度，0.5 / M_PI其实就是 1 / 2PI，它表示1秒钟旋转1个圆
            var speed = 0.5 / cc.PI;
            // rotateDuration表示旋转特定的角度需要的时间，计算它用弧度乘以速度。
            var rotateDuration = Math.abs(rotateRadians * speed);

            var move = cc.rotateTo(rotateDuration, rotateDegrees);
            var callBack = cc.callFunc(this.onFire, this);
            var action = cc.sequence(move, callBack);
            this.weapon.runAction(action);
        }
    },
    onFire : function(){
        var currBullet = this.createBullet();
        this.getParent().addChild(currBullet);
        GameManager.currBulletPool.push(currBullet);

        // 确保子弹会发射
        var shootVector = cc.pNormalize(cc.pSub(this.fireTargetPos, this.getPosition()));
        var normalizedShootVector = cc.pNeg(shootVector);

        var farthestDistance = 1.5 * cc.winSize.width;
        var overshotVector = cc.pMult(normalizedShootVector, farthestDistance);
        var offscreenPoint = cc.pSub(this.weapon.getPosition(), overshotVector);

        var move = cc.moveTo(this.bulletMoveTime, offscreenPoint);
        var callBack = cc.callFunc(this.removeBullet, currBullet);
        var action = cc.sequence(move, callBack);
        currBullet.runAction(action);
    },
    createBullet : function(){
        var node = new cc.Sprite("#PBottle31.png");
        node.setPosition(this.getPosition());
        node.setRotation(this.weapon.getRotation());
        return node;
    },
    removeBullet : function(sender){
        var event = new cc.EventCustom(jf.EventName.GP_REMOVE_BULLET);
        event.setUserData({
            target : sender
        });
        cc.eventManager.dispatchEvent(event);
    }
});