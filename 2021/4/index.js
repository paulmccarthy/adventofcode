const { draw, boards } = require('./input');

// convert boards from strings to arrays
const convertBoard = (board) => {
    const result = [];
    const byRow = board.split(/\n/g)

    byRow.forEach((row) => {
        const byItem = row.split(' ').filter((item) => !Number.isNaN(parseInt(item))).map((num) => Number(num));
        result.push(byItem);
    });

    return result;
};

const objectifyBoard = (board) => {
    const result = {};

    for (let i = 0; i < board.length; i += 1) {
        for (let j = 0; j < board[i].length; j += 1) {
            const num = board[i][j];

            if (!result[num]) {
                result[num] = {
                    num
                };
            }

            result[num].coords = {i, j};
        }
    }

    return result;
};

const colsToRows = (board) => {
    const rotatedBoard = JSON.parse(JSON.stringify(board));

    for (let i = 0; i < board.length; i += 1) {
        for (let j = 0; j < board[i].length; j += 1) {
            const numA = board[i][j];
            const numB = board[j][i];
            rotatedBoard[i][j] = numB;
            rotatedBoard[j][i] = numA;
        }
    }

    return rotatedBoard;
};

class Board {
    constructor(rawBoard) {
        this.rawBoard = rawBoard;
        this.board = convertBoard(rawBoard);
        this.boardObject = objectifyBoard(this.board);
        this.rotatedBoard = colsToRows(this.board);
        this.rotatedBoardObject = objectifyBoard(this.rotatedBoard);
        this.lastDrawn = -1;
        this.hasWon = false;
    }

    updateDraw(num) {
        if (!this.hasWon) {
            this.lastDrawn = num;

            if (this.boardObject[num]) {
                const coords = this.boardObject[num].coords;
                const rotatedCoords = this.rotatedBoardObject[num].coords;

                if (coords) {
                    this.board[coords.i][coords.j] = -1;
                }

                if (rotatedCoords) {
                    this.rotatedBoard[rotatedCoords.i][rotatedCoords.j] = -1;
                }

                if (coords || rotatedCoords) {
                    if (this.checkRows() || this.checkCols()) {
                        return this.calculateScore();
                    }
                }
            }
        }

        return -1;
    }

    check(board) {
        for (let i = 0; i < board.length; i += 1) {
            const row = board[i];
            const sum = row.reduce((sum, val) => sum + val, 0);

            if (sum === -5) {
                this.hasWon = true;
                break;
            }
        }

        return this.hasWon;
    }

    checkRows() {
        return this.check(this.board);
    }

    checkCols() {
        return this.check(this.rotatedBoard);
    }

    calculateScore() {
        const flat = this.board.flat();
        const sum = flat.reduce((sum, num) => {
            if (num > 0) {
                return sum + num;
            }

            return sum;
        }, 0);

        return sum * this.lastDrawn;
    }
}

const allBoards = boards.map((board) => new Board(board));

for (let i = 0; i < draw.length; i += 1) {
    const num = draw[i];

    allBoards.forEach((board) => {
        const result = board.updateDraw(num);

        if (result > -1) {
            console.log(`Found a winning board, score is ${result}`);
        }

        // console.log(board.board);
    });
}
