var express = require('express');
var router = express.Router();

// ==================================================
// Route to display report menu
// URL: http://localhost:3002/report
// ==================================================

router.get('/', function (req, res, next) {
    res.render('report/menu');
});

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/customer', function (req, res, next) {
    let query = "SELECT customer_id, firstname, lastname, email FROM customer";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('report/custlist', { allrecs: result });
    });
});

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3002/report/prodlist
// ==================================================
router.get('/product', function (req, res, next) {
    let query = "SELECT product_id, productname, category_id, saleprice,status, homepage FROM product";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('report/prodlist', { allrecs: result });
    });
});

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3002/report/sale
// ==================================================
router.get('/sale', function (req, res, next) {
    let query = "SELECT s.order_id order_id, c.firstname firstname, c.lastname lastname, s.saledate saledate, p.productname productname, o.saleprice saleprice, o.qty qty FROM saleorder s, orderdetail o, product p, customer c WHERE s.order_id = o.order_id AND o.product_id = p.product_id AND s.customer_id = c.customer_id";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('report/salelist', { allrecs: result });
    });
});

module.exports = router;

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/', function (req, res, next) {
    let query = "SELECT customer_id, firstname, lastname, email, phone FROM customer WHERE customer_id = " +
        req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('customer/onerec', { onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
    res.render('customer/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {
    let insertquery = "INSERT INTO customer (firstname, lastname, email, phone, address1, address2, city, state, zip, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(insertquery, [req.body.firstname, req.body.lastname, req.body.email, req.body.phone,
    req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.username,
    req.body.password], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/customer');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
    let query = "SELECT customer_id, firstname, lastname, email, phone, address1, address2, city, state, zip, username, password FROM customer WHERE customer_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('customer/editrec', { onerec: result[0] });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
    let updatequery = "UPDATE customer SET firstname = ?, lastname = ?, email = ?, phone = ?, address1 = ?, address2 = ?, city = ?, state = ?, zip = ?, username = ?, password = ? WHERE customer_id = " + req.body.customer_id;
    db.query(updatequery, [eq.body.firstname, req.body.lastname, req.body.email, req.body.phone,
    req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.username,
    req.body.password], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/customer');
        }
    });
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
    let query = "DELETE FROM customer WHERE customer_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/customer');
        }
    });
});





