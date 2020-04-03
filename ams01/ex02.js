function compare(x, y) {
    if (x === y) {
        if (typeof x === typeof y) {
            return true;
        } else {
            return false;
        }    
    } else {
        return false;
    }
}

console.log(compare(2, '2'))