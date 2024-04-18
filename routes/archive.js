var express = require('express');
var router = express.Router();

/* GET archive page. */
router.get('/', function(req, res, next) {
  res.render('archive', { title: 'Express' });
});

module.exports = router;