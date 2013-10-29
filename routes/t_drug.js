/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 下午4:59
 * To change this template use File | Settings | File Templates.
 */

var tab_name = require('../data_source/mysql/db_table_name');
var common = require('./common');
var db = require('../data_source/mysql/db_common');
var err_code = require('./errors');

var table_name = tab_name.DB_DRUG;


/**
 * router separate
 * @param app
 */
module.exports = function(app){
    //drug info web api
    app.get('/drugs/:rfid', get);
    app.get('/drugs', list);
    app.post('/drugs', add);
    app.post('/drugs/upd', update);
}


/**
 * get a drug information by rfid
 * @param req
 * @param res
 */
function get(req, res){
    var json_con = {rfid:req.params.rfid};
    common.get(table_name, json_con, res);
}


/**
 * get drug list by checker rfid
 * @param req
 * @param res
 */
function list(req, res){
    var json_con = {rfid:''};
    common.list(table_name, json_con, res);
}


/**
 *  update drug information
 * @param req
 * @param res
 */
function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


/**
 * add a new drug
 * @param req
 * @param res
 */
function add(req, res){
    var json_values = {};
    common.add(table_name, json_values, res);
}