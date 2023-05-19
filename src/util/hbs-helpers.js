function index(value) {
    return value + 1;
}

function price(price, quantity) {
    return price.toFixed(2);
}

function calPrice(price, quantity) {
    return (price * quantity).toFixed(2);
}

function checkAmount(amount, options) {
    if (amount > 0) {
        return options.fn(this);
    } else return options.inverse(this);
}

export default { index, price, calPrice, checkAmount };
