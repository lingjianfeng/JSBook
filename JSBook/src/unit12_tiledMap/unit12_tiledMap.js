var Unit12_TiledMapScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.loadLayer();
    },
    loadLayer : function(){
        var node = new Unit12_TiledMapLayer();
        this.addChild(node);
    }
});

var Unit12_TiledMapLayer = cc.Layer.extend({
    ctor : function(){
        this._super();
        this.loadTiledMap();
    },
    // 加载[瓦片地图]
    loadTiledMap : function(){
        var node = new cc.TMXTiledMap("res/unit12_tiledMap/TiledMap.tmx");
        this.addChild(node);
        node.setPosition((cc.winSize.width - node.width) / 2, 0);

        var road = node.getObjectGroup("hero_road");
        road.setPositionOffset(cc.p((cc.winSize.width - node.width) / 2, 0));
        var objs = road.getObjects();
        var roadX = null;
        var pointArray = [];
        for (var i = 0; i < objs.length; i++) {
            //roadX = objs[i].x + (cc.winSize.width - node.width) / 2;
            roadX = objs[i].x + road.getPositionOffset().x;
            pointArray.push(cc.p(roadX , objs[i].y));
        }

        // ... ...
        var layer = node.getLayer("obstacle");
        // 判断当前位置是否有瓦片
        if (layer.getTileGIDAt(2, 4) > 0) {
            var tile = layer.getTileAt(2, 4);
            tile.setVisible(false);
        }

    },
    load : function(){
        var node = new cc.TMXTiledMap("res/unit12_tiledMap/TiledMap.tmx");
        this.addChild(node);
        node.setPosition((cc.winSize.width - node.width) / 2, 0);

        
    },
    loadGroup : function(){
        //getPositionOffset

        var node, offset, properties, groupName, propertyName, objectName, objects;
        node.getPositionOffset()
        node.setPositionOffset(offset)
        node.getProperties()
        node.setProperties(properties)
        node.getGroupName()
        node.setGroupName(groupName)
        node.propertyNamed(propertyName)
        node.getObject(objectName)
        node.getObjects()
        node.setObjects(objects)
    }
});

// 书中代码
var Code = cc.Layer.extend({
    ctor : function() {
        this._super();
    }
});

