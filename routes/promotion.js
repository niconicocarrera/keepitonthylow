var express = require('express');
var router = express.Router();
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT promotion_id, promotitle, promoimage, description, startdate, enddate, discountrate FROM promotion";
// execute query
db.query(query, (err, result) => {
if (err) {
console.log(err);
res.render('error');
}
res.render('promotion/allrecords', {allrecs: result });
});
});
module.exports = router;

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT promotion_id, promotitle, description, startdate, enddate, dicsountrate FROM promotion WHERE promotion_id = " +
    req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('promotion/onerec', {onerec: result[0] });
    }
    });
    });

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('promotion/addrec');
    });

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO promotion ( promotitle, promoimage, description, startdate, enddate) VALUES (?, ?, ?, ?, ?)";
    db.query(insertquery,[req.body.promotitle, req.body.promoimage, req.body.description, req.body.startdate, req.body.enddate],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/promotion');
    }
    });
    });

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT promotitle, promoimage, description, startdate, enddate FROM promotion WHERE promotion_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('promotion/editrec', {onerec: result[0] });
    }
    });
    });

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE promotion SET promotitle = ?, promoimage = ?, description = ?, startdate = ?, enddate = ? WHERE promotion_id = " + req.body.promotion_id;
    db.query(updatequery,[req.body.promotitle, req.body.promoimage, req.body.description, req.body.startdate, req.body.enddate],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/promotion');
    }
    });
    });
    

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM promotion WHERE promotion_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/promotion');
    }
    });
    });
    
    
    
    
    
