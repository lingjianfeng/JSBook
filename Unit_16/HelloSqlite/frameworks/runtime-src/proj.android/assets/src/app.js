
var HelloWorldLayer = cc.Layer.extend({
    database : null,
    databasePath : "",
    ctor : function () {
        this._super();
        
        this.loadSqlite();

        return true;
    },
    loadSqlite : function(sender){
        if (!cc.sys.isNative) { return; }

        this.database = new sql.SQLiteWrapper();
        this.databasePath = this.database.initializing("data.db","res","");

        // 打开[数据库]
        if (this.database.open(this.databasePath)){
            cc.log("数据库打开[成功]！");

            var st = this.database.statement("select * from equip");
            var ary = [];
            while(st.nextRow()){
                var equipVO = new CEquipVO();
                equipVO.wid = parseInt(st.valueString(0));
                equipVO.name = st.valueString(1);
                equipVO.desc = st.valueString(2);
                equipVO.level = st.valueString(3);
                equipVO.icon = st.valueString(4);
                equipVO.quality = st.valueString(5);
                ary.push(equipVO);
            }
 
            for(var vo in ary){
                cc.log("equipData:" + ary[vo].toString());
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


var CEquipVO = cc.Class.extend({
    wid:null,//like 10000001
    name:null,//like 银票
    level:null,//like 1
    type:null,//like 1
    price:null,//like 200
    stackCount:null,//like 99
    bind:null,//like 1
    desc:null,//like 加银两
    quality:null,//like 1
    icon:null,//like item/article/10000001.png
    toString:function(){
        return this.wid + " " + this.name + " " + this.level + " " + this.desc + " " + this.icon;
    }
});


