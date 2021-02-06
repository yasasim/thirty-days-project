"use strict";
const font = {
    message: 20
};
const color = {
    red: 'rgb(255,00,00)',
    green: 'rgb(00,255,00)',
    lightGreen: 'rgb(144,238,144)',
    blue: 'rgb(00,00,255)',
    azur: 'rgb(00,139,194)',
    white: 'rgb(255,255,255)',
    black: 'rgb(00,00,00)',
    gray: 'rgb(128,128,128)',
    sand: 'rgb(246, 215, 176)'
};
const FIELD_GRASS = {
    color: color.lightGreen,
    byWalk: true
};
const FIELD_TREE = {
    color: color.green,
    byWalk: true
};
const FIELD_MOUNTAIN = {
    color: color.gray,
    byWalk: false
};
const FIELD_SEA = {
    color: color.azur,
    byWalk: false
};
const FIELD_SAND = {
    color: color.sand,
    byWalk: true
};
const FIELDS = [
    FIELD_GRASS,
    FIELD_TREE,
    FIELD_MOUNTAIN,
    FIELD_SEA,
    FIELD_SAND
];
const CANVAS_SIZE = {
    height: 800,
    width: 960
};
const NODE_SIZE = {
    width: 20,
    height: 20
};
const FIELD_SIZE = {
    x: 32,
    y: 32
};
let pressString = '';
let frameCounter = 0;
const field = [
    0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2,
    3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    3, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2,
    3, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4,
    3, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4,
    3, 3, 3, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    3, 3, 3, 3, 3, 3, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 0, 0, 0, 0, 0, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
];
const getIndexFromPos = (pos) => {
    return pos.y * FIELD_SIZE.x + pos.x;
};
const isMapOver = (pos) => {
    if (pos.x >= FIELD_SIZE.x) {
        return true;
    }
    if (pos.x < 0) {
        return true;
    }
    if (pos.y >= FIELD_SIZE.y) {
        return true;
    }
    if (pos.y < 0) {
        return true;
    }
    return false;
};
const canWalkInto = (pos) => {
    return FIELDS[field[getIndexFromPos(pos)]].byWalk;
};
class Player {
    constructor(startPos) {
        this.moveRight = () => {
            const nextPos = {
                x: this.pos.x + 1,
                y: this.pos.y
            };
            if (isMapOver(nextPos)) {
                return;
            }
            if (!canWalkInto(nextPos)) {
                return;
            }
            this.pos = nextPos;
        };
        this.moveLeft = () => {
            const nextPos = {
                x: this.pos.x - 1,
                y: this.pos.y
            };
            if (isMapOver(nextPos)) {
                return;
            }
            if (!canWalkInto(nextPos)) {
                return;
            }
            this.pos = nextPos;
        };
        this.moveUp = () => {
            const nextPos = {
                x: this.pos.x,
                y: this.pos.y - 1
            };
            if (isMapOver(nextPos)) {
                return;
            }
            if (!canWalkInto(nextPos)) {
                return;
            }
            this.pos = nextPos;
        };
        this.moveDown = () => {
            const nextPos = {
                x: this.pos.x,
                y: this.pos.y + 1
            };
            if (isMapOver(nextPos)) {
                return;
            }
            if (!canWalkInto(nextPos)) {
                return;
            }
            this.pos = nextPos;
        };
        this.pos = startPos;
    }
}
const main = () => {
    console.log("Hello, World!");
    const canvas = document.getElementById("main");
    if (!canvas.getContext) {
        alert("canvas is not found");
        throw new Error("canvas is not found");
    }
    canvas.height = CANVAS_SIZE.height;
    canvas.width = CANVAS_SIZE.width;
    const context = getCanvasRenderingContext2D(canvas);
    context.font = font.message.toString() + "px sans-serif";
    const player = new Player({ x: 0, y: 0 });
    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                pressString += 'U';
                player.moveUp();
                break;
            case 'ArrowDown':
                pressString += 'D';
                player.moveDown();
                break;
            case 'ArrowLeft':
                pressString += 'L';
                player.moveLeft();
                break;
            case 'ArrowRight':
                pressString += 'R';
                player.moveRight();
                break;
        }
        console.log('player', player.pos);
    });
    setInterval(updateView.bind(null, player), 33.333);
};
const getCanvasRenderingContext2D = (canvas) => {
    const context = canvas.getContext('2d');
    if (!context) {
        alert("cannot get context");
        throw new Error("cannot get context");
    }
    return context;
};
const keyDownEvent = (event, player) => {
    switch (event.key) {
        case 'ArrowUp':
            pressString += 'U';
            player.moveUp;
            break;
        case 'ArrowDown':
            pressString += 'D';
            player.moveDown;
            break;
        case 'ArrowLeft':
            pressString += 'L';
            player.moveLeft;
            break;
        case 'ArrowRight':
            pressString += 'R';
            player.moveRight;
            break;
    }
    console.log('player', player.pos);
};
const updateView = (player) => {
    frameCounter++;
    const canvas = document.getElementById("main");
    const context = getCanvasRenderingContext2D(canvas);
    dispBackground(context);
    dispField(context);
    dispPlayer(context, player);
    context.fillStyle = color.black;
    context.fillText(`frame: ${frameCounter}`, 0, (FIELD_SIZE.y + 1) * NODE_SIZE.height);
    context.fillText(pressString, 0, (FIELD_SIZE.y + 2) * NODE_SIZE.height);
};
const dispBackground = (context) => {
    context.fillStyle = color.white;
    context.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
};
const dispField = (context) => {
    field.map((value, index) => {
        const pos = getPosFromIndex(index);
        context.fillStyle = FIELDS[value].color;
        context.fillRect(NODE_SIZE.width * pos.x, NODE_SIZE.height * pos.y, NODE_SIZE.width, NODE_SIZE.height);
    });
};
const dispPlayer = (context, player) => {
    context.fillStyle = color.blue;
    context.fillRect(NODE_SIZE.width * player.pos.x, NODE_SIZE.height * player.pos.y, NODE_SIZE.width * 0.8, NODE_SIZE.height * 0.8);
};
const getPosFromIndex = (index) => {
    const pos = {
        y: Math.floor(index / FIELD_SIZE.x),
        x: index % FIELD_SIZE.x
    };
    return pos;
};
window.onload = main;
