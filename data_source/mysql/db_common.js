/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-22
 * Time: 上午10:07
 * To change this template use File | Settings | File Templates.
 */

var client = require('./db_conn');
var mysql = require('mysql');

exports.get_data_from_db = function getDataFromDB(_sql_str, _func){
    client.client.query(_sql_str, function(err, results){
        if(err){
            console.error(err.stack || err);
        }

        _func(results);
    });
}


exports.ins_data_to_db = function insDataToDB(_sql_str, _func){
    client.client.query(_sql_str, function(err, results){
        if(err){
            console.error(err.stack || err);
        }

        _func(results);
    });
}


exports.del_data_from_db = function delDataFromDB(_sql_str, _func){

}


/**
 * update the database values
 * @param _tab_name [table name]
 * @param _values_map [columns key values map]
 * @param _con_map [condition key values, just 1 map]
 * @param _func [callback function]
 */
exports.upd_data_to_db = function updDataToDB(_tab_name, _values_map, _con_map, _func){
    if()
    var sql_str = "update ?? set ? where ?";
    var holder = [_tab_name, _values_map, _con_map];
    sql_str = mysql.format(sql_str, holder);
}



exports.sel_data_from_db = function getData(_columns, _table, _values){
    client.client.query('select ?? FROM ?? WHERE ?', [_columns, _table, _values], function(err, results){

    });
}