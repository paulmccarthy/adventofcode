const input = require('./input');

const part1 = () => {
    const combined = input.join('');

    const counts = [
        { numZero: 0, numOne: 0 },
        { numZero: 0, numOne: 0 },
        { numZero: 0, numOne: 0 },
        { numZero: 0, numOne: 0 },
        { numZero: 0, numOne: 0 },
        { numZero: 0, numOne: 0 },
        { numZero: 0, numOne: 0 },
        { numZero: 0, numOne: 0 },
        { numZero: 0, numOne: 0 },
        { numZero: 0, numOne: 0 },
        { numZero: 0, numOne: 0 },
        { numZero: 0, numOne: 0 }
    ];

    for (let i = 0; i < combined.length; i += 1) {
        const char = Number(combined[i]);
        const pos = i % 12;

        if (char === 0) counts[pos].numZero += 1;
        if (char === 1) counts[pos].numOne += 1;
    }

    let gamma = '0b';
    let epsilon = '0b';

    for (let i = 0; i < counts.length; i += 1) {
        if (counts[i].numZero > counts[i].numOne) {
            gamma += '0';
            epsilon += '1';
        } else {
            gamma += '1';
            epsilon += '0';
        }
    }

    console.log(Number(gamma), Number(epsilon), Number(gamma) * Number(epsilon));
};

const part2 = () => {
    const countBitByPosition = (list, position = 0) => {
        let numZeros = 0;
        let numOnes = 0;

        for (let i = 0; i < list.length; i += 1) {
            if (Number(list[i][position]) === 0) {
                numZeros += 1;
            } else {
                numOnes += 1;
            }
        }

        return { numZeros, numOnes };
    };

    const findMostCommonBitByPosition = (list, position = 0) => {
        const { numZeros, numOnes } = countBitByPosition(list, position);

        if (numZeros > numOnes) return 0;

        return 1;
    };

    const findLeastCommonBitByPosition = (list, position = 0) => {
        const { numZeros, numOnes } = countBitByPosition(list, position);

        if (numZeros > numOnes) return 1;

        return 0;
    };

    const filterByBitInPosition = (list, position, bit) => {
        if (list.length === 1) return list;

        return list.filter((item) => Number(item[position]) === bit);
    };

    const findO2Gen = (list, position = 0) => {
        if (position === 12 || list.length === 1) {
            return list[0];
        }

        const mostCommonBit = findMostCommonBitByPosition(list, position);
        const filteredList = filterByBitInPosition(list, position, mostCommonBit);

        if (filteredList.length > 1) {
            return findO2Gen(filteredList, position + 1);
        }

        return filteredList;
    };

    const findCo2Scrub = (list, position = 0) => {
        if (position === 12 || list.length === 1) {
            return list[0];
        }

        const leastCommonBit = findLeastCommonBitByPosition(list, position);
        const filteredList = filterByBitInPosition(list, position, leastCommonBit);

        if (filteredList.length > 1) {
            return findCo2Scrub(filteredList, position + 1);
        }

        return filteredList;
    };

    const o2 = findO2Gen(input);
    const co2 = findCo2Scrub(input);

    console.log(`o2 = ${Number('0b'+ o2)}`);
    console.log(`co2 = ${Number('0b' + co2)}`);
    console.log(Number('0b' + o2) * Number('0b' + co2));
};
