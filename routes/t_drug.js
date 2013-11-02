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

    common.get_query_str(req, res, function(info){
        if(info.NAME == undefined ||
            info.company_name == undefined ||
            info.contact_name == undefined ||
            info.check_rfid == undefined){
            common.format_msg_send(res, err_code.ERR_PARAMS_NOT_VALID, 1, null);
            return;
        }

        var rfid = createDrugRfid();
        var name = info.NAME;
        var checker_rfid = info.check_rfid;
        var company_name = info.company_name;
        var contact_name = info.contact_name;

        var json_values = {
            rfid:rfid,
            NAME:name,
            drug_desc:info.drug_desc?info.drug_desc:' ',
            company_name:company_name,
            contact_name:contact_name,
            checker_rfid:checker_rfid,
            upd_time:new Date()
        };

        db.ins_data(table_name, json_values, function(result){
            if(result == undefined || result.affectedRows <= 0){
                common.format_msg_send(res, err_code.ERR_DB_INSERT_DATA_FAILED, 1, null);
                return;
            }else{
                common.format_msg_send(res, err_code.SUCCESS, 0, rfid);
            }
        });
    });
}


/**
 * create drug rfid
 * @returns {String}
 */
function createDrugRfid(){
    var time = new Date();
    var time_str = common.date_format(time, 'yyyMMddhhmmssS');

    return time_str;
}