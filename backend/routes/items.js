var express = require('express');
var router = express.Router();
var _ = require('lodash');
var logger = require('../lib/logger');
var log = logger();
var items = require('../init_data.json').data;
var multer = require('multer');
var curId = _.size(items);

/* GET items listing. */
router.get('/', function (req, res) {
    res.json(_.toArray(items));
});
//MULTER CONFIGURATION
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/img');
    },
    filename: function (req, file, cb) {
        var filename = file.originalname;
        cb(null, filename);
    }
});
var upload = multer({ storage: storage });
router.post('/', upload.single('image'), function (req, res) {
    var item = req.body;
    curId += 1;
    item.id = curId;
    item.img = './img/' + req.file.filename;
    items[item.id] = item;
    log.info('Created item', item);
    res.json(item);
});

/* Get a specific item by id */
router.get('/:id', function (req, res, next) {
    var item = items[req.params.id];
    if (!item) {
        return next();
    }
    res.json(items[req.params.id]);
});

/* Delete a item by id */
router.delete('/:id', function (req, res) {
    var item = items[req.params.id];
    console.log("this is id", item);
    delete items[req.params.id];
    res.status(204);
    log.info('Deleted item', item);
    res.json(item);
});

/* Update a item by id */
router.put('/:id', function (req, res, next) {
    var item = req.body;
    if (item.id != req.params.id) {
        return next(new Error('ID paramter does not match body'));
    }
    items[item.id] = item;
    log.info('Updating item', item);
    res.json(item);
});


module.exports = router;
