// instead of modellingthe fish, as suggested by the question, model the number of fish at each timer stage.
// there is probably a more elegant way of doing this, but this works.
// have to look for the value after 8192 days for the algorithm to take more than 1 second to run, by which time the number is too big for JS to handle
//      - use BigInts to calculate the values.
//      - BigInts can't be serialised by JSON.parse, so have to add serialiser and revivers.

const input = require('./input');

// serialise and revive BigInts
const serialiser = (key, value) => typeof value === 'bigint' ? `${value.toString()}n` : value;
const reviver = (key, value) => typeof value === 'string' && value.endsWith('n') ? BigInt(value.slice(0, -1)) : value;

// break the input into buckets
const bucketFish = (data) => {
    const days = {
        0: BigInt(0),
        1: BigInt(0),
        2: BigInt(0),
        3: BigInt(0),
        4: BigInt(0),
        5: BigInt(0),
        6: BigInt(0),
        7: BigInt(0),
        8: BigInt(0)
    };

    data.forEach((fish) => {
        days[fish] += BigInt(1);
    });

    return days;
};

class Shoal {
    constructor(data) {
        this.days = bucketFish(data);
    }

    newDay() {
        const original = JSON.parse(JSON.stringify(this.days, serialiser), reviver);
        let fish0 = BigInt(0);
        let fish1 = BigInt(0);
        let fish2 = BigInt(0);
        let fish3 = BigInt(0);
        let fish4 = BigInt(0);
        let fish5 = BigInt(0);
        let fish6 = BigInt(0);
        let fish7 = BigInt(0);
        let fish8 = BigInt(0);

        Object.keys(original).forEach((key) => {
            switch(key) {
                case '0':
                    fish8 += original[key];
                    break;
                case '1':
                    fish0 = original[key];
                    break;
                case '2':
                    fish1 = original[key];
                    break;
                case '3':
                    fish2 = original[key];
                    break;
                case '4':
                    fish3 = original[key];
                    break;
                case '5':
                    fish4 = original[key];
                    break;
                case '6':
                    fish5 = original[key];
                    break;
                case '7':
                    fish6 = original[key];
                    break;
                case '8':
                    fish7 = original[key];
                    break;
            }
        });

        this.days[0] = fish0;
        this.days[1] = fish1;
        this.days[2] = fish2;
        this.days[3] = fish3;
        this.days[4] = fish4;
        this.days[5] = fish5;
        this.days[6] = fish6 + fish8; // fish that were at 0 go back to 6 and create new fish8
        this.days[7] = fish7;
        this.days[8] = fish8;
    }

    cycle(days) {
        for (let i = 0; i < days; i += 1) {
            this.newDay();
        }

        return this;
    }

    count() {
        let sum = BigInt(0);

        Object.keys(this.days).forEach((key) => {
            sum += this.days[key];
        });

        return sum;
    }
}

const shoal = new Shoal(input);

const t1Start = new Date().valueOf();
const days80 = shoal.cycle(80).count();
const t1End = new Date().valueOf();
console.log(`After 80 days (${t1End - t1Start} ms): ${days80}`);

const t2Start = new Date().valueOf();
const days256 = shoal.cycle(256).count();
const t2End = new Date().valueOf();
console.log(`After 256 days (${t2End - t2Start} ms): ${days256}`);

const t3Start = new Date().valueOf();
const days512 = shoal.cycle(512).count();
const t3End = new Date().valueOf();
console.log(`After 512 days (${t3End - t3Start} ms): ${days512}`);

const t4Start = new Date().valueOf();
const days8192 = shoal.cycle(8192).count();
const t4End = new Date().valueOf();
console.log(`After 8192 days (${t4End - t4Start} ms): ${days8192}`);
