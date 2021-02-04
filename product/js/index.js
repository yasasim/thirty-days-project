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
    y: 48
};
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
    const context = canvas.getContext("2d");
    if (!context) {
        alert("cannot get context");
        throw new Error("cannot get context");
    }
    context.font = font.message.toString() + "px sans-serif";
    const field = makeField();
    setInterval(updateView.bind(null, context, field), 33.333);
};
const updateView = (context, field) => {
    frameCounter++;
    dispBackground(context);
    dispField(context, field);
    context.fillStyle = color.black;
    context.fillText(`frame: ${frameCounter}`, 0, (FIELD_SIZE.x + 1) * NODE_SIZE.height);
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
        context.fillRect(NODE_SIZE.width * pos.y, NODE_SIZE.height * pos.x, NODE_SIZE.width, NODE_SIZE.height);
    });
};
const getPosFromIndex = (index) => {
    const pos = {
        x: Math.floor(index / FIELD_SIZE.y),
        y: index % FIELD_SIZE.y
    };
    return pos;
};
const getIndexFromPos = (pos) => {
    return pos.x * FIELD_SIZE.y + pos.y;
};
window.onload = main;
