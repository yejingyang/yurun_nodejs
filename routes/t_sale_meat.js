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

var table_name = tab_name.DB_SALE_MEAT;


/**
 * router separate
 * @param app
 */
module.exports = function(app){
    //sale meat info
    app.get('/meatsales/:barcode', get);
    app.get('/meatsales', list);
    app.post('/meatsales', add);
    app.post('/meatsales/upd', update);
}


/**
 * get a meat sale record
 * @param req
 * @param res
 */
function get(req, res){
    var json_con = {rfid:''};
    common.get(table_name, json_con, res);
}


/**
 * get meat sale records
 * @param req
 * @param res
 */
function list(req, res){
    var json_con = {rfid:''};
    common.list(table_name, json_con, res);
}


/**
 * update the meat sale record
 * @param req
 * @param res
 */
function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


/**
 * add a new meat sale record
 * @param req
 * @param res
 */
function add(req, res){

    common.get_query_str(req, res, function(info){
        if(info.check_rfid == undefined ||
            info.barcode == undefined ||
            info.weight == undefined){
            common.format_msg_send(res, err_code.ERR_PARAMS_NOT_VALID, 1, null);
            return;
        }

        var checker_rfid = info.check_rfid;
        var meat_barcode = info.barcode;
        var factory_id = '';
        var weight = info.weight;
        var weight_sum = 0.0;
        var weight_saled = 0.0;

        //get meat info
        var json_meat_con = {meat_barcode:meat_barcode};
        db.get_data(tab_name.DB_SLAUGHTER_MEAT, json_meat_con, function(meats){
            if(meats == undefined || meats.length == 0){
                common.format_msg_send(res, err_code.ERR_DB_NOT_FIND, 1, null);
                return;
            }

            factory_id = meats[0].factory_id;
            weight_sum = parseFloat(meats[0].weight);

            db.get_data(tab_name.DB_SALE_MEAT, json_meat_con, function(saled_meats){
                if(saled_meats != undefined && saled_meats.length > 0){
                    for(var saled_meat in saled_meats){
                        weight_saled += parseFloat(saled_meat.weight);
                    }
                }

                if(weight_sum > weight_saled){
                    var sale_barcode = createSaleBarcode();
                    var json_values = {
                        sale_barcode:sale_barcode,
                        meat_barcode:meat_barcode,
                        weight:weight,
                        factory_id:factory_id,
                        seller_rfid:checker_rfid,
                        upd_time:new Date()
                    };

                    db.ins_data(table_name, json_values, function(result){
                        if(result != undefined && result.affectedRows > 0){
                            common.format_msg_send(res, err_code.ERR_DB_INSERT_DATA_FAILED, 1, null);
                            return;
                        }

                        common.format_msg_send(res, err_code.SUCCESS, 0, sale_barcode);
                        return;
                    });
                }else{
                    common.format_msg_send(res, err_code.ERR_WEIGHT_COUNT_VALID, 1, null);
                    return;
                }
            });
        });
    });
}



function createSaleBarcode(){
    return '';
}