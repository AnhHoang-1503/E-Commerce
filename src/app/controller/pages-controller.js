// Get pages/about
function about(req, res, next) {
    try {
        res.render("pages/about", { title: "About" });
    } catch (error) {
        next();
    }
}

function faq(req, res, next) {
    try {
        res.render("pages/faq", { title: "FAQ" });
    } catch (error) {
        next();
    }
}

function contact(req, res, next) {
    try {
        res.render("pages/contact", { title: "Contact" });
    } catch (error) {
        next();
    }
}

export default { about, faq, contact };
