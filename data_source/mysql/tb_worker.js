/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-22
 * Time: 上午10:19
 * To change this template use File | Settings | File Templates.
 */

var db = require('./db_common');


//set worker table name
var tab_name = "worker";


/**
 * get worker information by the condition string
 * @param _json_con  [condition string]
 * @param _func   [callback function]
 */
function getWorkerFromDB(_json_con, _func){
    db.get_data(tab_name, _json_con, _func);
}
exports.get_worker_info = getWorkerFromDB;


/**
 * get worker information by the rfid code
 * @param _rfid  [rfid code]
 * @param _func   [callback function]
 */
function getWorkerInfoByRfid(_rfid, _func){
    var con_map = {rfid:_rfid};

    db.get_data(tab_name, con_map, function(results){
        _func(results[0]);
    });
}
exports.get_worker_by_rfid = getWorkerInfoByRfid;


/**
 * get worker list by condition string
 * @param _json_con  [condition string]
 * @param _func   [callback function]
 */
function getWorkerList(_json_con, _func){
    getWorkerFromDB(_json_con, _func);
}
exports.get_worker_list = getWorkerList;

