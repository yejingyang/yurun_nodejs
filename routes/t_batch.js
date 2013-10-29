/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 下午5:00
 * To change this template use File | Settings | File Templates.
 */

var tab_name = require('../data_source/mysql/db_table_name');
var common = require('./common');
var db = require('../data_source/mysql/db_common');
var worker = require('./t_worker');
var err_code = require('./errors');
var transmit = require('./t_transmit');

var table_name = tab_name.DB_BATCH;

/**
 * router separate
 * @param app
 */
module.exports = function(app){
    //batch module
    app.get('/batches/:rfid', get);
    app.get('/batches', list);
    app.post('/batches', add);
    app.post('/batches/upd', update);
}


/**
 *  get a batch by rfid label
 * @param req
 * @param res
 */
function get(req, res){
    var json_con = {rfid:''};
    common.get(table_name, json_con, res);
}


/**
 *  list batches by factory id
 * @param req
 * @param res
 */
function list(req, res){
    var json_con = {factory_id:''};
    common.list(table_name, json_con, res);
}


/**
 * update a batch
 * @param req
 * @param res
 */
function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


/**
 * add a new batch
 * @param req
 * @param res
 */
function add(req, res){
    var json_values = {};
    common.add(table_name, json_values, res);

    common.get_query_str(req, res, function(info){
        if(info.check_rfid == undefined ||
            info.trans_rfid == undefined ||
            info.rfid == undefined){
            common.format_msg_send(res, err_code.ERR_PARAMS_NOT_VALID, 1, null);
            return;
        }else{
            var checker_rfid = info.check_rfid;
            var trans_rfid = info.trans_rfid;
            var transmit_rfid = info.rfid;

            transmit.get_transmit(transmit_rfid, function(results){
                if(results == undefined ||
                    results.length <= 0){
                    common.format_msg_send(res, err_code.ERR_DB_NOT_FIND, 1, null);
                    return;
                }

                worker.get_worker(checker_rfid, function(workers){
                    if(workers == undefined ||
                        workers.length <= 0)
                    {
                        common.format_msg_send(res, err_code.ERR_DB_NOT_FIND, 1, null);
                        return;
                    }

                    var factory_rfid = workers[0].factory_id;

                    var json_values = {
                        rfid:transmit_rfid,
                        pig_count:0,
                        transporter_rfid:trans_rfid,
                        factory_id:factory_rfid,
                        checker_rfid:checker_rfid,
                        upd_time:'now()'
                    };

                    db.ins_data(table_name, json_values, function(result){
                        if(result != undefined && result.affectedRows > 0){
                            common.format_msg_send(res, err_code.SUCCESS, 0, transmit_rfid);
                            return;
                        }else{
                            common.format_msg_send(res, err_code.ERR_DB_INSERT_DATA_FAILED, 1, null);
                            return;
                        }
                    });
                });
            });
        }
    });
}



//
//exports.get_transmit = function getTransmit(_rfid, _func){
//    var json_con = {rfid:_rfid};
//    db.get_data(table_name, json_con, _func);
//}


exports.pig_count_plus = function pigCountPlus(_rfid, _func){
    var sql_str = "update " + table_name + " set pig_count=pig_count+1 where RFID='" + _rfid + "'";
    db.upd_data_to_db(sql_str, _func);
}