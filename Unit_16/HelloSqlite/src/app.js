//
//var HelloWorldLayer = cc.Layer.extend({
//    database : null,
//    databasePath : "",
//    ctor : function () {
//        this._super();
//        this.loadSqlite();
//    },
//    loadSqlite : function(sender){
//        if (!cc.sys.isNative) { return; }
//        this.database = new sql.SQLiteWrapper();
//        this.databasePath = this.database.initializing("data1.db","res","");
//        // 打开[数据库]
//        if (this.database.open(this.databasePath)){
//            cc.log("数据库打开[成功]！");
//            var st = this.database.statement("select * from item");
//            var ary = [];
//            while(st.nextRow()){
//                var equipVO = new CEquipVO();
//                equipVO.wid = parseInt(st.valueString(0));
//                equipVO.name = st.valueString(1);
//                equipVO.desc = st.valueString(2);
//                equipVO.level = st.valueString(3);
//                equipVO.icon = st.valueString(4);
//                equipVO.quality = st.valueString(5);
//                ary.push(equipVO);
//            }
//            // 数据遍历
//            for(var vo in ary){
//                cc.log("equipData:" + ary[vo].toString());
//            }
//        }else{
//            cc.log("数据库打开[失败]！");
//        }
//    }
//});
//
//var HelloWorldScene = cc.Scene.extend({
//    onEnter:function () {
//        this._super();
//        var layer = new HelloWorldLayer();
//        this.addChild(layer);
//    }
//});
//
//
//var CEquipVO = cc.Class.extend({
//    wid : null,
//    name : null,
//    desc : null,
//    level : null,
//    icon : null,
//    quality : null,
//    toString:function(){
//        return this.wid + " " + this.name + " " + this.level + " " + this.desc + " " + this.icon;
//    }
//});
//




var HelloWorldLayer = cc.Layer.extend({
    database : null,
    databasePath : "",
    ctor : function () {
        this._super();
        this.loadSqlite();
    },
    loadSqlite : function(sender){
        if (!cc.sys.isNative) { return; }
        this.database = new sql.SQLiteWrapper();
        this.databasePath = this.database.initializing("data.db","res","");
        // 打开[数据库]
        if (this.database.open(this.databasePath)){
            cc.log("数据库打开[成功]！");
            var st = this.database.statement("select * from userInfo");
            var userDataArray = [];
            while(st.nextRow()){
                var userData = new UserData();
                userData.uid = parseInt(st.valueString(0));
                userData.name = st.valueString(1);
                userData.level = st.valueString(2);
                userData.desc = st.valueString(3);
                userData.gold = parseInt(st.valueString(4));
                userData.diamond = parseInt(st.valueString(5));
                userDataArray.push(userData);
            }
            // 数据遍历
            for(var data in userDataArray){
                cc.log("userData:" + userDataArray[data].toString());
            }
        }else{
            cc.log("数据库打开[失败]！");
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

var UserData = cc.Class.extend({
    uid     : 0,
    name    : "",
    level   : 0,
    desc    : "",
    gold    : 0,
    diamond : 0,
    toString:function(){
        return this.name + "[" + this.uid + "] 等级：" + this.level + " 描述：" + this.desc + " 金币：" + this.gold + " 钻石：" + this.diamond;
    }
});