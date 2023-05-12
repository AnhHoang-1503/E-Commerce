// Get pages/about
function about(req, res, next) {
    res.render("pages/about", { title: "About" });
}

function faq(req, res, next) {
    res.render("pages/faq", { title: "FAQ" });
}

function contact(req, res, next) {
    res.render("pages/contact", { title: "Contact" });
}

export default { about, faq, contact };
