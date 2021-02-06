"use strict";
const font = {
    message: 20
};
const color = {
    red: 'rgb(255,00,00)',
    green: 'rgb(00,255,00)',
    blue: 'rgb(00,00,255)',
    white: 'rgb(255,255,255)',
    black: 'rgb(00,00,00)'
};
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
const playerPos = {
    x: 0,
    y: 0
};
let pressString = '';
let frameCounter = 0;
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
    const field = makeField();
    setInterval(updateView.bind(null, field), 33.333);
};
const getCanvasRenderingContext2D = (canvas) => {
    const context = canvas.getContext('2d');
    if (!context) {
        alert("cannot get context");
        throw new Error("cannot get context");
    }
    return context;
};
const updateView = (field) => {
    frameCounter++;
    const canvas = document.getElementById("main");
    const context = getCanvasRenderingContext2D(canvas);
    dispBackground(context);
    dispField(context, field);
    dispPlayer(context);
    context.fillStyle = color.black;
    context.fillText(`frame: ${frameCounter}`, 0, (FIELD_SIZE.y + 1) * NODE_SIZE.height);
    context.fillText(pressString, 0, (FIELD_SIZE.y + 2) * NODE_SIZE.height);
};
const makeField = () => {
    const field = [];
    for (let x = 0; x < FIELD_SIZE.x; x++) {
        for (let y = 0; y < FIELD_SIZE.y; y++) {
            field.push(((x % 2) + y) % 2);
        }
    }
    return field;
};
const dispBackground = (context) => {
    context.fillStyle = color.white;
    context.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
};
const dispField = (context, field) => {
    field.map((value, index) => {
        const pos = getPosFromIndex(index);
        context.fillStyle = value === 0 ? color.green : color.black;
        context.fillRect(NODE_SIZE.width * pos.x, NODE_SIZE.height * pos.y, NODE_SIZE.width, NODE_SIZE.height);
    });
};
const dispPlayer = (context) => {
    context.fillStyle = color.blue;
    context.fillRect(NODE_SIZE.width * playerPos.x, NODE_SIZE.height * playerPos.y, NODE_SIZE.width * 0.8, NODE_SIZE.height * 0.8);
};
const getPosFromIndex = (index) => {
    const pos = {
        y: Math.floor(index / FIELD_SIZE.x),
        x: index % FIELD_SIZE.x
    };
    return pos;
};
const getIndexFromPos = (pos) => {
    return pos.y * FIELD_SIZE.x + pos.x;
};
window.onload = main;
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            pressString += 'U';
            playerPos.y--;
            break;
        case 'ArrowDown':
            pressString += 'D';
            playerPos.y++;
            break;
        case 'ArrowLeft':
            pressString += 'L';
            playerPos.x--;
            break;
        case 'ArrowRight':
            pressString += 'R';
            playerPos.x++;
            break;
    }
    console.log('player', playerPos);
});
