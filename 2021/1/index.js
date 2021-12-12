const input = require('./input');

let result = 0;

for (let i = 1; i < input.length; i += 1) {
    if (input[i] > input[i-1]) {
        result += 1;
    }
}

console.log(result);

let winResult = 0;
for (let i = 0; i < input.length; i += 1) {
    const win1 = input[i] + input[i + 1] + input[i + 2];
    const win2 = input[i + 1] + input[i + 2] + input[i + 3];

    if (win2 > win1) {
        winResult += 1;
    }
}

console.log(winResult);
