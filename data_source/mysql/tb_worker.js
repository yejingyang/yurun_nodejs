/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-22
 * Time: 上午10:19
 * To change this template use File | Settings | File Templates.
 */

var db = require('./db_common');


function getWorkerFromDB(_sql_con, _func){
    var sql_str = "select * from worker ";
    sql_str += _sql_con;
    db.get_data_from_db(sql_str, _func);
}
exports.get_worker_info = getWorkerFromDB;


function getWorkerInfoByRfid(_rfid, _func){
    var sql_con = " where rfid='" + _rfid + "'";
    getWorkerFromDB(sql_con, function(results){
        _func(results[0]);
    });
}
exports.get_worker_by_rfid = getWorkerInfoByRfid;

function getWorkerList(_condition, _func){
    getWorkerFromDB(_condition, _func);
}
exports.get_worker_list = getWorkerList;

