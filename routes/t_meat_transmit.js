/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 下午5:02
 * To change this template use File | Settings | File Templates.
 */

var tab_name = require('../data_source/mysql/db_table_name');
var common = require('./common');
var db = require('../data_source/mysql/db_common');
var worker = require('./t_worker');
var err_code = require('./errors');

var table_name = tab_name.DB_MEAT_TRANSMIT;


/**
 * router separate
 * @param app
 */
module.exports = function(app){
    //meat transmit web api
    app.get('/meat-trans/:id', get);
    app.get('/meat-trans', list);
    app.post('/meat-trans', add);
    app.post('/meat-trans/upd', update);
}


/**
 * get meat transmit
 * @param req
 * @param res
 */
function get(req, res){
    var json_con = {id:''};
    common.get(table_name, json_con, res);
}


/**
 * get meat transmit record
 * @param req
 * @param res
 */
function list(req, res){
    var json_con = {m:''};
    common.list(table_name, json_con, res);
}


/**
 *  update the meat transmit record
 * @param req
 * @param res
 */
function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


/**
 * add a new meat transmit record   [transmit ]
 * @param req
 * @param res
 */
function add(req, res){

    common.get_query_str(req, res, function(info){
        if(info.check_rfid == undefined ||
            info.trans_rfid == undefined ||
            info.barcode == undefined){
            common.format_msg_send(res, err_code.ERR_PARAMS_NOT_VALID, 1, null);
            return;
        }

        var checker_rfid = info.check_rfid;
        var transporter_rfid = info.trans_rfid;
        var meat_barcode = info.barcode;

        //get meat info
        var json_meat_con = {meat_barcode:meat_barcode};
        db.get_data(tab_name.DB_SLAUGHTER_MEAT, json_meat_con, function(meats){
            if(meats == undefined || meats.length == 0){
                common.format_msg_send(res, err_code.ERR_DB_NOT_FIND, 1, null);
                return;
            }

            var factory_id = meats[0].factory_id;

            var json_values = {
                meat_barcode:meat_barcode,
                transporter_rfid:transporter_rfid,
                leave_checker_rfid:checker_rfid,
                from_factory_id:factory_id,
                leave_time:'now()',
                upd_time:'now()'
            };

            common.add(table_name, json_values, res);
        });
    });
}


exports.recv_meat = function recvMeat(req, res){

    common.get_query_str(req, res, function(info){
        if(info.check_rfid == undefined ||
            info.barcode == undefined){
            common.format_msg_send(res, err_code.ERR_PARAMS_NOT_VALID, 1, null);
            return;
        }

        var checker_rfid = info.check_rfid;
        var meat_barcode = info.barcode;

        //get meat info
        var json_meat_con = {meat_barcode:meat_barcode};
        db.get_data(tab_name.DB_MEAT_TRANSMIT, json_meat_con, function(meats){
            if(meats == undefined || meats.length == 0){
                common.format_msg_send(res, err_code.ERR_DB_NOT_FIND, 1, null);
                return;
            }

            //get worker info, get factory rfid
            var json_worker_con = {rfid:checker_rfid};
            db.get_data(tab_name.DB_WORKER, json_worker_con, function(workers){
                if(workers == undefined || workers.length == 0){
                    common.format_msg_send(res, err_code.ERR_DB_NOT_FIND, 1, null);
                    return;
                }

                var factory_id = workers[0].factory_id;

                //set update values
                var json_values = {
                    arrive_checker_rfid:checker_rfid,
                    to_factory_id:factory_id,
                    arrive_time:'now()',
                    upd_time:'now()'
                };
                var json_meat_con = {meat_barcode:meat_barcode};
                common.update(table_name, json_values, json_meat_con, res);
                return;
            });
        });
    });
}