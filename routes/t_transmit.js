/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 下午5:04
 * To change this template use File | Settings | File Templates.
 */

var tab_name = require('../data_source/mysql/db_table_name');
var common = require('./common');
var db = require('../data_source/mysql/db_common');
var worker = require('./t_worker');
var err_code = require('./errors');


var table_name = tab_name.DB_PIG;


/**
 * router separate
 * @param app
 */
module.exports = function(app){
    //transmit info
    app.get('/transmits/:rfid', get);
    app.get('/transmits', list);
    app.post('/transmits', add);
    app.post('/transmits/upd', update);
}


/**
 *
 * @param req
 * @param res
 */
function get(req, res){
    var json_con = {rfid:''};
    common.get(table_name, json_con, res);
}


/**
 *
 * @param req
 * @param res
 */
function list(req, res){
    var json_con = {rfid:''};
    common.list(table_name, json_con, res);
}


/**
 *
 * @param req
 * @param res
 */
function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


/**
 *
 * @param req
 * @param res
 */
function add(req, res){
    var json_values = {};
    common.add(table_name, json_values, res);

    common.get_query_str(req, res, function(info){
        if(info.trans_id == undefined ||
            info.check_id == undefined){
            common.format_msg_send(res, err_code.ERR_PARAMS_NOT_VALID, 1, null);
            return;
        }else{
            var transporter_rfid = info.trans_id;
            var checker_rfid = info.checker_id;

            worker.get_worker(checker_rfid, function(results){
                if(results == undefined || results.length <= 0){
                    common.format_msg_send(res, err_code.ERR_DB_NOT_FIND, 1, null);
                    return;
                }else{
                    var factory_id = results[0].factory_id;
                    var trans_rfid = createRfid();

                    var json_values = {
                        rfid:trans_rfid,
                        transporter_rfid:transporter_rfid,
                        pig_count:0,
                        checker_rfid:checker_rfid,
                        from_factory_id:factory_id,
                        leave_time:new Date(),
                        upd_time:new Date()
                    };

                    db.ins_data(table_name, json_values, function(result){
                        if(result != undefined && result.affectedRows > 0){
                            common.format_msg_send(res, err_code.SUCCESS, 0, trans_rfid);
                            return;
                        }else{
                            common.format_msg_send(res, err_code.ERR_DB_INSERT_DATA_FAILED, 1, null);
                            return;
                        }
                    });
                }
            });
        }
    });
}



function createRfid(){
    var time = new Date();
    var time_str = common.date_format(time, 'yyyMMddhhmmssS');

    return time_str;
}


/**
 * update the transmit pig count
 * @param _rfid
 * @param _func
 */
exports.pig_count_plus = function pigCountPlus(_rfid, _func){
    var sql_str = "update " + table_name + " set pig_count=pig_count+1 where rfid='" + _rfid + "'";
    db.upd_data_to_db(sql_str, _func);
}


exports.get_transmit = function getTransmit(_rfid, _func){
    var json_con = {rfid:_rfid};
    db.get_data(table_name, json_con, _func);
}