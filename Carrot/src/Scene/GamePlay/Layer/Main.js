var GPMainLayer = cc.Layer.extend({
    tiledMap            : null, // 瓦片地图
    tileSize            : null, // 瓦片大小
    roadPointArray      : [],   // 怪物路径

    ZOrderEnum          : {},   // 对象层级枚举

    carrot              : {},   // 萝卜对象
    carrotHpBg          : {},   // 萝卜[血量背景]
    carrotHpText        : {},   // 萝卜[血量]

    tiledMapRectArray   : [],   // 瓦片地图区域[二维区域]
    tiledMapRectArrayMap: [],   // 瓦片地图区域映射
    tiledMapRectMapEnemu: {},   // 瓦片地图区域映射枚举
    touchWarningNode    : null, // 触摸警告节点
    towerPanel          : null, // 构建塔的面板

    currGroupCreatedMonsterCount : 0,
    currGroupCreatedMonsterSum : 0,

    onEnter : function(){
        this._super();
        // 加载[属性]
        this.loadProperty();
        // 加载[路劲]
        this.loadPath();
        // 加载[瓦片地图]
        this.loadTiledMap();
        // 加载[开始和结束标志]
        this.loadStartAndEnd();
        // 加载[萝卜血量]
        this.loadCarrotHp();
        // 加载[可以触摸区域]
        this.loadCanTouchRect();
        // 加载[瓦片地图区域映射]
        this.loadTiledMapRectArrayMap();
        // 加载[怪物移动路径]
        this.loadRoadPointArray();
        // 加载[障碍物]
        this.loadObstacle();
        // 加载[道路映射]
        this.loadRoadMap();
        // 加载[下一组怪物]
        this.loadNextGroupMonster();
        // 调度器[update]
        this.scheduleUpdate();
        // 注册[事件]
        this.registerEvent();
    },
    // 注册事件
    registerEvent : function(){
        // [事件监听]怪物吃到萝卜事件
        var onMonsterEatCarrotListener = cc.EventListener.create({
            event       : cc.EventListener.CUSTOM,
            target      : this,
            eventName   : jf.EventName.GP_MONSTER_EAT_CARROT,
            callback    : this.onMonsterEatCarrot
        });
        cc.eventManager.addListener(onMonsterEatCarrotListener, this);

        // [事件监听]游戏结束事件
        var onGameOverListener = cc.EventListener.create({
            event       : cc.EventListener.CUSTOM,
            target      : this,
            eventName   : jf.EventName.GP_GAME_OVER,
            callback    : this.onGameOver
        });
        cc.eventManager.addListener(onGameOverListener, this);

        // [事件监听]萝卜血量更新
        var onUpdateCarrotBloodListener = cc.EventListener.create({
            event       : cc.EventListener.CUSTOM,
            target      : this,
            eventName   : jf.EventName.GP_UPDATE_CARROT_BLOOD,
            callback    : this.onUpdateCarrotBlood
        });
        cc.eventManager.addListener(onUpdateCarrotBloodListener, this);

        // [事件监听]触摸事件
        var onTouchEventListener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : true,
            onTouchBegan  : this.onTouchBegan,
            onTouchMoved  : this.onTouchMoved,
            onTouchEnded  : this.onTouchEnded
        });
        cc.eventManager.addListener(onTouchEventListener, this);

        // [事件监听]创建塔事件
        var onCreateTowerListener = cc.EventListener.create({
            event       : cc.EventListener.CUSTOM,
            target      : this,
            eventName   : jf.EventName.GP_CREATE_TOWER,
            callback    : this.onCreateTower
        });
        cc.eventManager.addListener(onCreateTowerListener, this);

        // [事件监听]移除子弹
        var onRemoveBulletListener = cc.EventListener.create({
            event       : cc.EventListener.CUSTOM,
            target      : this,
            eventName   : jf.EventName.GP_REMOVE_BULLET,
            callback    : this.onRemoveBullet
        });
        cc.eventManager.addListener(onRemoveBulletListener, this);
    },
    // 加载[属性]
    loadProperty : function(){
        this.ZOrderEnum.START        = 10;   // 起点标识
        this.ZOrderEnum.CARROT       = 0;    // 萝卜
        this.ZOrderEnum.MONSTER      = 20;   // 怪物
        this.ZOrderEnum.WAMING       = 30;   // 警告提示
        this.ZOrderEnum.TOWER_PANEL  = 50;   // 创建塔面板

        this.tiledMapRectMapEnemu.NONE      = 0;    // 空地
        this.tiledMapRectMapEnemu.ROAD      = 1;    // 道路
        this.tiledMapRectMapEnemu.SMALL     = 2;    // 小障碍物[占1格]
        this.tiledMapRectMapEnemu.LITTLE    = 3;    // 中障碍物[占2格]
        this.tiledMapRectMapEnemu.BIG       = 4;    // 大障碍物[占4格]
        this.tiledMapRectMapEnemu.INVALID   = 5;    // 无效区域
        this.tiledMapRectMapEnemu.TOWER     = 6;    // 塔

    },
    // 加载[路劲]
    loadPath : function(){
        var themeID = GameManager.getThemeID();
        var level = GameManager.getLevel() + 1;
        var node = new cc.Sprite("res/GamePlay/Theme/Theme" + themeID + "/BG" + level + "/Path" + level + ".png");
        this.addChild(node);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    },
    // 加载[瓦片地图][主要是一些关卡信息配置]
    loadTiledMap : function(){
        var themeID = GameManager.getThemeID();
        var level = GameManager.getLevel() + 1;
        var node = new cc.TMXTiledMap("res/GamePlay/Theme/Theme" + themeID + "/BG" + level + "/Level" + level + ".tmx");
        this.addChild(node);
        this.tiledMap = node;
        this.tileSize = node.getTileSize();
        node.x = (cc.winSize.width - node.width) / 2;
        node.y = (cc.winSize.height - node.height) / 2;
        node.setVisible(false);

        // 设置[所有对象组]坐标偏移量
        var groups = this.tiledMap.getObjectGroups();
        var group = null;
        var offsetX = (cc.winSize.width - this.tiledMap.width) / 2;
        var offsetY = (cc.winSize.height - this.tiledMap.height ) / 2;
        var finalOffsetX = 0;
        var finalOffsetY = 0;
        var groupName = "";
        for (var i = 0; i < groups.length; i++) {
            group = groups[i];
            groupName = group.getGroupName();

            // 大障碍物[占4格]
            if (groupName == "big") {
                finalOffsetX = offsetX;
                finalOffsetY = offsetY;
            }
            // 中等障碍物[占用左右2格]
            else if (groupName == "little"){
                finalOffsetX = offsetX;
                finalOffsetY = offsetY + this.tileSize.height / 2;
            }else if (groupName == "small"
                || groupName == "road"
                || groupName == "start_end"
                || groupName == "invalid") {
                finalOffsetX = offsetX + this.tileSize.width / 2;
                finalOffsetY = offsetY + this.tileSize.height / 2;
            }else{
                cc.warn("GPMainLayer.loadTiledMap(): " + groupName + "对象组的坐标未调整");
            }

            group.setPositionOffset(cc.p(finalOffsetX, finalOffsetY));
        }
    },
    loadCanTouchRect : function(){
        var mapSize = this.tiledMap.getMapSize();

        var nextPosX = (cc.winSize.width - this.tiledMap.width) / 2 + this.tileSize.width / 2;
        var nextPosY = (cc.winSize.height - this.tiledMap.height) / 2 + this.tileSize.height / 2;
        //cc.log("GPMainLayer.loadCanTouchRect() : nextPosX is ", nextPosX);
        //cc.log("GPMainLayer.loadCanTouchRect() : nextPosY is ", nextPosY);

        for (var i = 0; i < mapSize.height; i++) {
            this.tiledMapRectArray[i] = [];
            for (var j = 0; j < mapSize.width; j++) {
                // 空地
                this.tiledMapRectArray[i][j] = cc.rect(nextPosX - this.tileSize.width / 2, nextPosY - this.tileSize.height / 2, this.tileSize.width, this.tileSize.height);

                //node = new cc.Sprite();
                //this.addChild(node, 200);
                //node.setTextureRect(cc.rect(0, 0, tileSize.width - 2, tileSize.height - 2));
                //node.setColor(cc.color(122, 122, 255));
                //node.setPosition(nextPosX, nextPosY);
                //node.setOpacity(120);

                nextPosX += this.tileSize.width;
            }

            nextPosX = (cc.winSize.width - this.tiledMap.width) / 2 + this.tileSize.width / 2;
            nextPosY += this.tileSize.height;
        }
    },
    // 加载[路径坐标]
    loadRoadPointArray : function(){
        this.roadPointArray = [];
        var roadGroup = this.tiledMap.getObjectGroup("road");
        var roads = roadGroup.getObjects();
        for (var i = 0; i < roads.length; i++) {
            this.roadPointArray.push(cc.p(roads[i].x + roadGroup.getPositionOffset().x , roads[i].y + roadGroup.getPositionOffset().y));
        }


    },
    // 加载[瓦片地图区域映射]
    loadTiledMapRectArrayMap : function(){
        var i;
        var mapSize = this.tiledMap.getMapSize();
        for (i = 0; i < mapSize.height; i++) {
            this.tiledMapRectArrayMap[i] = [];
            for (var j = 0; j < mapSize.width; j++) {
                this.tiledMapRectArrayMap[i][j] = this.tiledMapRectMapEnemu.NONE;
            }
        }
    },
    // 加载[障碍物]
    loadObstacle : function () {
        this.loadSmallObstacle();
        this.loadLittleObstacle();
        this.loadBigObstacle();
        this.loadInvalidRect();
    },
    // 加载[小障碍物][占1格]
    loadSmallObstacle : function(){
        var smallGroup = this.tiledMap.getObjectGroup("small");
        var smalls = smallGroup.getObjects();
        var node = null;
        var info = null;
        for (var i = 0; i < smalls.length; i++) {
            node = new cc.Sprite("res/GamePlay/Object/Theme" + GameManager.getThemeID() + "/Object/" + smalls[i].name +".png");
            this.addChild(node);
            node.x = smalls[i].x + smallGroup.getPositionOffset().x;
            node.y = smalls[i].y + smallGroup.getPositionOffset().y;

            info = this.getInfoFromMapByPos(node.x, node.y);
            this.tiledMapRectArrayMap[info.row][info.cel] = this.tiledMapRectMapEnemu.SMALL;
        }
    },
    // 加载[中等障碍物][占2格]
    loadLittleObstacle : function(){
        var littleGroup = this.tiledMap.getObjectGroup("little");
        var objs = littleGroup.getObjects();
        var node = null;
        var info = null;
        for (var i = 0; i < objs.length; i++) {
            node = new cc.Sprite("res/GamePlay/Object/Theme" + GameManager.getThemeID() + "/Object/" + objs[i].name +".png");
            this.addChild(node);
            node.x = objs[i].x + littleGroup.getPositionOffset().x;
            node.y = objs[i].y + littleGroup.getPositionOffset().y;

            info = this.getInfoFromMapByPos(node.x, node.y);
            this.tiledMapRectArrayMap[info.row][info.cel] = this.tiledMapRectMapEnemu.LITTLE;
            this.tiledMapRectArrayMap[info.row][info.cel - 1] = this.tiledMapRectMapEnemu.LITTLE;
        }
    },
    // 加载[大障碍物][占4格]
    loadBigObstacle : function(){
        var bigGroup = this.tiledMap.getObjectGroup("big");
        var objs = bigGroup.getObjects();
        var node = null;
        var info = null;
        for (var i = 0; i < objs.length; i++) {
            node = new cc.Sprite("res/GamePlay/Object/Theme" + GameManager.getThemeID() + "/Object/" + objs[i].name +".png");
            this.addChild(node);
            node.x = objs[i].x + bigGroup.getPositionOffset().x;
            node.y = objs[i].y + bigGroup.getPositionOffset().y;

            info = this.getInfoFromMapByPos(node.x, node.y);
            this.tiledMapRectArrayMap[info.row][info.cel] = this.tiledMapRectMapEnemu.BIG;
            this.tiledMapRectArrayMap[info.row][info.cel - 1] = this.tiledMapRectMapEnemu.BIG;
            this.tiledMapRectArrayMap[info.row - 1][info.cel] = this.tiledMapRectMapEnemu.BIG;
            this.tiledMapRectArrayMap[info.row - 1][info.cel - 1] = this.tiledMapRectMapEnemu.BIG;
        }
    },
    // 加载[无效区域]
    loadInvalidRect : function(){
        var invalidGroup = this.tiledMap.getObjectGroup("invalid");
        var invalids = invalidGroup.getObjects();
        var data = null;
        var info = null;
        for (var i = 0; i < invalids.length; i++) {
            data = invalids[i];
            data.x += invalidGroup.getPositionOffset().x;
            data.y += invalidGroup.getPositionOffset().y;

            info = this.getInfoFromMapByPos(data.x, data.y);
            this.tiledMapRectArrayMap[info.row][info.cel] = this.tiledMapRectMapEnemu.INVALID;
        }
    },
    // 加载[道路映射]
    loadRoadMap : function(){
        var roadGroup = this.tiledMap.getObjectGroup("road");
        var roads = roadGroup.getObjects();

        var currPoint = null;
        var nextPoint = null;
        var offsetCount = 0;
        var info = null;
        var j = 0;
        for (var i = 0; i < roads.length - 1; i++) {
            currPoint = cc.p(roads[i].x + roadGroup.getPositionOffset().x, roads[i].y + roadGroup.getPositionOffset().y);
            nextPoint = cc.p(roads[i + 1].x + roadGroup.getPositionOffset().x, roads[i + 1].y + roadGroup.getPositionOffset().y);
            info = this.getInfoFromMapByPos(currPoint.x, currPoint.y);

            if (currPoint.y == nextPoint.y) {   // X 轴方向
                offsetCount = Math.abs(nextPoint.x - currPoint.x) / this.tileSize.width + 1;
                // X 轴方向[向左]
                if (currPoint.x > nextPoint.x) {
                    for (j = 0; j < offsetCount; j++) {
                        this.tiledMapRectArrayMap[info.row][info.cel - j] = this.tiledMapRectMapEnemu.ROAD;
                    }
                }else{   // X 轴方向[向右]
                    for (j = 0; j < offsetCount; j++) {
                        this.tiledMapRectArrayMap[info.row][info.cel + j] = this.tiledMapRectMapEnemu.ROAD;
                    }
                }
            }else{   // Y 轴方向
                offsetCount = Math.abs(nextPoint.y - currPoint.y) / this.tileSize.height + 1;
                // Y 轴方向[向下]
                if (currPoint.y > nextPoint.y){
                    for (j = 0; j < offsetCount; j++) {
                        this.tiledMapRectArrayMap[info.row - j][info.cel ] = this.tiledMapRectMapEnemu.ROAD;
                    }
                }else{   // Y 轴方向[向上]
                    for (j = 0; j < offsetCount; j++) {
                        this.tiledMapRectArrayMap[info.row + j][info.cel ] = this.tiledMapRectMapEnemu.ROAD;
                    }
                }
            }
        }
    },
    // 加载[起点和萝卜]
    loadStartAndEnd : function(){
        this.loadStartFlag();
        this.loadEndFlag();
    },
    // 加载[起点]
    loadStartFlag : function(){
        var themeId = GameManager.getThemeID();
        var fileName = "res/GamePlay/Object/Theme" + themeId + "/Object/start01.png";
        var node = new cc.Sprite(fileName);
        this.addChild(node, this.ZOrderEnum.START);

        var group = this.tiledMap.getObjectGroup("start_end");
        var obj = group.getObjects()[0];
        node.x = obj.x + group.getPositionOffset().x;
        node.y = obj.y + group.getPositionOffset().y + this.tileSize.height / 2 + 20;
    },
    // 加载[终点萝卜]
    loadEndFlag : function(){
        var node = new cc.Sprite("#hlb1_10.png");
        this.addChild(node, this.ZOrderEnum.CARROT);
        this.carrot = node;

        var group = this.tiledMap.getObjectGroup("start_end");
        var obj = group.getObjects()[1];
        node.x = obj.x + group.getPositionOffset().x;
        node.y = obj.y + group.getPositionOffset().y  + this.tileSize.height / 2 + 20;
    },
    // 加载[血量]
    loadCarrotHp : function(){
        this.loadBloodBg();
        this.loadBlood();
    },
    // 加载[萝卜血量背景]
    loadBloodBg : function(){
        var node = new cc.Sprite("res/GamePlay/carrot_hp_bg.png");
        this.addChild(node, -1);
        this.carrotHpBg = node;
        node.setPosition(this.carrot.x + 75, this.carrot.y - 50);
    },
    // 加载[萝卜血量]
    loadBlood : function () {
        var node = new ccui.TextAtlas("10", "res/Font/num_blood.png", 16, 22, '0');
        this.carrotHpBg.addChild(node);
        this.carrotHpText = node;
        node.setPosition(this.carrotHpBg.width / 2 - 15, this.carrotHpBg.height / 2 - 3);
    },
    // 加载[怪物]
    loadNextGroupMonster : function(){
        if (GameManager.getGroup() > GameManager.getMaxGroup()) {
            cc.log("GPMainLayer.loadNextGroupMonster() : 怪物添加完毕");
            return;
        }
        GameManager.currMonsterDataPool = GameManager.popNextMonsterGroupData();
        GameManager.currMonsterPool[GameManager.getGroup() - 1] = [];

        this.currGroupCreatedMonsterCount = 0;
        // 怪物总数统计
        this.currGroupCreatedMonsterSum = GameManager.getCurrGroupMonsterSum();

        var groupDelay = cc.delayTime(GameManager.getGroupInterval());
        // 延迟时间
        var enemyDelay = cc.delayTime(GameManager.getEnemyInterval());
        var callback = cc.callFunc(this.createMonster.bind(this));
        var createMonsterAction = cc.sequence(enemyDelay.clone(), callback).repeat(this.currGroupCreatedMonsterSum);
        var finalAction = cc.sequence(groupDelay, createMonsterAction);
        this.runAction(finalAction);
    },
    // 加载警告精灵节点
    loadTouchWarning : function(x, y){
        var node = null;
        if (this.touchWarningNode != null) {
            node = this.touchWarningNode;
            node.stopAllActions();
            node.setOpacity(255);
        }else{
            node = new cc.Sprite("res/GamePlay/warning.png");
            this.addChild(node, this.ZOrderEnum.WAMING);
            this.touchWarningNode = node;
        }
        node.setPosition(x, y);

        var delayTime = cc.delayTime(0.4);
        var fadeOut = cc.fadeOut(0.3);
        var callfunc = cc.callFunc(function(){
            this.removeChild(this.touchWarningNode);
            this.touchWarningNode = null;
        }.bind(this));
        var seq = cc.sequence(delayTime, fadeOut, callfunc);
        node.runAction(seq);
    },
    loadTowerPanel : function(args){
        // 接收行和列号
        var node = new TowerPanel(args);
        this.addChild(node, this.ZOrderEnum.TOWER_PANEL);
        this.towerPanel = node;
    },
    createMonster : function(){
        var data = GameManager.currMonsterDataPool[0];

        // 创建怪物数量+1
        this.currGroupCreatedMonsterCount++;

        var monsterData = {
            road : this.roadPointArray,
            speed : data.speed,
            index : data.index
        };

        var namePrefix = data.name.substring(0, data.name.length - 1);
        var fileNamePrefix = "Theme" + GameManager.getThemeID() + "/Monster/" + namePrefix;
        var fileName = "#" + fileNamePrefix + "1.png";
        var node = new Monster(fileName, monsterData, fileNamePrefix);
        this.addChild(node, this.ZOrderEnum.MONSTER);
        GameManager.currMonsterPool[GameManager.getGroup() - 1].push(node);
        node.setPosition(this.roadPointArray[0]);
        node.run();

        // 删除掉第一个数据
        GameManager.currMonsterDataPool.splice(0, 1);
    },
    removeMonster : function(obj){
        var monster = null;
        for (var i = 0; i < GameManager.currMonsterPool.length; i++) {
            for (var j = 0; j < GameManager.currMonsterPool[i].length; j++) {
                monster = GameManager.currMonsterPool[i][j];
                if (monster == obj) {
                    this.removeMonsterByIndex(i, j);
                }
            }
        }
    },
    // 根据数组下标删除怪物
    removeMonsterByIndex : function(i, j){
        this.removeChild(GameManager.currMonsterPool[i][j]);
        GameManager.currMonsterPool[i].splice(j, 1);
    },
    // 移除子弹
    removeBullet : function(obj){
        var bullet = null;
        for (var i = 0; i < GameManager.currBulletPool.length; i++) {
            bullet = GameManager.currBulletPool[i];
            if (bullet == obj) {
                this.removeBulletByIndex(i);
            }
        }
    },
    // 根据数组下标删除子弹
    removeBulletByIndex : function(index){
        this.removeChild(GameManager.currBulletPool[index]);
        GameManager.currBulletPool.splice(index, 1);
    },
    update : function(){
        this.checkCollide();
    },
    removeTowerPanel : function(){
        this.removeChild(this.towerPanel);
        this.towerPanel = null;
    },
    // 创建塔
    createTower : function(data){
        cc.assert(data.name, "GPMainLayer.createTower(): 名字无效！");
        cc.assert(data.x, "GPMainLayer.createTower(): X轴坐标无效！");
        cc.assert(data.y, "GPMainLayer.createTower(): Y轴坐标无效！");

        var towerData = {};
        towerData.name = data.name;
        towerData.x = data.x;
        towerData.y = data.y;

        var node = null;
        switch (data.name){
            case "Bottle":
                towerData.scope = 300;
                towerData.bulletSpeed = 40;
                node = new Bottle(towerData);
                break;
            default :
                cc.warn("GPMainLayer.createTower() : 异常");
                break;
        }

        // 属性设置
        if (node != null) {
            // 标记当前位置有塔
            this.tiledMapRectArrayMap[data.row][data.cel] = this.tiledMapRectMapEnemu.TOWER;
        }

        return node;
    },
    // 碰撞检测
    checkCollide : function(){
        var bullet = null;
        var enemy = null;
        var enemyRect = null;
        for (var x = 0; x < GameManager.currBulletPool.length; x++) {
            bullet = GameManager.currBulletPool[x];
            for (var y = 0; y < GameManager.currMonsterPool.length; y++) {
                for (var z = 0; z < GameManager.currMonsterPool[y].length; z++) {
                    enemy = GameManager.currMonsterPool[y][z];
                    enemyRect = cc.rect(enemy.x - enemy.width / 2, enemy.y - enemy.height / 2, enemy.width, enemy.height);
                    if (cc.rectContainsPoint(enemyRect, bullet.getPosition())) {
                        // 移除子弹
                        this.removeBulletByIndex(x);
                        // 移除怪物
                        this.removeMonsterByIndex(y, z);


                        // 是否进入下一组
                        if (this.isNeedLoadNextGroup()){
                            this.loadNextGroupMonster();

                        }else{
                            if (GameManager.getGroup() > GameManager.getMaxGroup()) {
                                var event = new cc.EventCustom(jf.EventName.GP_GAME_OVER);
                                event.setUserData({
                                    isWin : true
                                });
                                cc.eventManager.dispatchEvent(event);
                            }
                        }
                    }
                }
            }
        }
    },
    isNeedLoadNextGroup : function(){
        var isNeed = false;
        if (GameManager.currMonsterPool[GameManager.group - 1].length == 0
            && this.currGroupCreatedMonsterCount == this.currGroupCreatedMonsterSum){
            isNeed = true;
        }

        return isNeed;
    },
    ////////////////////////
    // 事件
    ////////////////////////
    //[事件]怪物吃到萝卜
    onMonsterEatCarrot : function(event){
        var self = event.getCurrentTarget();
        // 萝卜扣血
        GameManager.subtractCarrotBlood();

        var monster = event.getUserData().target;
        self.removeMonster(monster);

        // 进入下一组
        if (self.isNeedLoadNextGroup()) {
            self.loadNextGroupMonster();
        }
    },
    //[事件]更新萝卜血量
    onUpdateCarrotBlood : function(event){
        var self = event.getCurrentTarget();
        var blood = event.getUserData().blood;
        self.carrotHpText.setString(blood + "");
    },

    //[事件]游戏结束
    onGameOver : function(event){
        var self = event.getCurrentTarget();
        var data = event.getUserData();
        GameManager.setIsWin(data.isWin);
        cc.audioEngine.stopMusic();

        var scene = new GameResultScene();
        cc.director.runScene(scene);
        var str = data.isWin ? "赢了！" : "输了";
        cc.log("GPMainLayer.onGameOver() : 游戏结束，你" + str);
    },
    //[事件]创建塔
    onCreateTower : function(event){
        var self = event.getCurrentTarget();
        var data = event.getUserData();

        // 工厂模式
        var node = self.createTower(data);
        self.addChild(node);

        self.removeTowerPanel();
    },
    // [事件]移除子弹
    onRemoveBullet : function(event){
        var self = event.getCurrentTarget();
        var bullet = event.getUserData().target;
        self.removeBullet(bullet);
    },
    // 事件[触摸]
    onTouchBegan: function (touch, event) {
        var self = event.getCurrentTarget();
        return true;
    },
    onTouchMoved : function (touch, event) {
        var self = event.getCurrentTarget();
    },
    onTouchEnded : function (touch, event) {
        var self = event.getCurrentTarget();
        var result = self.getInfoFromMapByPos(touch.getLocation().x, touch.getLocation().y);

        // 没有触摸到地图区域内
        if (!result.isInMap) {
            self.loadTouchWarning(touch.getLocation().x, touch.getLocation().y);
        }else {
            // 已经有塔或者障碍物
            if (self.tiledMapRectArrayMap[result.row][result.cel] != self.tiledMapRectMapEnemu.NONE) {
                self.loadTouchWarning(result.x + self.tileSize.width / 2, result.y + self.tileSize.height / 2);
            }else{
                // 当前位置没有塔和障碍物
                if (self.towerPanel == null) {
                    self.loadTowerPanel({
                        cel : result.cel,
                        row : result.row,
                        x :result.x,
                        y: result.y
                    });
                }else{
                    self.removeChild(self.towerPanel);
                    self.towerPanel = null;
                }
            }
        }
    },
    // 根据坐标获取在地图中的信息
    getInfoFromMapByPos : function(x, y){
        cc.assert(y !== undefined, "GPMainLayer.getInfoFromMapByPos(): Y坐标不能为空！");

        var isInMap = false;
        var index = {
            x : -1,
            y : -1
        };
        var rect = null;
        for (var i = 0; i < this.tiledMapRectArray.length; i++) {
            for (var j = 0; j < this.tiledMapRectArray[i].length; j++) {
                rect = this.tiledMapRectArray[i][j];
                if (cc.rectContainsPoint(rect, cc.p(x, y))) {
                    index.row = i;
                    index.cel = j;
                    index.x = rect.x;
                    index.y = rect.y;
                    isInMap = true;
                    //cc.log("GPMainLayer.getInfoFromMapByPos() : rect is ", rect);
                }
            }
        }

        return {
            isInMap : isInMap,
            row : index.row,  // 行
            cel : index.cel,  // 列
            x : index.x,
            y : index.y
        };
    }
});