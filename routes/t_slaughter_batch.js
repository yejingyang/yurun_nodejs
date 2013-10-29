/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 下午5:03
 * To change this template use File | Settings | File Templates.
 */

var tab_name = require('../data_source/mysql/db_table_name');
var common = require('./common');
var db = require('../data_source/mysql/db_common');
var worker = require('./t_worker');
var err_code = require('./errors');
var batch = require('./t_batch');

var table_name = tab_name.DB_SLAUGHTER_BATCH;


/**
 * router separate
 * @param app
 */
module.exports = function(app){
    //slaughter batch info
    app.get('/slaughtbatches/:id', get);
    app.get('/slaughtbatches', list);
    app.post('/slaughtbatches', add);
    app.post('/slaughtbatches/upd', update);
}


/**
 * get a slaughter batch record
 * @param req
 * @param res
 */
function get(req, res){
    var json_con = {rfid:''};
    common.get(table_name, json_con, res);
}


/**
 *  get slaughter batch record list
 * @param req
 * @param res
 */
function list(req, res){
    var json_con = {rfid:''};
    common.list(table_name, json_con, res);
}


/**
 * update slaughter batch record
 * @param req
 * @param res
 */
function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


/**
 * add a new slaughter batch record
 * @param req
 * @param res
 */
function add(req, res){
    var json_values = {};
    common.add(table_name, json_values, res);

    common.get_query_str(req, res, function(info){
        if(info.check_rfid == undefined ||
            info.trans_rfid == undefined ||
            info.rfid == undefined ||
            info.pig_rfid == undefined){
            common.format_msg_send(res, err_code.ERR_PARAMS_NOT_VALID, 1, null);
            return;
        }

        var checker_rfid = info.check_rfid;
        var trans_rfid = info.trans_rfid;
        var batch_rfid = info.rfid;
        var pig_rfid = info.pig_rfid;

        batch.pig_count_plus(pig_rfid, function(result){
            if(result == undefined || result.affectedRows <= 0){
                common.format_msg_send(res, err_code.ERR_DB_UPDATE_DATA_FAILED, 1, null);
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

                //update it to the table pig_transmit
                var json_pig_trans_values = {
                    is_active:1,
                    arrive_time:'now()',
                    upd_time:'now()'
                };
                var json_pig_trans_con = {pig_rfid:pig_rfid};
                db.upd_data(tab_name.DB_SLAUGHTER_BATCH, json_pig_trans_values,
                    json_pig_trans_con, function(result){

                    if(result == undefined || result.affectedRows <= 0){
                        common.format_msg_send(res, err_code.ERR_DB_UPDATE_DATA_FAILED, 1, null);
                        return;
                    }

                    //add it to t_slaughter_batch table
                    var json_values = {
                        batch_rfid:batch_rfid,
                        pig_rfid:pig_rfid,
                        checker_rfid:checker_rfid,
                        factory_id:factory_rfid,
                        upd_time:'now()'
                    };
                    common.add(table_name, json_values, res);
                });
            });
        });
    });
}
