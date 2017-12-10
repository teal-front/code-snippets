/**
 * add two number-like string
 */

!function () {
    const plus = function(intA, intB) {
        let iMaxLen = Math.max(intA.length, intB.length),
            i = iMaxLen - 1;

        let plusNum = 0, sum = '0';

        while(i > -1) {
            let innerSum = (+intA[i]) + (+intB[i]) + plusNum;

            sum = innerSum % 10 + sum;
            plusNum = ~~(innerSum / 10);

            i--;
        }

        if (plusNum > 0) {
            sum = plusNum + sum;
        }

        return sum;
    };

    const add = function (a, b) {
        if (!(/[\d\.]+/.test(a) && /[\d\.]+/.test(b))) {
            throw new Error('arguments should be number');
        }

        let intA = a.split('.')[0],
            intB = b.split('.')[0],
            floatA = a.split('.')[1] || '0',
            floatB = b.split('.')[1] || '0',
            iMaxLen = Math.max(intA.length, intB.length),
            fMaxLen = Math.max(floatA.length, floatB.length);

        let sum = '',
            plusNum = 0;

        intA = '0'.repeat(iMaxLen - intA.length) + intA;
        intB = '0'.repeat(iMaxLen - intB.length) + intB;
        floatA = floatA + '0'.repeat(fMaxLen - floatA.length);
        floatB = floatB + '0'.repeat(fMaxLen - floatB.length);

        return plus(intA, intB) + '.' + plus(floatA, floatB);

    };


    console.log(add('2343000.23903', '999900232343'));
    //console.log(add('3', '4'));
}();