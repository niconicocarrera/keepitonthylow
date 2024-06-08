var express = require('express');
var router = express.Router();
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
    let query = "SELECT order_id, customer_id, saledate,customernotes, paymentstatus, authorizationnum FROM saleorder";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('saleorder/allrecords', { allrecs: result });
    });
});
module.exports = router;

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
    let query = "SELECT order_id, customer_id, saledate, cutomernotes, paymentstatus, authorizationnum FROM saleorder WHERE order_id = " +
        req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('saleorder/onerec', { onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
    res.render('saleorder/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {
    let insertquery = "INSERT INTO saleorder (order_id, customer_id, saledate, customernotes, category_id, saleprice, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(insertquery, [req.body.order_id, req.body.customer_id, req.body.saledate, req.body.customernotes,
    req.body.category_id, req.body.saleprice, req.body.status], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/saleorder');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
    let query = "SELECT order_id, customer_id, saledate, customernotes, category_id, saleprice, status WHERE order_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('saleorder/editrec', { onerec: result[0] });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
    let updatequery = "UPDATE saleorder SET customer_id = ?, saledate = ?, customernotes = ?, category_id = ?, saleprice = ?, status WHERE order_id = " + req.body.order_id;
    db.query(updatequery, [req.body.customer_id, req.body.saledate, req.body.customernotes,
    req.body.category_id, req.body.saleprice, req.body.status], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/saleorder');
        }
    });
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
    let query = "DELETE FROM saleorder WHERE order_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/saleorder');
        }
    });
});





