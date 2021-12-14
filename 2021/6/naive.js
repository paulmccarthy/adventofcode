// this is the naive approach - the number of fish grows so large that Node will run out of memory (16 GB on my system) before it reaches day 70!
const input = require('./input');

class LanternFish {
    constructor(timer) {
        this.timer = timer;
    }

    newDay() {
        this.timer += -1;

        if (this.timer < 0) {
            this.timer = 6;
        }
    }
}

class Shoal {
    constructor(timers) {
        this.allFish = [];

        for (let i = 0; i < timers.length; i += 1) {
            this.allFish.push(new LanternFish(timers[i]));
        }
    }

    newDay() {
        this.allFish.forEach((fish) => {
            fish.newDay();
        });

        const newFish = [];

        this.allFish.forEach((fish) => {
            if (fish.timer === 6) {
                newFish.push(new LanternFish(8));
            }
        });

        this.allFish = this.allFish.concat(newFish);
    }

    count() {
        return this.allFish.length;
    }
}

const shoal = new Shoal(input);

for (let i = 0; i < 80; i += 1) {
    shoal.newDay();
    console.log(`Day ${i + 1}: ${shoal.count()} fish in the shoal`);
}
