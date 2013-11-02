/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-22
 * Time: 下午5:38
 * To change this template use File | Settings | File Templates.
 */

var err_code = require('./errors');
var db = require('../data_source/mysql/db_common');
var types = require('./types');
var querystr = require('querystring');


/**
 * format the return values
 * @param _errcode  [error code]
 * @param _ret  [return value]
 * @param _data [useful data]
 * @returns {{errcode: *, msg: *, ret: *}|{errcode: *, msg: *, ret: *, data: *}}
 */
function resFormat(_errcode, _ret, _data){
    if(undefined == _data || null == _data){
        var result = {
            errcode :_errcode,
            msg:err_code[_errcode],
            ret:_ret
        };
    }else{
        var result = {
            errcode:_errcode,
            msg:err_code[_errcode],
            ret:_ret,
            data:_data
        };
    }

    return result;
}
exports.res_format = resFormat;


/**
 * format message and send it to remote client
 * @param _res
 * @param _errcode
 * @param _ret
 * @param _data
 */
exports.format_msg_send = function formatMsgSend( _res,_errcode, _ret, _data){
    var ret_str = resFormat(_errcode, _ret, _data);
    _res.send(ret_str);
}



/**
 * check table name and json condition ,both can't be null of undefined
 * @param _tab_name  [table name]
 * @param _json_con  [json condition]
 * @param _res       [response Object]
 * @returns {boolean}
 */
function tabnameAndConCheck(_tab_name, _json_con, _res){

    var ret_str = '';
    //table name can't be null
    if(_tab_name == undefined || null == _tab_name){
        ret_str = resFormat(err_code.ERR_DB_NULL_TABNAME, 1, null);
        _res.send(ret_str);
        return false;
    }

    //json condition can't be null neither
    if(undefined == _json_con || null == _json_con){
        ret_str = resFormat(err_code.ERR_DB_NULL_CONDITION, 1, null);
        _res.send(ret_str);
        return false;
    }

    return true;
}


/**
 * check insert or update values
 * @param _json_values  [json values]
 * @param _res          [response object]
 * @returns {boolean}
 */
function valuesCheck(_json_values, _res){
    var ret_str = '';
    //table name can't be null
    if(_json_values == undefined || null == _json_values){
        ret_str = resFormat(err_code.ERR_DB_NULL_VALUES, 1, null);
        _res.send(ret_str);
        return false;
    }
}


/**
 * get items information from DB
 * @param _tab_name  [table name]
 * @param _json_con  [condition JSON]
 * @param _res   [response Object]
 * @param _type [get data mode]
 */
function getData(_tab_name, _json_con, _res, _type){
    var ret_str = '';

    //table name can't be null, so does it with condition json
    if(tabnameAndConCheck(_tab_name, _json_con, _res) == false){
        return;
    }else{
        db.get_data(_tab_name, _json_con, function(results){

            //results's length can't be zero
            if(results == undefined || results.length == 0){
                ret_str = resFormat(err_code.ERR_DB_NOT_FIND, 1, null);
                _res.send(ret_str);
                return;
            }else{

                //judge it is single mode or not
                if(_type == null || _type == undefined || _type == types.SIGLE_MODE){
                    ret_str = resFormat(err_code.SUCCESS, 0, results[0]);
                    _res.send(ret_str);
                    return;
                }else{
                    ret_str = resFormat(err_code.SUCCESS, 0, results);
                    _res.send(ret_str);
                    return;
                }
            }
        });
    }
}


/**
 * get single data from database
 * @param _tab_name [table name]
 * @param _json_con [condition condition]
 * @param _res  [response object]
 */
exports.get = function get(_tab_name, _json_con, _res){
    getData(_tab_name, _json_con, _res, types.SIGLE_MODE);
}


/**
 * get list of object from database
 * @param _tab_name
 * @param _json_con
 * @param _res
 */
