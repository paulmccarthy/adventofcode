const input = require('./input');

class Position {
    constructor() {
        this.hPos = 0;
        this.depth = 0;
        this.aim = 0;
    }

    down(val) {
        this.aim += Number(val);
    }

    up(val) {
        this.aim -= Number(val);
    }

    forward(val) {
        this.hPos += Number(val);
        this.depth += (this.aim * Number(val));
    }

    getPos() {
        return this.depth * this.hPos;
    }

    getHPos() {
        return this.hPos;
    }

    getDepth() {
        return this.depth;
    }

    getAim() {
        return this.aim;
    }
}

const pos = new Position();

for (let i = 0; i < input.length; i += 1) {
    const [command, val] = input[i].split(' ');

    switch (command.toLowerCase()) {
        case 'down':
            pos.down(val);
            break;
        case 'up':
            pos.up(val);
            break;
        case 'forward':
            pos.forward(val);
            break;
        default:
            throw new Error(`Unknown command: ${command}`);
    }
}

console.log(`hPos: ${pos.getHPos()}`);
console.log(`Depth: ${pos.getDepth()}`);
console.log(`Aim: ${pos.getAim()}`);
console.log(`Answer: ${pos.getHPos() * pos.getDepth()}`);
