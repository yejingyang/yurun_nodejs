/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-23
 * Time: 下午5:00
 * To change this template use File | Settings | File Templates.
 */

var tab_name = require('../data_source/mysql/db_table_name');
var common = require('./common');
var err_code = require('./errors');
var db = require('../data_source/mysql/db_common');


var table_name = tab_name.DB_FACTORY;


/**
 * router separate
 * @param app
 */
module.exports = function(app){
    //factory info web api
    app.get('/factory/:id', get);
    app.get('/factory', list);
    app.post('/factory', add);
    app.post('/factory/upd', update);
}


/**
 * get a factory info by id
 * @param req
 * @param res
 */
function get(req, res){
    var json_con = {id:req.params.id};
    common.get(table_name, json_con, res);
}


/**
 * get all factory info
 * @param req
 * @param res
 */
function list(req, res){
    var json_con = {rfid:''};
    common.list(table_name, json_con, res);
}


/**
 * update a factory info
 * @param req
 * @param res
 */
function update(req, res){
    var json_values = {};
    var json_con = {};
    common.update(table_name, json_values, json_con, res);
}


/**
 *  add a new factory info
 * @param req
 * @param res
 */
function add(req, res){
    common.get_query_str(req, res, function(info){
        if(info.NAME == undefined ||
            info.TYPE == undefined ||
            info.factory_desc == undefined){
            common.format_msg_send(res, err_code.ERR_PARAMS_NOT_VALID, 1, null);
            return;
        }

        var json_values = {
            NAME:info.NAME,
            TYPE:info.TYPE,
            tele:info.tele?info.tele:' ',
            factory_desc:info.factory_desc,
            address:info.address?info.address:' '
        };

        db.ins_data(table_name, json_values, function(result){
            if(result == undefined || result.affectedRows <= 0){
                common.format_msg_send(res, err_code.ERR_DB_INSERT_DATA_FAILED, 1, null);
                return;
            }else{
                common.format_msg_send(res, err_code.SUCCESS, 0, 'new factory inserted!');
            }
        });
    });
}