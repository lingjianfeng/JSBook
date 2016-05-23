/**
 * @module sqlite_external
 */
var sql = sql || {};

/**
 * @class SQLiteStatement
 */
sql.SQLiteStatement = {

/**
 * @method reset
 * @return {bool}
 */
reset : function (
)
{
    return false;
},

/**
 * @method execute
 * @return {bool}
 */
execute : function (
)
{
    return false;
},

/**
 * @method dataType
 * @param {int} arg0
 * @return {SQLiteStatement::DataType}
 */
dataType : function (
int 
)
{
    return SQLiteStatement::DataType;
},

/**
 * @method bind
* @param {int|int|int} int
* @param {double|String|int} double
* @return {bool|bool|bool}
*/
bind : function(
int,
int 
)
{
    return false;
},

/**
 * @method nextRow
 * @return {bool}
 */
nextRow : function (
)
{
    return false;
},

/**
 * @method restartSelect
 * @return {bool}
 */
restartSelect : function (
)
{
    return false;
},

/**
 * @method bindNull
 * @param {int} arg0
 * @return {bool}
 */
bindNull : function (
int 
)
{
    return false;
},

/**
 * @method valueInt
 * @param {int} arg0
 * @return {int}
 */
valueInt : function (
int 
)
{
    return 0;
},

/**
 * @method valueString
 * @param {int} arg0
 * @return {String}
 */
valueString : function (
int 
)
{
    return ;
},

/**
 * @method SQLiteStatement
 * @constructor
 */
SQLiteStatement : function (
)
{
},

};

/**
 * @class SQLiteWrapper
 */
sql.SQLiteWrapper = {

/**
 * @method begin
 * @return {bool}
 */
begin : function (
)
{
    return false;
},

/**
 * @method rollback
 * @return {bool}
 */
rollback : function (
)
{
    return false;
},

/**
 * @method directStatement
 * @param {String} arg0
 * @return {bool}
 */
directStatement : function (
str 
)
{
    return false;
},

/**
 * @method statement
 * @param {String} arg0
 * @return {SQLiteStatement}
 */
statement : function (
str 
)
{
    return SQLiteStatement;
},

/**
 * @method initializing
 * @param {String} arg0
 * @param {String} arg1
 * @param {String} arg2
 * @return {String}
 */
initializing : function (
str, 
str, 
str 
)
{
    return ;
},

/**
 * @method commit
 * @return {bool}
 */
commit : function (
)
{
    return false;
},

/**
 * @method lastError
 * @return {String}
 */
lastError : function (
)
{
    return ;
},

/**
 * @method open
 * @param {String} arg0
 * @return {bool}
 */
open : function (
str 
)
{
    return false;
},

/**
 * @method SQLiteWrapper
 * @constructor
 */
SQLiteWrapper : function (
)
{
},

};
