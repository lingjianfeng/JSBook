var MMUnlockLayer = cc.LayerColor.extend({
    layout : null,
    background : null,
    ctor : function () {
        this._super(cc.color(0, 0, 0, 220));
        // 加载[Layout]
        this.loadLayout();
        // 加载[背景边框]
        this.loadBackground();
        // 加载[文字提示]
        this.loadInfo();
        // 加载[按钮]
        this.loadButton();
    },
    // 加载[Layout]
    loadLayout : function(){
        var node = new ccui.Layout();
        this.addChild(node);
        this.layout = node;
        node.setContentSize(cc.winSize);// 设置内容大小
        node.setTouchEnabled(true);     // 开启触摸
    },
    // 加载[背景]
    loadBackground : function(){
        var node = new ccui.ImageView("res/Common/bg/woodbg_notice.png");
        this.layout.addChild(node);
        this.background = node;
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    },
    // 加载[图片说明]
    loadInfo : function(){
        var node = new ccui.ImageView("res/MainMenu/unlock_floor.png");
        this.background.addChild(node);
        node.setPosition(this.background.width / 2, this.background.height / 2 + 100);
    },
    // 加载[按钮]
    loadButton : function(){
        var offsetX = 15;
        var posY = 150;
        this.loadConfirmButton(offsetX, posY);
        this.loadCancelButton(offsetX, posY);
    },
    // 加载[确定按钮]
    loadConfirmButton : function(offsetX, posY){
        var node = new ccui.Button();
        this.background.addChild(node);
        node.loadTextures("res/UI/btn_blue_m.png", "res/UI/btn_blue_m_pressed.png", "");
        node.setPosition(this.background.width / 2 - node.width / 2 - offsetX, posY);
        node.addTouchEventListener(function(sender, type){
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    var event = new cc.EventCustom(jf.EventName.UNLOCK_UP);
                    event.setUserData({
                        isSuccess : true
                    });
                    cc.eventManager.dispatchEvent(event);
                    this.removeFromParent();
                    break;
            }
        }, this);
        // 【确定】文字图片
        var infoNode = new ccui.ImageView("res/UI/zh/btn_blue_m_ok.png");
        node.addChild(infoNode);
        infoNode.setPosition(node.width / 2, node.height / 2);
    },
    // 加载[取消按钮]
    loadCancelButton : function(offsetX, posY){
        var node = new ccui.Button();
        this.background.addChild(node);
        node.loadTextures("res/UI/btn_green_m.png", "res/UI/btn_green_m_pressed.png", "");
        node.setPosition(this.background.width / 2 + node.width / 2 + offsetX, posY);
        node.addTouchEventListener(function(sender, type){
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    this.removeFromParent();
                    break;
            }
        }, this);

        var infoNode = new ccui.ImageView("res/UI/zh/btn_green_m_cancel.png");
        node.addChild(infoNode);
        infoNode.setPosition(node.width / 2, node.height / 2);
    }
});