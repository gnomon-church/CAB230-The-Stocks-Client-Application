function countUniqueItems(arr) {
    arr = arr.slice().sort();
    let arrDuplicates = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] === arr[i]) {
            arrDuplicates.push(arr[i]);
        }
    }

    return arr.length - arrDuplicates.length
}

// let testArray = ['ronald','campbell','jones','bento','love','lovelock','luck','luck','smith','smith','lee','smith','smith','grace','nice','luck','grace']
// console.log(countUniqueItems(testArray))