exports.list = function list(_tab_name, _json_con, _res){
    getData(_tab_name, _json_con, _res, types.MULTI_MODE);
}


/**
 * delete an object from database
 * @param _tab_name  [table name]
 * @param _json_con  [json condition]
 * @param _res       [response object]
 */
exports.del = function del(_tab_name, _json_con, _res){
    var ret_str = '';

    //check table name and json condition, both can't be null or undefined
    if(tabnameAndConCheck(_tab_name, _json_con, _res) == false){
        return;
    }else{
        db.del_data(_tab_name, _json_con, function(result){
            if(result != undefined && result.affectedRows > 0){
                ret_str = resFormat(err_code.SUCCESS, 0, null);
                _res.send(ret_str);
                return;
            }else{
                ret_str = resFormat(err_code.ERR_DB_DELETE_DATA_FAILED, 0, null);
                _res.send(ret_str);
                return;
            }
        });
    }
}


/**
 * update the object data from database
 * @param _tab_name   [table name]
 * @param _json_values [values wait for updating]
 * @param _json_con    [json condition]
 * @param _res         [res object]
 */
exports.update = function update(_tab_name, _json_values, _json_con, _res){
    var ret_str = '';

    //check table name and json condition, both can't be null or undefined
    //check update values, it can't be null or undefined
    if(tabnameAndConCheck(_tab_name, _json_con, _res) == false ||
        valuesCheck(_json_values, _res) == false){
        return;
    }else{
        db.upd_data(_tab_name, _json_values, _json_con, function(result){
            if(result != undefined && result.affectedRows > 0){
                ret_str = resFormat(err_code.SUCCESS, 0, null);
                _res.send(ret_str);
                return;
            }else{
                ret_str = resFormat(err_code.ERR_DB_UPDATE_DATA_FAILED, 1, null);
                _res.send(ret_str);
                return;
            }
        });
    }
}


/**
 * insert an object into the database
 * @param _tab_name     [table name]
 * @param _json_values  [json values]
 * @param _res          [response object]
 */
exports.add = function insert(_tab_name, _json_values, _res){
    var ret_str = '';
    
    //check table name, can't be null or undefined
    if(_tab_name == undefined || null == _tab_name){
        ret_str = resFormat(err_code.ERR_DB_NULL_TABNAME, 1, null);
        _res.send(ret_str);
        return;
    }else if(valuesCheck(_json_values, _res) == false){
        return;
    }else{
        db.ins_data(_tab_name, _json_values, function(result){
            if(result != undefined && result.affectedRows > 0){
                ret_str = resFormat(err_code.SUCCESS, 0, null);
                _res.send(ret_str);
                return;
            }else{
                ret_str = resFormat(err_code.ERR_DB_INSERT_DATA_FAILED, 1, null);
                _res.send(ret_str);
                return;
            }     
        });
    }
}


/**
 * get query string from post message
 * @param _req [request string object]
 * @param _res [response Object]
 * @param _func [callback function]
 */
exports.get_query_str = function getQueryString(_req, _res, _func){
    var info = '';
    _req.addListener('data', function(chunk){
        info += chunk;
    })
        .addListener('end', function(){
            info = querystr.parse(info);
            _func(info);
        });
}


/**
 * format the date string
 * @param time
 * @param format
 * @returns {*}
 */
exports.date_format = function dateFormat(time, format){
    var o = {
        "M+" : time.getMonth()+1, //month
        "d+" : time.getDate(), //day
        "h+" : time.getHours(), //hour
        "m+" : time.getMinutes(), //minute
        "s+" : time.getSeconds(), //second
        "q+" : Math.floor((time.getMonth()+3)/3), //quarter
        "S" : time.getMilliseconds() //millisecond
    };
    if(/(y+)/.test(format))
        format=format.replace(RegExp.$1,(time.getFullYear()+"").substr(4- RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,RegExp.$1.length==1? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}