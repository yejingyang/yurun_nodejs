/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-22
 * Time: 上午10:30
 * To change this template use File | Settings | File Templates.
 */

var tab_name = require('../data_source/mysql/db_table_name');
var common = require('./common');
var db = require('../data_source/mysql/db_common');
var err_code = require('./errors');

var table_name = tab_name.DB_WORKER;


/**
 * router separate
 * @param app
 */
module.exports = function(app){
    //    //worker info
    app.get('/workers/:rfid', get);
    app.get('/workers', list);
    app.post('/workers', add);
    app.post('/workers/upd', update);
};


/**
 * get worker information by rfid
 * @param req
 * @param res
 */
function get(req, res){
    var json_con = {rfid:req.params.rfid};
    common.get(table_name, json_con, res);
}


/**
 * get worker info by rfid
 * @param _rfid
 * @param _func_
 */
exports.get_worker = function getWorker(_rfid, _func_){
    console.log('get worker');
    var json_con = {rfid:_rfid};
    db.get_data(table_name, json_con, _func_);
};


/**
 * get worker infomation by factory id
 * @param req
 * @param res
 */
function list(req, res){
    var json_con = {factory_id:10};
    common.list(table_name, json_con, res);
}


/**
 * delete worker record by rfid
 * @param req
 * @param res
 */
function del(req, res){
    var json_con = {rfid:'1234'};
    common.del(table_name, json_con, res);
}


/**
 * update the worker info
 * @param req
 * @param res
 */
function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


function add(req, res){

    common.get_query_str(req, res, function(info){
        console.log(info.login_name);
        if(info.login_name == undefined ||
            info.pass == undefined ||
            info.factory_id == undefined){
            common.format_msg_send(res, err_code.ERR_PARAMS_NOT_VALID, 1, null);
            return;
        }

        var rfid = getWorkerRfid();
        var login_name = info.login_name;

        var json_values = {
            rfid:rfid,
            real_name: info.real_name?info.real_name:' ',
            login_name:login_name,
            pass:info.pass,
            pos:info.pos?info.pos:' ',
            factory_id:info.factory_id,
            tele:info.tele?info.tele:' ',
            email:info.email?info.email:' ',
            address:info.address?info.address:' '
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
 * get worker rfid
 * @returns {String}
 */
function getWorkerRfid(){
    var time = new Date();
    var time_str1 = common.date_format(time, 'yyyMMddhhmmssS');

    return time_str1;
}

