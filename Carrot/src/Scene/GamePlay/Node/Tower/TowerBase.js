var TowerBase = cc.Sprite.extend({
    scope           : 0,            // 视野
    bulletSpeed     : 10,           // 子弹速度
    bulletMoveTime  : 0,            // 子弹移动到终点所需的时间
    nearestEnemy    : null,         // 最近的敌人
    fireTargetPos   : cc.p(0, 0),   // 子弹最终的位置
    weapon  : null,     // 武器
    row     : -1,       // 行
    cel     : -1,       // 列
    ctor : function(fileName, data){
        this._super(fileName, data);
        // 加载[属性]
        this.loadProperty(data);
        this.loadWeapon();
    },
    // 加载[属性]
    loadProperty : function(data){
        cc.assert(data.scope > 0, "TowerBase.loadProperty() : scope必须大于0！");
        cc.assert(data.bulletSpeed > 0, "TowerBase.loadProperty() : bulletSpeed必须大于0！");
        this.scope = data.scope;
        this.bulletSpeed = data.bulletSpeed;
        this.bulletMoveTime = 100 / this.bulletSpeed;
        this.setPosition(data.x, data.y);
        this.setName(data.name);
    },
    // 找到最近的敌人
    findNearestMonster : function(){
        var monsterArray = GameManager.currMonsterPool;
        var currMinDistant = this.scope;
        var nearestEnemy = null;
        var monster = null;
        var distance = 0;
        for (var i = 0; i < monsterArray.length; i++) {
            for (var j = 0; j < monsterArray[i].length; j++){
                monster = monsterArray[i][j];
                distance = cc.pDistance(this.getPosition(), monster.getPosition());
                if (distance < currMinDistant) {
                    currMinDistant = distance;
                    nearestEnemy = monster;
                }
            }
        }
        this.nearestEnemy = nearestEnemy;
        return nearestEnemy;
    },
    // 加载[武器]
    loadWeapon : function(){
        cc.warn("TowerBase.loadWeapon() : 请重写此方法！");
    },
    // 开火
    onFire : function(){
        cc.warn("TowerBase.onFire() : 请重写此方法！");
    },
    getCel : function(){
        return this.cel;
    },
    setCel : function(cel){
        this.cel = cel;
    },
    getRow : function(){
        return this.row;
    },
    setRow : function(row){
        this.row = row;
    },
    getWeapon : function(){ // 只读
        return this.weapon;
    }
});