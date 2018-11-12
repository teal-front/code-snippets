/**
 * add two number-like string
 */

// method one
export function safeNumAdd(arr) {
    let maxTail = Math.max.apply(null, arr.map(n => {
        let tail = (String(n).split('.')[1] || '').replace(/0+$/, '')
        return tail === '' ? 0 : tail
    }))
    let deepFloat = String(maxTail).length
    let sum = arr.reduce((sum, n) => {
        sum += n * Math.pow(10, deepFloat)
        return sum
    }, 0)
    return sum / Math.pow(10, deepFloat)
}

// method two
const plus = function (intA, intB) {
    let iMaxLen = Math.max(intA.length, intB.length),
        i = iMaxLen - 1;

    let plusNum = 0, sum = '';

    while (i > -1) {
        let innerSum = (+intA[i]) + (+intB[i]) + plusNum;

        sum = innerSum % 10 + sum;
        plusNum = Math.floor(innerSum / 10); // aka. ~~(innerSum / 10)

        i--;
    }

    if (plusNum > 0) {
        sum = plusNum + sum;
    }

    return sum;
};

export function add (a, b) {
    if (!(/[\d\.]+/.test(a) && /[\d\.]+/.test(b))) {
        throw new Error('arguments should be number');
    }

    let intA = a.split('.')[0],
        intB = b.split('.')[0],
        floatA = a.split('.')[1] || '0',
        floatB = b.split('.')[1] || '0',
        iMaxLen = Math.max(intA.length, intB.length),
        fMaxLen = Math.max(floatA.length, floatB.length);

    intA = intA.padStart(iMaxLen, '0')
    intB = intB.padStart(iMaxLen, '0')
    floatA = floatA.padEnd(fMaxLen, '0')
    floatB = floatB.padEnd(fMaxLen, '0')

    return plus(intA, intB) + '.' + plus(floatA, floatB);

};
