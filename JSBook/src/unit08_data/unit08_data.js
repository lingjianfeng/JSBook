var Unit08_DataScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new DataLayer();
        this.addChild(layer);
    }
});

// ==================================================================
// -----------------------  数据存储  --------------------------
// ==================================================================
var DataLayer = cc.Layer.extend({
    configJson : null,
    configPlist : null,
    ctor : function () {
        this._super();

        // 加载[storage示例]
        this.loadLocalStorageTest();
        // 加载[json示例]
        this.loadJsonTest();
        // 加载[plist示例]
        this.loadPlistTest();
    },
    loadLocalStorageTest :function(){

        var key, value;
        cc.sys.localStorage.setItem(key, value);
        cc.sys.localStorage.getItem(key);
        cc.sys.localStorage.removeItem(key);
        cc.sys.localStorage.clear();

        cc.sys.localStorage.setItem("isSoundOn", 1);
        var isSoundOn = cc.sys.localStorage.getItem("isSoundOn");
        cc.log(isSoundOn);
        cc.log(cc.sys.localStorage);

        cc.sys.localStorage.removeItem("isSoundOn");
        cc.sys.localStorage.clear();

        // [打印]localStorage里面所有的值
        cc.log(cc.sys.localStorage);

    },
    loadJsonTest : function(){
        cc.log("-------------------[json]-------------------");
        var jsonArray = [ // 定义要加载的json文件数组
            "res/unit08_data/config.json"
        ];
        // 加载json文件，可以批量加载，读取出来的数据保存在results数组中
        cc.loader.load(jsonArray, function(err, results){
            if(err){
                cc.error("Failed to load %s, %s .", jsonArray); // 错误提示
                return;
            }
            cc.log(results);    // 打印[所有加载结果]
            cc.log(results[0]); // 打印[读取的第一个json]
        });
        cc.log("-------------------[json]-------------------");
    },
    loadPlistTest : function(){
        cc.log("-------------------[plist]-------------------");
        var plistArray = [ // 定义要加载的plist文件数组
            "res/unit08_data/config.plist"
        ];
        // 加载plist文件，可以批量加载，读取出来的数据保存在results数组中
        cc.loader.load(plistArray, function(err, results){
            if(err){
                cc.error("Failed to load %s, %s .", plistArray); // 错误提示
                return;
            }
            cc.log(results);    // 打印[所有加载结果]
            cc.log(results[0]); // 打印[读取的第一个plist]
        });
        cc.log("-------------------[plist]-------------------");
    }
});