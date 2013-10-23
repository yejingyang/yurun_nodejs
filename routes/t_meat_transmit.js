/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 下午5:02
 * To change this template use File | Settings | File Templates.
 */

var tab_name = require('../data_source/mysql/db_table_name');
var common = require('./common');

var table_name = tab_name.DB_MEAT_TRANSMIT;

/**
 * get meat transmit
 * @param req
 * @param res
 */
exports.get = function get(req, res){
    var json_con = {id:''};
    common.get(table_name, json_con, res);
}


/**
 * get meat transmit record
 * @param req
 * @param res
 */
exports.list = function list(req, res){
    var json_con = {m:''};
    common.list(table_name, json_con, res);
}


/**
 *  update the meat transmit record
 * @param req
 * @param res
 */
exports.update = function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


/**
 * add a new meat transmit record
 * @param req
 * @param res
 */
exports.add = function add(req, res){
    var json_values = {};
    common.add(table_name, json_values, res);
}