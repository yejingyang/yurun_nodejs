/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 下午5:02
 * To change this template use File | Settings | File Templates.
 */

var tab_name = require('../data_source/mysql/db_table_name');
var common = require('./common');
var db = resuire('../data_source/mysql/db_common');
var worker = require('./t_worker');
var err_code = resuire('./errors');
var transmit = require('t_transmit');

var table_name = tab_name.DB_PIG_TRANSMIT;

/**
 * get a pig transmit record
 * @param req
 * @param res
 */
exports.get = function get(req, res){
    var json_con = {rfid:''};
    common.get(table_name, json_con, res);
}


/**
 * get pig transmit record list
 * @param req
 * @param res
 */
exports.list = function list(req, res){
    var json_con = {rfid:''};
    common.list(table_name, json_con, res);
}


/**
 * update pig transmit record
 * @param req
 * @param res
 */
exports.update = function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


/**
 * add a new pig transmit
 * @param req
 * @param res
 */
exports.add = function add(req, res){
    common.get_query_str(req, res, function(info){
        if(info.rfid == undefined ||
            info.pig_rfid == undefined ||
            info.weight == undefined){
            common.format_msg_send(res, err_code.ERR_PARAMS_NOT_VALID, 1, null);
        }else{
            var transmit_rfid = info.rfid;
            var pig_rfid = info.pig_rfid;
            var weight = info.weight;
            //set transmit pig count += 1
            transmit.pig_count_plus(transmit_rfid, function(result){
                if(result == undefined || result.affectedRows <= 0){
                    common.format_msg_send(res, err_code.ERR_DB_UPDATE_DATA_FAILED, 1, null);
                    return;
                }else{
                    //insert values of json format
                    var json_values = {
                        transmit_rfid:transmit_rfid,
                        pig_rfid:pig_rfid,
                        weight:weight,
                        is_active:1,
                        leave_time:'now()',
                        upd_time:'now'
                    };
                    common.add(table_name, json_values, res);
                }
            });
        }
    });
}