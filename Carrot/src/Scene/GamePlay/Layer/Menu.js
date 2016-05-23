var GPMenuLayer = ccui.Layout.extend({
    panel : null,
    onEnter : function(){
        this._super();
        cc.director.pause();    // 导演暂停
        // 加载[基础配置]
        this.loadConfig();
        // 加载[背景面板]
        this.loadPanel();
        // 加载[关卡标签]
        this.loadLevelLabel();
        // 加载[继续游戏按钮]
        this.loadGameContinueButton();
        // 加载[再来一次按钮]
        this.loadGameRestartButton();
        // 加载[返回主页按钮]
        this.loadHomeButton();
        // 加载[返回主页按钮]
        this.loadWeiboButton();
    },
    onExit : function(){
        cc.director.resume();
        this._super();
    },
    // 加载[基础配置]
    loadConfig : function(){
        this.setTouchEnabled(true);
        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.setContentSize(cc.winSize);
        this.setBackGroundColorOpacity(128);
        this.setBackGroundColor(cc.color(0, 0, 0));
    },
    loadPanel : function () {
        var node = new cc.Sprite("res/GamePlay/UI/adv_menu_bg.png");
        this.addChild(node);
        this.panel = node;
        node.setPosition(cc.winSize.width / 2, cc.winSize.height - node.height / 2);
    },
    loadLevelLabel : function(){
        var levelStr = GameManager.getLevel() < 10 ? "0" + GameManager.getLevel() : GameManager.getLevel() + "";
        var node = new ccui.Text(levelStr, "", 32);
        this.panel.addChild(node);
        node.setPosition(this.panel.width / 2, this.panel.height - 130);
    },
    loadGameContinueButton : function(){
        var node = new ccui.Button();
        this.panel.addChild(node);
        node.loadTextureNormal("res/UI/btn_green_b.png");
        node.loadTexturePressed("res/UI/btn_green_b_pressed.png");
        node.setPosition(this.panel.width / 2, this.panel.height / 2 + 85);
        node.addTouchEventListener(function(sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:   // 触摸事件结束时响应
                    // [事件抛出]隐藏菜单层
                    var event = new cc.EventCustom(jf.EventName.GP_REMOVE_MENU_LAYER);
                    cc.eventManager.dispatchEvent(event);
                    break;
                default:
                    break;
            }
        }.bind(this));

        var info = new ccui.ImageView("res/GamePlay/UI/CN/adv_menu_continue.png");
        node.addChild(info);
        info.setPosition(node.width / 2, node.height / 2);
    },
    loadGameRestartButton : function(){
        var node = new ccui.Button();
        this.panel.addChild(node);
        node.loadTextureNormal("res/UI/btn_blue_b.png");
        node.loadTexturePressed("res/UI/btn_blue_b_pressed.png");
        node.setPosition(this.panel.width / 2, this.panel.height / 2 - 25);
        node.addTouchEventListener(function(sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:   // 触摸事件结束时响应
                    cc.audioEngine.stopMusic();
                    var level = GameManager.getLevel();
                    GameManager.loadLevelData(level);
                    var scene = new GamePlayScene();
                    cc.director.runScene(scene);
                    break;
                default:
                    break;
            }
        }.bind(this));

        var info = new ccui.ImageView("res/GamePlay/UI/CN/adv_menu_restart.png");
        node.addChild(info);
        info.setPosition(node.width / 2, node.height / 2);
    },
    loadHomeButton : function(){
        var node = new ccui.Button();
        this.panel.addChild(node);
        node.loadTextureNormal("res/UI/btn_blue_l.png");
        node.loadTexturePressed("res/UI/btn_blue_l_pressed.png");
        node.setPosition(this.panel.width / 2 - 83, this.panel.height / 2 - 138);
        node.addTouchEventListener(function(sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:   // 触摸事件结束时响应
                    cc.audioEngine.stopMusic();
                    var scene = new ChooseLevelScene();
                    cc.director.runScene(scene);
                    break;
                default:
                    break;
            }
        }.bind(this));
        var info = new ccui.ImageView("res/GamePlay/UI/CN/adv_menu_home.png");
        node.addChild(info);
        info.setPosition(node.width / 2, node.height / 2);
    },
    loadWeiboButton : function(){
        var node = new ccui.Button();
        this.panel.addChild(node);
        node.loadTextureNormal("res/UI/btn_blue_l.png");
        node.loadTexturePressed("res/UI/btn_blue_l_pressed.png");
        node.setPosition(this.panel.width / 2 + 83, this.panel.height / 2 - 138);

        var info = new ccui.ImageView("res/GamePlay/UI/CN/adv_menu_weibo.png");
        node.addChild(info);
        info.setPosition(node.width / 2, node.height / 2);
    }
});