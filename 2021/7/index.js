const input = require('./input');
// const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

const maxValue = (data) => Math.max(...data);
const minValue = (data) => Math.min(...data);

const calculateCostPart1 = (source, destination) => Math.abs(destination - source);
const calculateCostPart2 = (source, destination) => {
    const n = Math.abs(destination - source);
    return n * (n + 1) / 2;
};

const max = maxValue(input);
const costs = {};

for (let i = 0; i < max; i += 1) {
    const destination = i;

    if (!costs[destination]) {
        costs[destination] = {
            cost: 0
        };
    }

    for (let j = 0; j < input.length; j += 1) {
        const source = input[j];

        // const cost = calculateCostPart1(source, destination);
        const cost = calculateCostPart2(source, destination);

        costs[destination].cost += cost;
    }
}

let minCost = Number.MAX_SAFE_INTEGER;
let minDest = -1;

Object.keys(costs).forEach((key) => {
    if (costs[key].cost < minCost) {
        minCost = costs[key].cost;
        minDest = key;
    }
});

console.log(`minDest = ${minDest}, minCost = ${minCost}`);
