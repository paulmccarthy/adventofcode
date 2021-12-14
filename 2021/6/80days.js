// another naive approach - out of memory issues when we hit about 144 days.
// also includes some work on trying to model the growth rate of the fish using exponential models - growth rate is not static
const input = require('./input');

class Shoal {
    constructor(fish) {
        this.allFish = fish;
        this.newFishCount = [];
        this.day = 0;
    }

    newDay() {
        this.day += 1;
        let newFish = 0;

        this.allFish.forEach((fish, index) => {
            const newVal = fish - 1;

            if (newVal < 0) {
                this.allFish[index] = 6;
                newFish += 1;
            } else {
                this.allFish[index] = newVal
            }
        });

        if (newFish) {
            this.newFishCount.push([this.day, newFish]);
            for (let i = 0; i < newFish; i += 1) {
                this.allFish.push(8);
            }
        }
    }

    count() {
        return this.allFish.length;
    }

    getGrowth() {
        return this.newFishCount;
    }
}

const shoal = new Shoal(input);

// this will work for 80 days, but not for 256 days as required for part 2.
const growthData = [];

for (let i = 0; i < 140; i += 1) {
    shoal.newDay();
    const count = shoal.count();
    console.log(`After ${i + 1} days: ${count}`);
    growthData.push([i, count]); // collect data for determining the growth function for the
}

const newFishGrowth = shoal.getGrowth();
console.log(newFishGrowth);

/*
    growth rate formula: y(t) = ae^(kt)
    a = INITIAL_VALUE
    e = Math.E
    k = growth rate
    t = time

    => k = ln(y(t) / a) / t
*/
const calculateEGrowthRate = (data) => {
    const INITIAL_VALUE = 300;

    for (let i = 1; i < data.length; i += 1) {
        const time = data[i][0];
        const value = data[i][1];
        const rate = (Math.log(value / 300)) / time;
        console.log(data[i], rate);
    }
};

const calculateEValueAtTime = (initial, rate, time) => {
    return initial * (Math.exp((rate * time)));
};

// calculateEGrowthRate(newFishGrowth);

// console.log('value at time 256', calculateEValueAtTime(300, 0.089, 256));

/*
    growth rate formula: y(t) = ab^t
    a = initial value
    b = growth rate
    t = time

    => b = Math.pow(y(t) / a, 1/t);

*/
const calculateGrowthValue = (data) => {
    for (let i = 1; i < data.length; i += 1) {
        const time = data[i][0];
        const value = data[i][1];
        const rate = Math.pow((value / 300), (1/time));
        console.log(time, value, rate);
    }
};

// calculateGrowthValue(newFishGrowth);

const calculateGrowth = (data) => {
    for (let i = 2; i < data.length; i += 1) {
        const currVal = data[i][1];
        const prevVal = data[i - 1][1];

        const ratio = currVal / prevVal;
        console.log(data[i][0], currVal, prevVal, ratio);
    }
};

// calculateGrowth(newFishGrowth);
