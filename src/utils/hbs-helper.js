function ifeq(a, b, options) {
    if (a === b) {
        return options.fn(this);
    }
    return options.inverse(this);
}

function ifneq(a, b, options) {
    if (a === b) {
        return options.inverse(this);
    }
    return options.fn(this);
}

function iflt(a, b, options) {
    if (a < b) {
        return options.fn(this);
    }
    return options.inverse(this);
}


function ifgt(a, b, options) {
    if (a > b) {
        return options.fn(this);
    }
    return options.inverse(this);
}

function ifemp(a, options) {
    return a.length == 0 ? options.fn(this) : options.inverse(this);
}

function loop(from, to, block) {
    var accum = '';
    for (var i = from; i <= to; i += 1) {
        accum += block.fn(i);
    }
    return accum;
}

function add(a, b) {
    return a + b;
}

module.exports = {
    ifeq,
    ifneq,
    iflt,
    ifgt,
    ifemp,
    loop,
    add,
}