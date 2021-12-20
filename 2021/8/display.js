const rawInput = require('./input');

const data = [];
const lines = rawInput.split('\n');

lines.forEach((line) => {
    data.push(line.split(' | '));
});

/*
    Models a 7-segment display as:

         aaaa
        b    c
        b    c
         dddd
        e    f
        e    f
         gggg

    each leter represents a segment, segments can be remapped
*/
class Display {
    constructor() {
        this.outputs = {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            f: 0,
            g: 0
        };

        this.inputs = {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            f: 0,
            g: 0
        };

        // maps outputs to inputs
        // keys are outputs, values are inputs
        // if the value is null, then the input and output are the same
        this.wiring = {
            a: null,
            b: null,
            c: null,
            d: null,
            e: null,
            f: null,
            g: null,
        };
    }

    checkInputWiring(inputToCheck) {
        const outputs = Object.keys(this.wiring);

        for (let i = 0; i < outputs.length; i += 1) {
            const output = outputs[i];

            if (this.wiring[output] === inputToCheck) {
                return output;
            }
        }

        return inputToCheck;
    }

    checkOutputWiring(output) {
        if (this.wiring[output]) {
            return this.wiring[output];
        }

        return output;
    }

    setSingleOutput(input) {
        const output = this.checkInputWiring(input);
        this.outputs[output] = 1;

        return this;
    }

    set(inputs) {
        this.sort(inputs).split('').forEach((input) => this.setSingleOutput(input));

        return this;
    }

    segmentToString(output) {
        switch (output) {
            case 'a':
            case 'd':
            case 'g':
                if (this.outputs[output] === 1) return '-';
                return ' ';
            case 'b':
            case 'c':
            case 'e':
            case 'f':
                if (this.outputs[output] === 1) return '|';
                return ' ';
        }
    }

    sort(inputs) {
        return inputs.split('').sort().join('');
    }

    toString(showMap = false) {
        if (showMap) {
            return ' aaaa \nb    c\nb    c\n dddd \ne    f\ne    f\n gggg \n';
        } else {
            return `
========
 ${this.segmentToString('a')}${this.segmentToString('a')}${this.segmentToString('a')}${this.segmentToString('a')}
${this.segmentToString('b')}    ${this.segmentToString('c')}
${this.segmentToString('b')}    ${this.segmentToString('c')}
 ${this.segmentToString('d')}${this.segmentToString('d')}${this.segmentToString('d')}${this.segmentToString('d')}
${this.segmentToString('e')}    ${this.segmentToString('f')}
${this.segmentToString('e')}    ${this.segmentToString('f')}
 ${this.segmentToString('g')}${this.segmentToString('g')}${this.segmentToString('g')}${this.segmentToString('g')}
========
`;
        }
    }

    toNumber() {
        const active = this.sort(Object.keys(this.outputs).filter((key) => this.outputs[key] === 1).join(''));

        switch (active) {
            case 'abcefg':
                return 0;
            case 'cf':
                return 1;
            case 'acdeg':
                return 2;
            case 'acdfg':
                return 3;
            case 'bcdf':
                return 4;
            case 'abdfg':
                return 5;
            case 'abdefg':
                return 6;
            case 'acf':
                return 7;
            case 'abcdefg':
                return 8;
            case 'abcdfg':
                return 9;
            default:
                return Number.Nan;
        }
    }

    reset() {
        Object.keys(this.outputs).forEach((key) => {
            this.outputs[key] = 0;
        });

        Object.keys(this.wiring).forEach((key) => {
            this.wiring[key] = null;
        });

        return this;
    }

    map(input, output) {
        this.wiring[output] = input;
        return this;
    }
}
