/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-29
 * Time: 上午10:15
 * To change this template use File | Settings | File Templates.
 */

//var batch = require('./t_batch');
//var cure_use = require('./t_cure_use');
//var drug = require('./t_drug');
//var factory = require('./t_factory');
//var feed = require('./t_feed');
//var feed_use = require('./t_feed_use');
//var meat_trans = require('./t_meat_transmit');
//var pig = require('./t_pig');
//var pig_trans = require('./t_pig_transmit');
//var prevent_use = require('./t_prevent_use');
//var sale_meat = require('./t_sale_meat');
//var slaught_bat = require('./t_slaughter_batch');
//var slaught_meat = require('./t_slaughter_meat');
//var transmit = require('./t_transmit');
//var worker = require('./t_worker');
//
//
//exports.url_route_init = function urlRouteInit(_app){
//
//    //batch module
//    _app.get('/batches/:rfid', batch.get);
//    _app.get('/batches', batch.list);
//    _app.post('/batches', batch.add);
//    _app.post('/batches/upd', batch.update);
//
//    //cure use web api
//    _app.get('/cureuse/:id', cure_use.get);
//    _app.get('/cureuse', cure_use.list);
//    _app.post('/cureuse', cure_use.add);
//    _app.post('/cureuse/upd', cure_use.update);
//
//    //drug info web api
//    _app.get('/drugs/:rfid', drug.get);
//    _app.get('/drugs', drug.list);
//    _app.post('/drugs', drug.add);
//    _app.post('/drugs/upd', drug.update);
//
//    //factory info web api
//    _app.get('/factory/:id', factory.get);
//    _app.get('/factory', factory.list);
//    _app.post('/factory', factory.add);
//    _app.post('/factory/upd', factory.update);
//
//    //feed info web api
//    _app.get('/feeds/:rfid', feed.get);
//    _app.get('/feeds', feed.list);
//    _app.post('/feeds', feed.add);
//    _app.post('/feeds/upd', feed.update);
//
//    //feed use info web api
//    _app.get('/feeduse/:id', feed_use.get);
//    _app.get('/feeduse', feed_use.list);
//    _app.post('/feeduse', feed_use.add);
//    _app.post('/feeduse/upd', feed_use);
//
//    //meat transmit web api
//    _app.get('/meat-trans/:id', meat_trans.get);
//    _app.get('/meat-trans', meat_trans.list);
//    _app.post('/meat-trans', meat_trans.add);
//    _app.post('/meat-trans/upd', meat_trans.update);
//
//    //pig info web api
//    _app.get('/pigs/:rfid', pig.get);
//    _app.get('/pigs', pig.list);
//    _app.post('/pigs', pig.add);
//    _app.post('/pigs/upd', pig.update);
//
//    //pig transmit web api
//    _app.get('/pigtrans/:id', pig_trans.get);
//    _app.get('/pigtrans', pig_trans.list);
//    _app.post('/pigtrans', pig_trans.add);
//    _app.post('/pigtrans/upd', pig_trans.update);
//
//    //prevent use
//    _app.get('/prevent/:id', prevent_use.get);
//    _app.get('/prevent', prevent_use.list);
//    _app.post('/prevent', prevent_use.add);
//    _app.post('/prevent/upd', prevent_use.update);
//
//    //sale meat info
//    _app.get('/meatsales/:barcode', sale_meat.get);
//    _app.get('/meatsales', sale_meat.list);
//    _app.post('/meatsales', sale_meat.add);
//    _app.post('/meatsales/upd', sale_meat.update);
//
//    //slaughter batch info
//    _app.get('/slaughtbatches/:id', slaught_bat.get);
//    _app.get('/slaughtbatches', slaught_bat.list);
//    _app.post('/slaughtbatches', slaught_bat.add);
//    _app.post('/slaughtbatches/upd', slaught_bat.update);
//
//    //slaughter meat info
//    _app.get('/meats/:barcode', slaught_meat.get);
//    _app.get('/meats', slaught_meat.list);
//    _app.post('/meats', slaught_meat.add);
//    _app.post('/meats/upd', slaught_meat.update);
//
//    //transmit info
//    _app.get('/transmits/:rfid', transmit.get);
//    _app.get('/transmits', transmit.list);
//    _app.post('/transmits', transmit.add);
//    _app.post('/transmits/upd', transmit.update);
//
//    //worker info
//    _app.get('/workers/:rfid', worker.get);
//    _app.get('/workers', worker.list);
//    _app.post('/workers', worker.add);
//    _app.post('/workers/upd', worker.update);
//}