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

var table_name = tab_name.DB_SLAUGHTER_MEAT;


/**
 * router separate
 * @param app
 */
module.exports = function(app){
    //slaughter meat info
    app.get('/meats/:barcode', get);
    app.get('/meats', list);
    app.post('/meats', add);
    app.post('/meats/upd', update);
}


/**
 * get a slaughter meat record
 * @param req
 * @param res
 */
function get(req, res){
    var json_con = {rfid:''};
    common.get(table_name, json_con, res);
}


/**
 * get slaughter meat record list
 * @param req
 * @param res
 */
function list(req, res){
    var json_con = {rfid:''};
    common.list(table_name, json_con, res);
}


/**
 * update slaughter meat record
 * @param req
 * @param res
 */
function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


/**
 * add a slaughter meat record
 * @param req
 * @param res
 */
function add(req, res){

    common.get_query_str(req, res, function(info){
        if(info.check_rfid == undefined ||
            info.batch_rfid == undefined ||
            info.weight == undefined ||
            info.type == undefined){
            common.format_msg_send(res, err_code.ERR_PARAMS_NOT_VALID, 1, null);
            return;
        }

        var checker_rfid = info.check_rfid;
        var batch_rfid = info.batch_rfid;
        var weight = info.weight;
        var type = info.type;

        //get batch from db
        var json_batch_con = {rfid:batch_rfid};
        db.get_data(tab_name.DB_BATCH, json_batch_con, function(batches){
            if(batches.length == 0){
                common.format_msg_send(res, err_code.ERR_DB_NOT_FIND, 1, null);
                return;
            }

            var factory_id = batches[0].factory_id;
            var barcode = getBarcode();

            var json_values = {
                meat_barcode:barcode,
                batch_rfid:batch_rfid,
                TYPE:type,
                weight:weight,
                factory_id:factory_id,
                checker_rfid:checker_rfid,
                upd_time:'now()'
            };

            db.ins_data(table_name, json_values, function(result){
                if(result != undefined && result.affectedRows > 0){
                    common.format_msg_send(res, err_code.SUCCESS, 0, barcode);
                    return;
                }else{
                    common.format_msg_send(res, err_code.ERR_DB_INSERT_DATA_FAILED, 1, null);
                    return;
                }
            });
        });
    });
}


function getBarcode(){
    return '';
}