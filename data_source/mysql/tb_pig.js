/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 上午11:26
 * To change this template use File | Settings | File Templates.
 */

var db = require('./db_common');


//set table name
var tab_name = "pig";


/**
 * get pig information
 * @param _json_con [JSON condition]
 * @param _func [callback function]
 */
exports.get_pig_info = function getPigInfo(_json_con, _func){
    db.get_data(tab_name, _json_con, _func);
}


/**
 * update the pig information
 * @param _json_values  [values that need to be set of JSON]
 * @param _json_con     [JSON condition]
 * @param _func    [callback function]
 */
exports.upd_pig_info = function updPigInfo(_json_values, _json_con, _func){
    db.upd_data(tab_name, _json_values, _json_con, _func);
}


/**
 * insert into the values to database
 * @param _json_values  [values that need to be inserted of JSON]
 * @param _func   [callback function]
 */
exports.ins_pig_info = function insPigInfo(_json_values, _func){
    db.ins_data(tab_name, _json_values, _func);
}