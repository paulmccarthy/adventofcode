const rawInput = require('./input');

const data = [];
const lines = rawInput.split('\n');

lines.forEach((line) => {
    data.push(line.split(' | '));
});

const part1 = () => {
    const one = 'cf';
    const four = 'bcdf';
    const seven = 'acf';
    const eight = 'abcdefg';

    let count = 0;

    for (let i = 0; i < input.length; i += 1) {
        const output = input[i][1];

        const groups = output.split(' ');

        groups.forEach((group) => {
            if (group.length === one.length) {
                count += 1;
            }

            if (group.length === four.length) {
                count += 1;
            }

            if (group.length === seven.length) {
                count += 1;
            }

            if (group.length === eight.length) {
                count += 1;
            }
        });
    }

    console.log(`Number of times that the digits 1, 4, 7, and 8 occur: ${count}`);
};
