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
    let query = "SELECT product_id, productname, category_id, saleprice,status, homepage FROM product";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('product/allrecords', { allrecs: result });
    });
});
module.exports = router;

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
    let query = "SELECT product_id, productname, prodimage, description, supplier_id, category_id, saleprice, status, homepage FROM product WHERE product_id = " +
        req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('product/onerec', { onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', adminonly, function (req, res, next) {
    let query = "SELECT category_id, categoryname FROM category";
    // execute query
    db.query(query, (err, categories) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('product/addrec', { category: categories });
    });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminonly, function (req, res, next) {

    var homepage_value = 0;
    if (req.body.homepage) {
        homepage_value = 1;
    }

    let insertquery = "INSERT INTO product (productname, prodimage, description, supplier_id, category_id, saleprice, status, homepage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(insertquery, [req.body.productname, req.body.prodimage, req.body.description, req.body.supplier_id,
    req.body.category_id, req.body.saleprice, req.body.status, homepage_value], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/product');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', adminonly, function (req, res, next) {
    let query = "SELECT product_id, productname, prodimage, description, supplier_id, category_id, saleprice, status, homepage FROM product WHERE product_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            let query = "SELECT category_id, categoryname FROM category";
            // execute query
            db.query(query, (err, categories) => {
                if (err) {
                    console.log(err);
                    res.render('error');
                }
                res.render('product/editrec', { onerec: result[0], category: categories });
            });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminonly, function (req, res, next) {

    var homepage_value = 0;
    if (req.body.homepage) {
        homepage_value = 1;
    }

    let updatequery = "UPDATE product SET productname = ?, prodimage = ?, description = ?, supplier_id = ?, category_id = ?, saleprice = ?, status = ?, homepage = ? WHERE product_id = " + req.body.product_id;
    db.query(updatequery, [req.body.productname, req.body.prodimage, req.body.description,
    req.body.supplier_id, req.body.category_id, req.body.saleprice, req.body.status, homepage_value], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/product');
        }
    });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', adminonly, function (req, res, next) {
    let query = "DELETE FROM product WHERE product_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/product');
        }
    });
});





