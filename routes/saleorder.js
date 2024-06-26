var express = require('express');
var router = express.Router();

function adminonly(req, res, next) {
    if (!req.session.isadmin) { return res.render('customer/login', { message: "ADMIN ACCESS ONLY, WE REALLY DO KEEP IT ON THE LOW" }); }
    next();
}

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', adminonly, function (req, res, next) {
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
router.get('/:recordid/show', adminonly, function (req, res, next) {
    let query = "SELECT order_id, customer_id, saledate, customernotes, paymentstatus, authorizationnum FROM saleorder WHERE order_id = " +
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
router.get('/addrecord', adminonly, function (req, res, next) {
    res.render('saleorder/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminonly, function (req, res, next) {
    let insertquery = "INSERT INTO saleorder (customer_id, saledate, customernotes, paymentstatus, authorizationnum) VALUES (?, ?, ?, ?, ?)";
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
router.get('/:recordid/edit', adminonly, function (req, res, next) {
    let query = "SELECT order_id customer_id, saledate, customernotes, paymentstatus, authorizationnum WHERE order_id = " + req.params.recordid;
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
router.post('/save', adminonly, function (req, res, next) {
    let updatequery = "UPDATE saleorder SET customer_id = ?, saledate = ?, customernotes = ?, paymentstatus = ?, authorizationnum = ?" + req.body.order_id;
    db.query(updatequery, [req.body.customer_id, req.body.saledate, req.body.customernotes,
    req.body.paymentstatus, req.body.authorizationnum], (err, result) => {
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
router.get('/:recordid/delete', adminonly, function (req, res, next) {
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





