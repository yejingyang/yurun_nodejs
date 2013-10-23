/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 上午11:21
 * To change this template use File | Settings | File Templates.
 */

var db = require('./db_common');


//set pig transmit table name
var tab_name = "pig_transmit";


/**
 * get pig info
 * @param _json_con [JSON condition]
 * @param _func [callback function]
 */
exports.get_pig_trans_info = function getPigTransInfo(_json_con, _func){
    db.get_data(tab_name, _json_con, _func);
}


/**
 * update the pig transmit record
 * @param _json_values   [values that need to update JSON]
 * @param _json_con     [condition JSON]
 * @param _func     [callback function]
 */
exports.upd_pig_trans_info = function updPigTransInfo(_json_values, _json_con, _func){
    db.upd_data(tab_name, _json_values, _json_con, _func);
}


/**
 * insert the pig transmit record
 * @param _json_values  [values that need to insert JSON]
 * @param _func    [callback function]
 */
exports.ins_pig_trans_info = function insPigTransInfo(_json_values, _json_con, _func){
    db.ins_data(tab_name, _json_values, _func);
}