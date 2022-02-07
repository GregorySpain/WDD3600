/**
 * This code is a callback function that acts as the controller for a 404 error.
 * It is called by the 404 router in the app.js file and renders the 404 page.
 */

exports.get404 = (req, res, next) => {
    res.status(404).render('404', {pageTitle: "Page Not Found", path: ''});
}

