var GPUILayer = cc.Layer.extend({
    topBar : null,
    bottomBar : null,
    goldText : null,
    groupText : null,
    onEnter : function(){
        this._super();
        // 加载[顶部菜单栏]
        this.loadTopBar();
        // 加载[金币]
        this.loadGoldText();
        // 加载[组信息]
        this.loadGroupInfo();
        // 加载[顶部按钮]
        this.loadTopButtons();

        // 加载[底部菜单栏]
        this.loadBottomBar();
        // 加载[任务背景]
        this.loadMissionBg();
        // 加载[底部按钮]
        this.loadBottomButtons();
        // 注册[事件]
        this.registerEvent();
    },
    registerEvent : function(){
        // 组更新
        var onUpdateGroupListener = cc.EventListener.create({
            event       : cc.EventListener.CUSTOM,
            target      : this,
            eventName   : jf.EventName.GP_UPDATE_GROUP,
            callback    : this.onUpdateGroup
        });
        cc.eventManager.addListener(onUpdateGroupListener, this);
    },
    onUpdateGroup : function(event){
        var group = event.getUserData().group;
        var self = event.getCurrentTarget();
        self.groupText.setString(group + "");
    },
    // 加载[顶部菜单栏]
    loadTopBar : function(){
        var node = new ccui.ImageView("res/GamePlay/UI/top_bg.png");
        this.addChild(node);
        this.topBar = node;
        node.setAnchorPoint(0.5, 1);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height);

        var centerNode = new ccui.ImageView("res/GamePlay/UI/waves_bg.png");
        node.addChild(centerNode);
        centerNode.x = node.width / 2;
        centerNode.y = node.height / 2;

        var groupIndo = new ccui.ImageView("res/GamePlay/UI/CN/group_info.png");
        centerNode.addChild(groupIndo);
        groupIndo.x = centerNode.width / 2;
        groupIndo.y = centerNode.height / 2;
    },
    // 加载[金币文本]
    loadGoldText : function(){
        var goldStr = GameManager.getGold() + "";
        var node = new ccui.Text(goldStr, "Arial", 32);
        this.topBar.addChild(node);
        this.goldText = node;
        node.setAnchorPoint(0, 0.5);
        node.setPosition(100, 43);
    },
    // 加载[组信息]
    loadGroupInfo : function(){
        // 索引从0开始，表示应该+1
        var node = new ccui.Text("1", "Arial", 32);
        this.topBar.addChild(node);
        this.groupText = node;
        node.x = this.topBar.width / 2 - 65;
        node.y = this.topBar.height / 2 + 7;

        var maxGroup = GameManager.getMaxGroup() + 1;
        var maxNode = new ccui.Text(maxGroup + "", "Arial", 32);
        this.topBar.addChild(maxNode);
        maxNode.x = node.x + 60;
        maxNode.y = node.y;
    },
    // 加载[顶部按钮]
    loadTopButtons : function(){
        this.loadSpeedButton();
        this.loadPauseButton();
        this.loadMenuButton();
    },
    // 加载[变速按钮]
    loadSpeedButton : function(){
        var node = new ccui.Button();
        this.topBar.addChild(node);
        node.loadTextureNormal("res/GamePlay/UI/speed_0.png");
        node.loadTexturePressed("res/GamePlay/UI/speed_0.png");
        node.x = 700;
        node.y = this.topBar.height / 2;
    },
    // 加载[暂停按钮]
    loadPauseButton : function () {
        var node = new ccui.Button();
        this.topBar.addChild(node);
        node.loadTextureNormal("res/GamePlay/UI/pause_0.png");
        node.loadTexturePressed("res/GamePlay/UI/pause_0.png");
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.2);
        node.x = 800;
        node.y = this.topBar.height / 2;
    },
    // 加载[菜单按钮]
    loadMenuButton : function () {
        var node = new ccui.Button();
        this.topBar.addChild(node);
        node.loadTextureNormal("res/GamePlay/UI/menu.png");
        node.loadTexturePressed("res/GamePlay/UI/menu.png");
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.2);
        node.x = 870;
        node.y = this.topBar.height / 2;
        // ... ...
        node.addTouchEventListener(function(sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:       // 触摸事件结束时响应
                    var event = new cc.EventCustom(jf.EventName.GP_CREATE_MENU_LAYER);
                    cc.eventManager.dispatchEvent(event);
                    break;
            }
        }.bind(this));
    },
    // 加载[底部菜单栏]
    loadBottomBar : function(){
        var node = new ccui.ImageView("res/GamePlay/UI/bottom_bg.png");
        this.addChild(node);
        this.bottomBar = node;
        node.setAnchorPoint(0.5, 0);
        node.setPosition(cc.winSize.width / 2, 0);
    },
    // 加载[任务背景]
    loadMissionBg : function(){
        var node = new ccui.ImageView("res/GamePlay/UI/adv_mission_bg.png");
        this.bottomBar.addChild(node);
        node.setPosition(105, 25);
    },
    // 加载[底部按钮]
    loadBottomButtons : function(){
        var buttonFileName = [
            "bar_bomb_02.png",
            "bar_blood_02.png",
            "bar_speed_02.png",
            "bar_ice_02.png",
            "bar_slow_02.png"
        ];

        var nextPosX = 420;
        var offsetX = 10;
        var button = null;
        for (var i = 0; i < 5; i++) {
            var image = new ccui.ImageView("res/GamePlay/UI/bar_blank.png");
            this.bottomBar.addChild(image);
            image.setAnchorPoint(0.5, 0);
            image.setPosition(nextPosX, 0);

            button = new ccui.Button();
            image.addChild(button);
            button.setName(buttonFileName[i]);
            button.loadTextureNormal("res/GamePlay/UI/" + buttonFileName[i]);
            button.loadTexturePressed("res/GamePlay/UI/" + buttonFileName[i]);
            button.x = image.width / 2;
            button.y = image.height / 2;

            nextPosX += button.width + offsetX;
        }
    }
});

