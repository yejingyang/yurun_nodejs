/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 下午5:00
 * To change this template use File | Settings | File Templates.
 */

var tab_name = require('../data_source/mysql/db_table_name');
var common = require('./common');

var table_name = tab_name.DB_FEED_USE;


/**
 * router separate
 * @param app
 */
module.exports = function(app){
    //feed use info web api
    app.get('/feeduse/:id',  get);
    app.get('/feeduse',  list);
    app.post('/feeduse',  add);
    app.post('/feeduse/upd',  update);
}


/**
 * get feed use record
 * @param req
 * @param res
 */
function get(req, res){
    var json_con = {rfid:''};
    common.get(table_name, json_con, res);
}


/**
 * get feed use record list
 * @param req
 * @param res
 */
function list(req, res){
    var json_con = {rfid:''};
    common.list(table_name, json_con, res);
}


/**
 * update the feed use record
 * @param req
 * @param res
 */
function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


/**
 * add a new feed use record
 * @param req
 * @param res
 */
function add(req, res){
    var json_values = {};
    common.add(table_name, json_values, res);
}