/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-22
 * Time: 上午10:07
 * To change this template use File | Settings | File Templates.
 */

var client = require('./db_conn');
var mysql = require('mysql');


/**
 * get data from database by original sql statement
 * @param _sql_sel [sql statement of select query]
 * @param _func [callback function]
 */
exports.get_data_from_db = function getDataFromDB(_sql_sel, _func){
    mysqlQuery(_sql_sel, _func);
}


/**
 * insert data to database by original sql statement
 * @param _sql_ins  [sql statement of insert query]
 * @param _func  [callback function]
 */
exports.ins_data_to_db = function insDataToDB(_sql_ins, _func){
    mysqlQuery(_sql_ins, _func);
}


/**
 * delete from database by original sql statement
 * @param _sql_del  [sql statement of delete query]
 * @param _func   [callback funtion]
 */
exports.del_data_from_db = function delDataFromDB(_sql_del, _func){
    mysqlQuery(_sql_del, _func);
}


/**
 * update data to database by original sql statement
 * @param _sql_upd  [sql statement of update query]
 * @param _func
 */
exports.upd_data_to_db = function updDataToDB(_sql_upd, _func){
    mysqlQuery(_sql_upd, _func);
}


/**
 * original mysql string query for all type query
 * @param _sql_str  [sql string]
 * @param _func  [callback function]
 */
function mysqlQuery(_sql_str, _func){

    //test
    console.log(_sql_str);

    client.client.query(_sql_str, function(err, results){
        if(err){
            console.error(err.stack || err);
        }

        _func(results);
    });
}


/**
 * update the database values
 * @param _tab_name [table name]
 * @param _values_map [columns key values map]
 * @param _con_map [condition key values]
 * @param _func [callback function]
 */
exports.upd_data = function updData(_tab_name, _values_map, _con_map, _func){
    var sql_str = "update ?? set ? where ";
    var holder = [_tab_name, _values_map];
    sql_str = mysql.format(sql_str, holder);

    var cons = '';
    if(undefined == _con_map || null == _con_map){
        cons = '1 = 1';
    }else{
        var sql_format = "?";
        sql_format = mysql.format(sql_format, _con_map);
        cons = sql_format.split(',').join(' and ');
    }

    sql_str += cons;

    mysqlQuery(sql_str, _func);
}


/**
 * select all conlumns from database
 * @param _tab_name [string type table name]
 * @param _con_map  [condition key values]
 * @param _func [callback function]
 */
exports.get_data = function getData(_tab_name, _con_map, _func){
    var sql_str = 'select * from ?? where ';
    var holder = [_tab_name];
    sql_str = mysql.format(sql_str, holder);

    //test
//    console.log(_con_map);

    var cons = '';
    if(undefined == _con_map || null == _con_map){
        cons = '1 = 1';
    }else{
        var sql_format = "?";
        sql_format = mysql.format(sql_format, _con_map);
        cons = sql_format.split(',').join(' and ');
    }
    sql_str += cons;

    mysqlQuery(sql_str, _func);
}


/**
 * insert into data to database for just one record
 * @param _tab_name [table name]
 * @param _values_map [columns key values map]
 * @param _func [callback function]
 */
exports.ins_data = function insData(_tab_name, _values_map, _func){
    var sql_str = "insert into ?? set ? ";
    var holder = [_tab_name, _values_map];
    sql_str = mysql.format(sql_str, holder);

    mysqlQuery(sql_str, _func);
}


/**
 * delete record from database
 * @param _tab_name [string type table name]
 * @param _con_map  [condition key values]
 * @param _func [callback function]
 */
exports.del_data = function delData(_tab_name, _con_map, _func){
    var sql_str = 'delete from ?? where ';
    var holder = [_tab_name];
    sql_str = mysql.format(sql_str, holder);

    var cons = '';
    if(undefined == _con_map || null == _con_map){
        return;
    }else{
        var sql_format = "?";
        sql_format = mysql.format(sql_format, _con_map);
        cons = sql_format.split(',').join(' and ');

        sql_str += cons;
        mysqlQuery(sql_str, _func);
    }
}