var CLBackgroundLayer = cc.Layer.extend({
    scorllView          : null,         // 滚动视图
    zOrderMap           : {},           // 层级枚举
    routeButtonArray    : [],           // 关卡按钮数组
    onEnter : function () {
        this._super();
        // 加载[属性]
        this.loadProperty();
        // 加载[滚动视图]
        this.loadScrollView();
        // 加载[瓦片地图]
        this.loadTiledMap();
        // 加载[关卡]
        this.loadLevel(2);
    },
    // 加载[属性]
    loadProperty : function(){
        this.zOrderMap.route = 1;               // [层级]道路
        this.zOrderMap.routeButtonEffect = 5;   // [层级]按钮特效
        this.zOrderMap.levelButton = 10;        // [层级]按钮

        this.routeButtonArray = [];             // 清空按钮数组
    },
    // 加载[滚动视图]
    loadScrollView : function(){
        var node = new ccui.ScrollView();
        this.addChild(node);
        this.scorllView = node;
        node.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        node.setTouchEnabled(true);
        node.setContentSize(cc.winSize);

        var nextPosX = 0;
        var imageView = null;
        for (var i = 0; i < 14; i++) {
            imageView = new ccui.ImageView("res/ChooseLevel/Map/stage_map_" + i + ".png");
            node.addChild(imageView);
            imageView.setAnchorPoint(cc.p(0, 0.5));
            imageView.setPosition(nextPosX, cc.winSize.height / 2);
            nextPosX += imageView.width;
        }
        node.setInnerContainerSize(cc.size(nextPosX, cc.winSize.height));
    },
    // 加载[瓦片地图]
    loadTiledMap : function(){
        var node = new cc.TMXTiledMap("res/ChooseLevel/Map/TiledMap.tmx");
        var objectGroup = node.getObjectGroup("point");
        var objs = objectGroup.getObjects();
        for (var i = 0; i < objs.length; i++) {
            var button = new ccui.Button();
            this.scorllView.addChild(button, this.zOrderMap.levelButton, i);
            this.routeButtonArray.push(button);
            // 图片纹理
            var texture = "res/ChooseLevel/stagepoint_adv.png";
            // 编辑器中配置的属性
            if (objs[i].isBoos == "YES") {
                texture = "res/ChooseLevel/stagepoint_boss.png";
            }else if (objs[i].isTime == "YES") {
                texture = "res/ChooseLevel/stagepoint_time.png";
            }else if (objs[i].isChange == "YES"){
                texture = "res/ChooseLevel/stagepoint_chance.png";
            }else{
                texture = "res/ChooseLevel/stagepoint_adv.png";
            }
            button.loadTextures(texture, texture, "");
            button.setPosition(objs[i].x, objs[i].y);
            button.setTag(i);
            button.addTouchEventListener(this.onLevelButtonEvent, this);
        }
    },
    // 加载[关卡]
    loadLevel : function(level){
        this.loadRoute(level);
        this.loadLevelEffects(level);
    },
    // 加载[关卡道路]
    loadRoute: function (level) {
        var node = null;
        for (var i = 0; i < level - 1; i++) {
            node = new cc.Sprite("#route_" + (i + 1) + ".png");
            if (i % 10 == 9 ) {
                node.setAnchorPoint(0, 0.5);
            }

            node.x = node.width / 2 + Math.floor(i / 10) * node.width;
            node.y = this.scorllView.getInnerContainerSize().height / 2;
            this.scorllView.addChild(node, this.zOrderMap.route);
        }
    },
    // 加载[指定关卡按钮的特效]
    loadLevelEffects: function (level) {
        var index = level - 1;
        var button = this.routeButtonArray[index];

        var node = new RouteButtonEffect();
        this.scorllView.addChild(node, this.zOrderMap.routeButtonEffect);
        node.setPosition(button.getPosition());
    },
    // 事件[关卡按钮]
    onLevelButtonEvent : function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var level = sender.getTag();     // 当前等级
                // TODO 加载关卡数据，进入游戏。
                // 停止音乐
                cc.audioEngine.stopMusic();
                // 关卡设置
                GameManager.setLevel(sender.getTag());
                // 加载资源，并进入游戏
                cc.LoaderScene.preload(g_gamePlay_resources, function () {
                    GameManager.loadLevelData(GameManager.getLevel());
                    cc.director.runScene(new GamePlayScene());
                }, this);
            break;
        }
    }
});