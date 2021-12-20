const rawInput = require('./input');

const input = [];
const lines = rawInput.split('\n');

lines.forEach((line) => {
    input.push(line.split(' | '));
});

const baseNumbers = {
    'abcefg': 0,
    'cf': 1,
    'acdeg': 2,
    'acdfg': 3,
    'bcdf': 4,
    'abdfg': 5,
    'abdefg': 6,
    'acf': 7,
    'abcdefg': 8,
    'abcdfg': 9
};

const countChars = (str) => {
    const counts = {
        'a': 0,
        'b': 0,
        'c': 0,
        'd': 0,
        'e': 0,
        'f': 0,
        'g': 0
    };

    str.split('')
        .filter((char) => char !== ' ')
        .reduce((count, char) => {
            count[char] += 1;
            return count;
        }, counts);

    return counts;
};

const encodePatterns = (str) => {
    const counts = countChars(str);

    const encoded = {};

    str.split(' ').forEach((num) => {
        const sum = num.split('').reduce((sum, char) => {
            return sum + counts[char];
        }, 0);

        encoded[sum] = num;
    });

    return encoded;
};

const matchNumbers = (pattern, numbers) => {
    const result = {};

    Object.keys(pattern).forEach((key) => {
        const str = pattern[key];
        const num = numbers[str];

        result[key] = num;
    });

    return result;
};

const match = (encoded, numbers) => {
    const result = {};

    Object.keys(encoded).forEach((num) => {
        const encodedValue = encoded[num].split('').sort().join('');
        const numValue = numbers[num];
        result[encodedValue] = numValue;
    });

    return result;
};

const basePattern = 'abcefg cf acdeg acdfg bcdf abdfg abdefg acf abcdefg abcdfg';
const baseEncoded = encodePatterns(basePattern);
const baseMatched = matchNumbers(baseEncoded, baseNumbers);

let sum = 0;

input.forEach((line) => {
    const input = line[0];
    const output = line[1];
    const encoded = encodePatterns(input);
    const matchedValues = match(encoded, baseMatched);

    output
        .split(' ')
        .forEach((str, i) => {
            const sorted = str.split('').sort().join('');
            const digit = matchedValues[sorted]
            const val = digit * Math.pow(10, 3 - i);
            sum += val;
        });
});

console.log(sum);
