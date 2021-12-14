const input = require('./input');

const findMapSize = (lines) => {
    let x = -1;
    let y = -1;

    for (let i = 0; i < lines.length; i += 1) {
        const line1 = lines[i][0];
        const line2 = lines[i][1];

        const maximumX = Math.max(line1[0], line2[0]);
        const maximumY = Math.max(line1[1], line2[1]);

        x = maximumX > x ? maximumX : x;
        y = maximumY > y ? maximumY : y;
    }

    return { x, y };
};

const buildField = (x, y) => {
    const result = [];

    for (let i = 0; i <= y; i += 1) {
        let row = [];
        for (let j = 0; j <= x; j += 1) {
            row.push(0);
        }

        result.push(row);
    }

    return result;
};


class VentsField {
    constructor(lines) {
        this.lines = lines;
        const { x, y } = findMapSize(lines);
        this.x = x;
        this.y = y;
        this.field = buildField(x, y);
        this.dangerousAreasCount = -1;
    }

    fillPoint(x, y) {
        this.field[y][x] += 1;
        return this;
    }

    fillHorizontalLine(startPoint, endPoint) {
        // for horizontal lines, the y coord is the same in the start and end point
        // the points could be specified in any order
        // take the largest as our starting point so we only have to loop once
        const [ startX, endX ] = startPoint[0] > endPoint[0] ? [endPoint[0], startPoint[0]] : [startPoint[0], endPoint[0]];
        const y = startPoint[1];

        for (let x = startX; x <= endX; x += 1) {
            this.fillPoint(x, y);
        }

        return this;
    }

    fillVerticalLine(startPoint, endPoint) {
        // for Vertical lines, the x coord is the same in the start and end point
        // the points could be specified in any order
        // take the largest as our starting point so we only have to loop once
        const [startY, endY] = startPoint[1] > endPoint[1] ? [endPoint[1], startPoint[1]] : [startPoint[1], endPoint[1]];
        const x = startPoint[0];

        for (let y = startY; y <= endY; y += 1) {
            this.fillPoint(x, y);
        }

        return this;
    }

    fillDiagonalLine(startPoint, endPoint) {
        // for diagonal lines, the start and end points are different, no shared coords.
        // points can be specified in any order
        const startX = startPoint[0];
        const startY = startPoint[1];
        const endX = endPoint[0];
        const endY = endPoint[1];

        const xStep = endX > startX ? 1 : -1;
        const yStep = endY > startY ? 1 : -1;

        const numPoints = Math.abs(startY - endY) + 1;

        for (let i = 0; i < numPoints; i += 1) {
            const x = startX + (i * xStep);
            const y = startY + (i * yStep);

            this.fillPoint(x, y);
        }

        return this;
    }

    fillLine(startPoint, endPoint) {
        // check if we have a vertical or horizontal line
        // horizontal => y coords match
        // vertical => x coords match
        // otherwise => diagonal
        if (startPoint[0] === endPoint[0]) {
            this.fillVerticalLine(startPoint, endPoint);
        } else if (startPoint[1] === endPoint[1]) {
            this.fillHorizontalLine(startPoint, endPoint);
        } else {
            this.fillDiagonalLine(startPoint, endPoint);
        }

        return this;
    }

    count(minValue = 2) {
        this.dangerousAreasCount = this.field.flat().reduce((count, val) => {
            if (val >= minValue) {
                return count + 1;
            }

            return count;
        }, 0);

        return this;
    }

    fill() {
        for (let i = 0; i < this.lines.length; i += 1) {
            const line = this.lines[i];
            const startPoint = line[0];
            const endPoint = line[1];

            this.fillLine(startPoint, endPoint);
        }

        return this;
    }

    toString() {
        let output = '';
        let counter = 0;

        this.field.flat().forEach((item) => {
            if (item === 0) {
                output += '_';
            } else {
                output += String(item);
            }

            if (counter % (this.x + 1) === 0) {
                output += '\n';
            }

            counter += 1;
        });

        return output;
    }
}

t = [
    [[1, 1], [3, 3]]
];

const ventsField = new VentsField(input);
ventsField.fill().count();

console.log(ventsField.dangerousAreasCount);
