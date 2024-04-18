var express = require('express');
var router = express.Router();

/* GET visuals page. */
router.get('/', function(req, res, next) {
  res.render('visuals', { title: 'Express' });
});

module.exports = router;