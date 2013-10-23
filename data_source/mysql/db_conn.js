/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-22
 * Time: 上午10:03
 * To change this template use File | Settings | File Templates.
 */

var mysql = require('mysql');

function handleError(err){
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            connect();
        }else{
            console.error(err.stack || err);
        }
    }
}


var client;

function connect(){
    client = mysql.createConnection(db_conn_info);
    client.connect(handleError);
    client.on('error', handleError);
}


var db_conn_info = {
    'host' : '172.17.13.202',
    'database' : 'yurun2',
    'port' : 3306,
    'user' : 'pdit',
    'password' : 'pdit'
};

//var columns = ['user', 'cook'];
//var userId = 'yang';
//var sql = "SELECT * FROM ?? WHERE ?? = ?";
//var inserts = [columns, 'id', userId];
//sql = mysql.format(sql, inserts);

//var columns = ['user', 'cook'];
//var tab = 'tab_name';
//var condition = {
//    'name' : 'yang',
//    'fuck' : 'yeshhhh'
//};
//var sql = "select ?? from ?? where ";
////var inserts = [columns, tab, 'yang'];
//var inserts = ['yang', tab];
//sql = mysql.format(sql, inserts);
//
//var con = "?"
//
//sql += "yang";


//var post  = {id: 1, title: 'Hello MySQL'};
//var sql = "insert into post set ?";
//var sql = "update ?? set ? where ??";
//var tab = 'tabname';
//var con = {id:1}
//var con = 'yang';
//upds = [tab, post, con]; /
//sql = mysql.format(sql, upds);

//var post  = {id: 1};
//var sql = "?";
//sql = mysql.format(sql, post);
//sql.replace(',', 'and');
//sql = sql.split(',').join(' and ');


//console.log(post.count);


//console.log('sql is below:');
//console.log(sql);

connect();

exports.client = client;