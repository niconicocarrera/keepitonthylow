var express = require('express');
var router = express.Router();

/* GET music page. */
router.get('/', function(req, res, next) {
  res.render('music', { title: 'music' });
});

module.exports = router;