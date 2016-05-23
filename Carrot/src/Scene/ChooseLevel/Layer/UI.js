var CLUILayer = cc.Layer.extend({
    discountText : null,
    ctor : function(){
        this._super();
        // 加载[左上角按钮]
        this.loadTopLeftButtons();
        // 加载[中间打折按钮]
        this.loadDiscountButton();
        // 加载[右上角生命星]
        this.loadLifeStar();
    },
    // 加载[左上角按钮]
    loadTopLeftButtons: function(){
        var leftPanel = new ccui.ImageView("res/ChooseLevel/stagemap_toolbar_leftbg.png");
        this.addChild(leftPanel);
        leftPanel.setAnchorPoint(0, 1);
        leftPanel.setPosition(0, cc.winSize.height);

        // 加载[首页]按钮
        this.loadHomeButton(leftPanel);
        // 加载[商店]按钮
        this.loadShopButton(leftPanel);
        // 加载[排行榜]按钮
        this.loadRankingButton(leftPanel);
    },
    // 加载[首页]按钮
    loadHomeButton : function(parent){
        var node = new ccui.Button();
        parent.addChild(node);
        var textures = "res/ChooseLevel/stagemap_toolbar_home.png";
        node.loadTextures(textures, textures, "");
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.2);
        node.setAnchorPoint(0, 0);
        node.setPosition(10, 10);
        node.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                cc.director.runScene(new MainMenuScene());
            }
        }, this);
    },
    // 加载[商店]按钮
    loadShopButton : function(parent){
        var node = new ccui.Button();
        parent.addChild(node);
        var textures = "res/ChooseLevel/stagemap_toolbar_shop.png";
        node.loadTextures(textures, textures, "");
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.2);
        node.setPosition(12 + node.width, 10);
        node.setAnchorPoint(0, 0);
        node.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                cc.log("点击购物车按钮");
            }
        }, this);
    },
    // 加载[排行榜]按钮
    loadRankingButton : function(parent){
        var node = new ccui.Button();
        parent.addChild(node);
        var textures = "res/ChooseLevel/stagemap_toolbar_leaderboard.png";
        node.loadTextures(textures, textures, "");
        node.setPressedActionEnabled(true);
        node.setZoomScale(0.2);
        node.setPosition(12 + node.width * 2, 10);
        node.setAnchorPoint(0, 0);
        node.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                cc.log("点击排行版按钮");
            }
        }, this);
    },
    //加载[中间促销按钮]
    loadDiscountButton: function () {
        var button = new ccui.Button();
        this.addChild(button);
        var resourceStr = "res/ChooseLevel/zh/discount_tag_stone.png";
        button.loadTextures(resourceStr, resourceStr, "");
        button.setAnchorPoint(0.5, 1);
        button.setPosition(cc.winSize.width / 2, cc.winSize.height);
        button.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                cc.log("点击促销按钮");
            }
        }, this);
        // 折扣显示
        var text = new ccui.TextBMFont("8", "res/ChooseLevel/discount.fnt");
        this.discountText = text;
        button.addChild(text);
        text.setAnchorPoint(0, 0);
        text.setPosition(145, 60);
    },
    // 加载[右上角生命星]
    loadLifeStar: function () {
        var button = new ccui.Button();
        this.addChild(button);
        var resourceStr = "res/ChooseLevel/stagemap_toolbar_rightbg.png";
        button.loadTextures(resourceStr, resourceStr, "");
        button.setAnchorPoint(1, 1);
        button.setPosition(cc.winSize.width, cc.winSize.height);
        button.addTouchEventListener(function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                cc.log("点击生命星按钮");
            }
        }, this);

        //生命星星的图片背景
        var starImage = new ccui.ImageView("res/ChooseLevel/zh/stagemap_toolbar_overten.png");
        this.addChild(starImage);
        starImage.setAnchorPoint(1, 1);
        starImage.setPosition(cc.winSize.width, cc.winSize.height);

        // 星星的数量
        var text = new ccui.Text("010", "", 24);
        starImage.addChild(text);
        text.setAnchorPoint(0, 0);
        text.setPosition(190, 65);



    }

});