/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-22
 * Time: 上午10:30
 * To change this template use File | Settings | File Templates.
 */

var tab_name = require('../data_source/mysql/db_table_name');
var common = require('./common');
var db = resuire('../data_source/mysql/db_common');

var table_name = tab_name.DB_WORKER;

/**
 * get worker information by rfid
 * @param req
 * @param res
 */
exports.get = function get(req, res){
    var json_con = {rfid:'1234567890aaaaa'};
    common.get(table_name, json_con, res);
}


/**
 * get worker info by rfid
 * @param _rfid
 * @param _func_
 */
exports.get_worker = function getWorker(_rfid, _func_){
    var json_con = {rfid:_rfid};
    db.get_data(table_name, json_con, _func_);
}


/**
 * get worker infomation by factory id
 * @param req
 * @param res
 */
exports.list = function list(req, res){
    var json_con = {factory_id:10};
    common.list(table_name, json_con, res);
}


/**
 * delete worker record by rfid
 * @param req
 * @param res
 */
exports.del = function del(req, res){
    var json_con = {rfid:'1234'};
    common.del(table_name, json_con, res);
}
exports.delete = del;


/**
 * update the worker info
 * @param req
 * @param res
 */
exports.update = function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


exports.add = function add(req, res){
    var json_values = {};
    common.add(table_name, json_values, res);
}