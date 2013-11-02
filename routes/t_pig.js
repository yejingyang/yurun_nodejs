/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 下午4:51
 * To change this template use File | Settings | File Templates.
 */

var tab_name = require('../data_source/mysql/db_table_name');
var common = require('./common');
var db = require('../data_source/mysql/db_common');
var err_code = require('./errors');
var worker = require('./t_worker');

var table_name = tab_name.DB_PIG;


/**
 * router separate
 * @param app
 */
module.exports = function(app){
    //pig info web api
    app.get('/pigs/:rfid', get);
    app.get('/pigs', list);
    app.post('/pigs', add);
    app.post('/pigs/upd', update);
}


/**
 * get a pig info by rfid
 * @param req
 * @param res
 */
function get(req, res){
    var json_con = {rfid:''};
    common.get(table_name, json_con, res);
}


/**
 * get pig list
 * @param req
 * @param res
 */
function list(req, res){
    var json_con = {rfid:''};
    common.list(table_name, json_con, res);
}


/**
 * update a pig info
 * @param req
 * @param res
 */
function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


/**
 * add a new pig
 * @param req
 * @param res
 */
function add(req, res){
    common.get_query_str(req, res, function(info){
        if(info.rfid == undefined ||
            info.weight == undefined ||
            info.check_rfid == undefined){
            common.format_msg_send(res, err_code.ERR_PARAMS_NOT_VALID, 1, null);
            return;
        }

        var rfid = info.rfid;
        var chekcer_rfid = info.check_rfid;

        worker.get_worker(chekcer_rfid, function(workers){
            if(workers.length <= 0){
                common.format_msg_send(res, err_code.ERR_DB_NOT_FIND, 1, null);
                return;
            }

            var factory_id = workers[0].factory_id;
            var json_values = {
                rfid:rfid,
                factory_id:factory_id,
                in_weight:info.weight,
                in_checker_rfid:chekcer_rfid,
                in_time:new Date(),
                upd_time:new Date()
            };
            common.add(table_name, json_values, res);
        });
    });
}