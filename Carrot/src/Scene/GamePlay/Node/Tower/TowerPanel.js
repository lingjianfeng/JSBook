var TowerPanel = cc.Sprite.extend({
    ctor : function(args){
        this._super("res/GamePlay/select_01.png");
        this.loadProperty(args);
        this.loadTower();
    },
    loadProperty : function(args){
        cc.assert(args.cel >= 0, "TowerPanel.loadProperty(): 列数必须大于0");
        cc.assert(args.row >= 0, "TowerPanel.loadProperty(): 行号必须大于0");
        cc.assert(args.x, "TowerPanel.loadProperty(): X轴坐标必须指定");
        cc.assert(args.y, "TowerPanel.loadProperty(): Y轴坐标必须指定");
        this.cel = args.cel;
        this.row = args.row;
        this.x = args.x + this.width / 2;
        this.y = args.y + this.height / 2;
    },
    loadTower : function(){
        var node = new cc.Sprite("#Bottle01.png");
        this.addChild(node);
        node.setAnchorPoint(0.5, 0);
        node.setName("Bottle");

        // 位置修正
        if (this.y >= cc.winSize.height - 2 * this.height) {
            node.setPosition(this.width / 2, -this.height);
        }else{
            node.setPosition(this.width / 2, this.height);
        }

        // 注册触摸事件
        var onTouchEventListener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : node,
            swallowTouches  : true,
            onTouchBegan  : this.onTouchBegan,
            onTouchMoved  : this.onTouchMoved,
            onTouchEnded  : this.onTouchEnded
        });
        cc.eventManager.addListener(onTouchEventListener, node);
    },
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var size = target.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);
        if (!cc.rectContainsPoint(rect, locationInNode)) {
            return false;
        }

        return true;
    },
    onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
    },
    onTouchEnded: function (touch, event) {
        // target 指向对应塔的图标
        var target = event.getCurrentTarget();
        // 创建塔事件分发
        var createTowerEvent = new cc.EventCustom(jf.EventName.GP_CREATE_TOWER);
        createTowerEvent.setUserData({
            name : target.getName(),
            // target.getParent() 指向TowerPanel
            x : target.getParent().getPositionX(),
            y : target.getParent().getPositionY(),
            cel : target.getParent().cel,
            row : target.getParent().row
        });
        cc.eventManager.dispatchEvent(createTowerEvent);
    }
});