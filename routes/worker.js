/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-22
 * Time: 上午10:30
 * To change this template use File | Settings | File Templates.
 */

var worker = require('../data_source/mysql/tb_worker');


function get(req, res){

    worker.get_worker_by_rfid('1234567890aaaaaa', function(worker_info){
        res.send(worker_info);
    });
}
exports.get = get;

function list(req, res){

}
exports.list = list;


function del(req, res){

}
exports.delete = del;


function update(req, res){

}
exports.update = update;

