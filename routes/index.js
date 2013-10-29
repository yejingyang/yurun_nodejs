
/*
 * GET home page.
 */

var batch = require('./t_batch');
var cure_use = require('./t_cure_use');
var drug = require('./t_drug');
var factory = require('./t_factory');
var feed = require('./t_feed');
var feed_use = require('./t_feed_use');
var meat_trans = require('./t_meat_transmit');
var pig = require('./t_pig');
var pig_trans = require('./t_pig_transmit');
var prevent_use = require('./t_prevent_use');
var sale_meat = require('./t_sale_meat');
var slaught_bat = require('./t_slaughter_batch');
var slaught_meat = require('./t_slaughter_meat');
var transmit = require('./t_transmit');
var worker = require('./t_worker');


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};


module.exports = function(app){
    //batch route
    batch(app);

    //cure use route
    cure_use(app);

    //drug route
    drug(app);

    //factory route
    factory(app);

    //feed route
    feed(app);

    //feed use route
    feed_use(app);

    //meat transmit route
    meat_trans(app);

    //pig route
    pig(app);

    //pig transmit route
    pig_trans(app);

    //prevent drug use route
    prevent_use(app);

    //sale meat route
    sale_meat(app);

    //slaughter batch route
    slaught_bat(app);

    //slaughter meat route
    slaught_meat(app);

    //transmit route
    transmit(app);

    //worker route
    worker(app);
}