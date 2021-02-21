"use strict";
const DEBUG_MODE = false;
const FONT = {
    message: 20,
    gameOver: 80
};
const COLOR = {
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
    color: COLOR.lightGreen,
    byWalk: true
};
const FIELD_TREE = {
    color: COLOR.green,
    byWalk: true
};
const FIELD_MOUNTAIN = {
    color: COLOR.gray,
    byWalk: false
};
const FIELD_SEA = {
    color: COLOR.azur,
    byWalk: false
};
const FIELD_SAND = {
    color: COLOR.sand,
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
const CONSOLE_SPACE_SIZE = {
    width: 8,
    height: 8
};
const SCENE = {
    moveMap: 0,
    battle: 1,
    gameClear: 50,
    gameOver: 99
};
const BATTLE_PHASE = {
    start: 0,
    chooseCommand: 1,
    commandExecute: 2,
    end: 3
};
const BATTLE_END_TYPE = {
    false: 0,
    win: 1,
    escape: 2,
    lose: 3
};
const PLAYER_ID = 1;
const EMPTY = 0;
const BATTLE_TEXT_FIELD = {
    commandField: {
        height: 8,
        width: 6
    },
    skillField: {
        height: 8,
        width: 23
    },
    messageField: {
        height: 8,
        width: 30
    },
    textNode: {
        height: 1.5,
        width: 5
    },
    margin: {
        left: 1,
        bottom: 1
    },
    padding: {
        top: 0.5,
        left: 0.5
    }
};
const BATTLE_START_MESSAGE = ['魔物があらわれた！！'];
const BATTLE_COMMAND_EXECUTE_MESSAGE = {
    attack: ['プレイヤーの攻撃！！'],
    escape: ['プレイヤーは逃げ出した！！'],
    nothing: ['しかし何も起こらなかった！！']
};
const BATTLE_END_MESSAGE = {
    removeEnemy: ['魔物をやっつけた！！'],
    lose: ['プレイヤーは死んでしまった！！']
};
const RV_CANNOT_MOVE = -2;
const RV_MOVE_EXECUTE = -1;
const PLAYER_STATUS_TABLE = [
    { level: 1, maxHp: 10, atack: 3 },
    { level: 2, maxHp: 12, atack: 5 },
    { level: 3, maxHp: 14, atack: 7 },
    { level: 4, maxHp: 16, atack: 9 },
    { level: 5, maxHp: 18, atack: 11 },
    { level: 6, maxHp: 20, atack: 13 },
    { level: 7, maxHp: 22, atack: 15 },
    { level: 8, maxHp: 24, atack: 17 },
    { level: 9, maxHp: 26, atack: 19 },
    { level: 10, maxHp: 28, atack: 21 },
];
const EXP_TABLE = [
    { level: 1, nextExp: 10 },
    { level: 2, nextExp: 10 },
    { level: 3, nextExp: 10 },
    { level: 4, nextExp: 10 },
    { level: 5, nextExp: 10 },
    { level: 6, nextExp: 10 },
    { level: 7, nextExp: 10 },
    { level: 8, nextExp: 10 },
    { level: 9, nextExp: 10 },
    { level: 10, nextExp: 10 },
];
const MAX_LEVEL = 10;
const ENEMY_IMAGE_PATH = {
    a: {
        battle: '../image/enemyA.png',
        mini: {
            up: '',
            down: '../image/castle.png',
            right: '',
            left: '',
        }
    },
    b: {
        battle: '../image/enemyB.png',
        mini: {
            up: '',
            down: '',
            right: '',
            left: '',
        }
    },
    c: {
        battle: '../image/enemyC.png',
        mini: {
            up: '',
            down: '',
            right: '',
            left: '',
        }
    },
};
const PLAYER_IMAGE_PATH = {
    up: '../image/playerUp.png',
    down: '../image/playerDown.png',
    right: '../image/playerRight.png',
    left: '../image/playerLeft.png'
};
const ENEMY_A = {
    maxHp: 50,
    atack: 7,
    exp: 100,
    imgPath: ENEMY_IMAGE_PATH.a,
    isMove: false,
    moveScene: true,
    size: {
        width: 2,
        height: 2
    }
};
const ENEMY_B = {
    maxHp: 15,
    atack: 5,
    exp: 100,
    imgPath: ENEMY_IMAGE_PATH.b,
    isMove: true,
    moveScene: false,
    size: {
        width: 1,
        height: 1
    }
};
const ENEMY_C = {
    maxHp: 10,
    atack: 3,
    exp: 15,
    imgPath: ENEMY_IMAGE_PATH.c,
    isMove: true,
    moveScene: false,
    size: {
        width: 1,
        height: 1
    }
};
const ENEMY_A_POSITION = {
    x: FIELD_SIZE.x - 2,
    y: 15
};
const ENEMY_STATUS_TABLE = [{
        type: 'a',
        status: ENEMY_A,
    },
    {
        type: 'b',
        status: ENEMY_B,
    },
    {
        type: 'c',
        status: ENEMY_C,
    },
];
let gPressString = '';
let gFrameCounter = 0;
let gScene = SCENE.moveMap;
let gClearFrame = 0;
const gUsableBattleCommand = [
    'たたかう',
    'にげる',
    'ああああ'
];
const gEnemys = [];
let gBattle = null;
let gEnemyId = 2;
const gMap = [
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
const gPlayerField = [
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
];
const getIndexFromPos = (pos) => {
    return pos.y * FIELD_SIZE.x + pos.x;
};
const getEnemyStatusFromType = (type) => {
    let index = ENEMY_STATUS_TABLE.findIndex((value) => { return value.type === type; });
    if (index === -1) {
        index = 2;
    }
    return ENEMY_STATUS_TABLE[index].status;
};
const isMapOver = (pos, size) => {
    for (let xx = 0; xx < size.width; xx++) {
        for (let yy = 0; yy < size.height; yy++) {
            if (pos.x + xx >= FIELD_SIZE.x) {
                return true;
            }
            if (pos.x + xx < 0) {
                return true;
            }
            if (pos.y + yy >= FIELD_SIZE.y) {
                return true;
            }
            if (pos.y + yy < 0) {
                return true;
            }
        }
    }
    return false;
};
const canWalkInto = (pos, size) => {
    for (let xx = 0; xx < size.width; xx++) {
        for (let yy = 0; yy < size.height; yy++) {
            const checkPos = {
                x: pos.x + xx,
                y: pos.y + yy
            };
            if (!FIELDS[gMap[getIndexFromPos(checkPos)]].byWalk) {
                return false;
            }
            ;
        }
    }
    return true;
};
const checkCollision = (pos, size, myId) => {
    for (let xx = 0; xx < size.width; xx++) {
        for (let yy = 0; yy < size.height; yy++) {
            const checkPos = {
                x: pos.x + xx,
                y: pos.y + yy
            };
            if (gPlayerField[getIndexFromPos(checkPos)] !== EMPTY && gPlayerField[getIndexFromPos(checkPos)] !== myId) {
                return checkPos;
            }
            ;
        }
    }
    return;
};
const startBattle = (player, playerTo, enemyId) => {
    gScene = SCENE.battle;
    const pos = getNextPos(player.getPos(), playerTo);
    const index = gEnemys.findIndex((value) => {
        return value.getId() === enemyId;
    });
    if (index === -1) {
        return;
    }
    const enemy = gEnemys[index];
    gBattle = new Battle(pos, gUsableBattleCommand, player, playerTo, enemy);
};
class Charactor {
    constructor(startPos, charactorId, size) {
        this.moveExecute = (pos) => {
            if (isMapOver(pos, this.size)) {
                return RV_CANNOT_MOVE;
            }
            if (!canWalkInto(pos, this.size)) {
                return RV_CANNOT_MOVE;
            }
            const collision = checkCollision(pos, this.size, this.charactorId);
            if (collision !== undefined) {
                if (this.charactorId != PLAYER_ID) {
                    return RV_CANNOT_MOVE;
                }
                return gPlayerField[getIndexFromPos(collision)];
            }
            for (let xx = 0; xx < this.size.width; xx++) {
                for (let yy = 0; yy < this.size.height; yy++) {
                    const resetPos = {
                        x: this.pos.x + xx,
                        y: this.pos.y + yy
                    };
                    console.log('reset');
                    console.log(resetPos);
                    gPlayerField[getIndexFromPos(resetPos)] = EMPTY;
                }
            }
            this.pos = pos;
            for (let xx = 0; xx < this.size.width; xx++) {
                for (let yy = 0; yy < this.size.height; yy++) {
                    const setPos = {
                        x: this.pos.x + xx,
                        y: this.pos.y + yy
                    };
                    console.log('set');
                    console.log(setPos);
                    gPlayerField[getIndexFromPos(setPos)] = this.charactorId;
                }
            }
            return RV_MOVE_EXECUTE;
        };
        this.moveRight = () => {
            this.angle = 'right';
            const nextPos = {
                x: this.pos.x + 1,
                y: this.pos.y
            };
            return this.moveExecute(nextPos);
        };
        this.moveLeft = () => {
            this.angle = 'left';
            const nextPos = {
                x: this.pos.x - 1,
                y: this.pos.y
            };
            return this.moveExecute(nextPos);
        };
        this.moveUp = () => {
            this.angle = 'up';
            const nextPos = {
                x: this.pos.x,
                y: this.pos.y - 1
            };
            return this.moveExecute(nextPos);
        };
        this.moveDown = () => {
            this.angle = 'down';
            const nextPos = {
                x: this.pos.x,
                y: this.pos.y + 1
            };
            return this.moveExecute(nextPos);
        };
        this.moveToPos = (pos, angle) => {
            this.angle = angle;
            return this.moveExecute(pos);
        };
        this.resetPlayerField = () => {
            for (let xx = 0; xx < this.size.width; xx++) {
                for (let yy = 0; yy < this.size.height; yy++) {
                    const resetPos = {
                        x: this.pos.x + xx,
                        y: this.pos.y + yy
                    };
                    if (gPlayerField[getIndexFromPos(resetPos)] === this.charactorId) {
                        gPlayerField[getIndexFromPos(resetPos)] = EMPTY;
                    }
                }
            }
        };
        this.getId = () => {
            return this.charactorId;
        };
        this.getPos = () => {
            return this.pos;
        };
        this.getAngle = () => {
            return this.angle;
        };
        this.getSize = () => {
            return this.size;
        };
        this.pos = startPos;
        this.angle = 'down';
        this.charactorId = charactorId;
        if (size) {
            this.size = size;
        }
        else {
            this.size = {
                width: 1,
                height: 1
            };
        }
        for (let xx = 0; xx < this.size.width; xx++) {
            for (let yy = 0; yy < this.size.height; yy++) {
                const setPos = {
                    x: this.pos.x + xx,
                    y: this.pos.y + yy
                };
                gPlayerField[getIndexFromPos(setPos)] = this.charactorId;
            }
        }
    }
}
class Player extends Charactor {
    constructor(startPos, playerId, size) {
        super(startPos, playerId, size);
        this.playerName = 'プレイヤー';
        this.dispPlayerStatus = (context) => {
            context.fillStyle = COLOR.black;
            context.fillText(this.playerName, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * 1);
            context.fillText(`Lv.${this.lv}`, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * 2);
            context.fillText(`HP ${this.hp}`, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * 3);
        };
        this.getExp = (exp) => {
            if (this.lv >= MAX_LEVEL) {
                return;
            }
            this.toLevelUp -= exp;
        };
        this.levelUp = () => {
            if (this.lv >= MAX_LEVEL) {
                return;
            }
            this.lv++;
            const nextStatus = PLAYER_STATUS_TABLE[PLAYER_STATUS_TABLE.findIndex((value) => {
                return value.level === this.lv;
            })];
            this.maxHp = nextStatus.maxHp;
            this.atack = nextStatus.atack;
            this.hp = this.maxHp;
            this.toLevelUp += EXP_TABLE[EXP_TABLE.findIndex((value) => {
                return value.level === this.lv;
            })].nextExp;
            return `プレイヤーはLv.${this.lv}になった！`;
        };
        this.playerMoveEvent = (event) => {
            let retval;
            let playerTo;
            switch (event.key) {
                case 'ArrowUp':
                    gPressString += 'U';
                    playerTo = 'up';
                    retval = this.moveUp();
                    break;
                case 'ArrowDown':
                    gPressString += 'D';
                    playerTo = 'down';
                    retval = this.moveDown();
                    break;
                case 'ArrowLeft':
                    gPressString += 'L';
                    playerTo = 'left';
                    retval = this.moveLeft();
                    break;
                case 'ArrowRight':
                    gPressString += 'R';
                    playerTo = 'right';
                    retval = this.moveRight();
                    break;
                default:
                    return;
            }
            if (retval >= 0) {
                startBattle(this, playerTo, retval);
            }
        };
        this.recieveDamage = (damage) => {
            this.hp -= damage;
            return this.hp > 0;
        };
        this.getAtack = () => {
            return this.atack;
        };
        this.getToLevelUp = () => {
            return this.toLevelUp;
        };
        this.getHp = () => {
            return this.hp;
        };
        this.getLv = () => {
            return this.lv;
        };
        this.lv = 1;
        const startStatus = PLAYER_STATUS_TABLE[PLAYER_STATUS_TABLE.findIndex((value) => {
            return value.level === this.lv;
        })];
        this.maxHp = startStatus.maxHp;
        this.atack = startStatus.atack;
        this.hp = this.maxHp;
        this.toLevelUp = EXP_TABLE[EXP_TABLE.findIndex((value) => {
            return value.level === this.lv;
        })].nextExp;
    }
}
class Enemy extends Charactor {
    constructor(startPos, playerId, enemyType, size) {
        super(startPos, playerId, size ? size : getEnemyStatusFromType(enemyType).size);
        this.recieveDamage = (damage) => {
            this.hp -= damage;
            return this.hp > 0;
        };
        this.getAtack = () => {
            return this.atack;
        };
        this.getExp = () => {
            return this.exp;
        };
        this.getImgPath = () => {
            return this.imgPath;
        };
        this.getIsMove = () => {
            return this.isMove;
        };
        this.getMoveScene = () => {
            return this.moveScene;
        };
        this.enemyType = enemyType;
        const enemyStatus = getEnemyStatusFromType(this.enemyType);
        this.maxHp = enemyStatus.maxHp;
        this.hp = this.maxHp;
        this.exp = enemyStatus.exp;
        this.atack = enemyStatus.atack;
        this.imgPath = enemyStatus.imgPath;
        this.isMove = enemyStatus.isMove;
        this.moveScene = enemyStatus.moveScene;
    }
    randomMove() {
        if (!this.isMove) {
            return;
        }
        const rand = getRandomInt(0, 4);
        switch (rand) {
            case 0:
                this.moveDown();
                break;
            case 1:
                this.moveLeft();
                break;
            case 2:
                this.moveRight();
                break;
            case 3:
                this.moveUp();
                break;
        }
    }
}
class Battle {
    constructor(pos, battleCommand, player, playerMoveTo, enemy) {
        this.battleCommandCursorPos = 0;
        this.battlePhese = BATTLE_PHASE.start;
        this.messageBuffer = [];
        this.battleEndType = BATTLE_END_TYPE.false;
        this.inputEvent = (event) => {
            switch (this.battlePhese) {
                case BATTLE_PHASE.start:
                    this.readBattleStartMessage(event);
                    break;
                case BATTLE_PHASE.chooseCommand:
                    this.chooseBattleCommand(event);
                    break;
                case BATTLE_PHASE.commandExecute:
                    this.readBattleCommandExecuteMessage();
                    break;
                case BATTLE_PHASE.end:
                    this.readBattleEndMessage(event);
                    break;
            }
            console.log(this.message);
            console.log(this.messageBuffer);
        };
        this.readBattleStartMessage = (event) => {
            const messageEnd = this.readMessage();
            if (!messageEnd) {
                return;
            }
            this.battlePhese = BATTLE_PHASE.chooseCommand;
        };
        this.chooseBattleCommand = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    if (this.battleCommandCursorPos > 0) {
                        this.battleCommandCursorPos--;
                    }
                    break;
                case 'ArrowDown':
                    if (this.battleCommandCursorPos < (this.battleCommand.length - 1)) {
                        this.battleCommandCursorPos++;
                    }
                    break;
                case 'Enter':
                    this.commandDecision();
                    this.battlePhese = BATTLE_PHASE.commandExecute;
                    break;
            }
        };
        this.commandDecision = () => {
            let flgTmp;
            switch (this.battleCommandCursorPos) {
                case 0:
                    this.setMessage(BATTLE_COMMAND_EXECUTE_MESSAGE.attack);
                    flgTmp = this.enemy.recieveDamage(this.player.getAtack());
                    this.setMessage([`魔物に${this.player.getAtack()}のダメージ！！`]);
                    if (!flgTmp) {
                        this.battleEndType = BATTLE_END_TYPE.win;
                        break;
                    }
                    this.setMessage([`魔物の攻撃！！`]);
                    flgTmp = this.player.recieveDamage(this.enemy.getAtack());
                    this.setMessage([`プレイヤーに${this.enemy.getAtack()}のダメージ！！`]);
                    if (!flgTmp) {
                        this.battleEndType = BATTLE_END_TYPE.lose;
                        break;
                    }
                    break;
                case 1:
                    this.setMessage(BATTLE_COMMAND_EXECUTE_MESSAGE.escape);
                    this.battleEndType = BATTLE_END_TYPE.escape;
                    break;
                case 2:
                    this.setMessage(BATTLE_COMMAND_EXECUTE_MESSAGE.nothing);
                    flgTmp = this.player.recieveDamage(this.enemy.getAtack());
                    if (!flgTmp) {
                        this.battleEndType = BATTLE_END_TYPE.lose;
                        break;
                    }
                    break;
            }
        };
        this.readBattleCommandExecuteMessage = () => {
            const messageEnd = this.readMessage();
            if (!messageEnd) {
                return;
            }
            switch (this.battleEndType) {
                case BATTLE_END_TYPE.win:
                    this.setMessage(BATTLE_END_MESSAGE.removeEnemy);
                    this.battlePhese = BATTLE_PHASE.end;
                    break;
                case BATTLE_END_TYPE.escape:
                    this.battleEndEvent();
                    break;
                case BATTLE_END_TYPE.lose:
                    this.setMessage(BATTLE_END_MESSAGE.lose);
                    this.battlePhese = BATTLE_PHASE.end;
                    break;
                case BATTLE_END_TYPE.false:
                    this.battlePhese = BATTLE_PHASE.chooseCommand;
                    break;
            }
        };
        this.readBattleEndMessage = (event) => {
            const messageEnd = this.readMessage();
            if (!messageEnd) {
                return;
            }
            this.battleEndEvent();
        };
        this.battleEndEvent = () => {
            switch (this.battleEndType) {
                case BATTLE_END_TYPE.win:
                    this.player.getExp(this.getExp);
                    this.getExp = 0;
                    if (this.player.getLv() < MAX_LEVEL) {
                        if (this.player.getToLevelUp() <= 0) {
                            this.message = this.player.levelUp();
                            break;
                        }
                    }
                    if (this.enemy.getMoveScene()) {
                        gClearFrame = gFrameCounter;
                        gScene = SCENE.gameClear;
                    }
                    else {
                        gScene = SCENE.moveMap;
                    }
                    this.removeEnemy();
                    this.player.moveToPos(this.battlePos, this.playerMoveTo);
                    break;
                case BATTLE_END_TYPE.escape:
                    gScene = SCENE.moveMap;
                    break;
                case BATTLE_END_TYPE.lose:
                    gScene = SCENE.gameOver;
                    break;
                case BATTLE_END_TYPE.false:
                    this.battlePhese = BATTLE_PHASE.chooseCommand;
                    break;
            }
        };
        this.setMessage = (message) => {
            if (this.message === undefined) {
                this.message = message[0];
                this.messageBuffer = message.slice(1);
                return;
            }
            this.messageBuffer = this.messageBuffer.concat(message);
        };
        this.readMessage = () => {
            this.message = this.messageBuffer.shift();
            return this.message === undefined;
        };
        this.dispBattleScene = (context) => {
            context.fillStyle = COLOR.black;
            context.fillRect(0, 0, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * FIELD_SIZE.y);
            const img = new Image();
            img.src = this.enemy.getImgPath().battle;
            context.drawImage(img, NODE_SIZE.width * (FIELD_SIZE.x / 2 - 5), NODE_SIZE.height * (FIELD_SIZE.y / 2 - 5), NODE_SIZE.width * 10, NODE_SIZE.height * 10);
            switch (this.battlePhese) {
                case BATTLE_PHASE.start:
                    this.dispBattleStartMessagePhase(context);
                    break;
                case BATTLE_PHASE.chooseCommand:
                    this.dispChooseCommandPhase(context);
                    break;
                case BATTLE_PHASE.commandExecute:
                    this.dispCommandExecutePhase(context);
                    break;
                case BATTLE_PHASE.end:
                    this.dispBattleEndMessagePhase(context);
                    break;
            }
        };
        this.dispBattleStartMessagePhase = (context) => {
            this.dispBattleMessageField(context);
            this.dispBattleMessage(context);
        };
        this.dispChooseCommandPhase = (context) => {
            this.dispBattleCommandField(context);
            this.dispBattleCommand(context);
        };
        this.dispCommandExecutePhase = (context) => {
            this.dispBattleMessageField(context);
            this.dispBattleMessage(context);
        };
        this.dispBattleEndMessagePhase = (context) => {
            this.dispBattleMessageField(context);
            this.dispBattleMessage(context);
        };
        this.dispBattleMessageField = (context) => {
            context.strokeStyle = COLOR.white;
            roundedRect(context, NODE_SIZE.width * BATTLE_TEXT_FIELD.margin.left, NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.commandField.height - BATTLE_TEXT_FIELD.margin.bottom), NODE_SIZE.width * BATTLE_TEXT_FIELD.messageField.width, NODE_SIZE.height * BATTLE_TEXT_FIELD.messageField.height, NODE_SIZE.height / 2);
        };
        this.dispBattleMessage = (context) => {
            context.fillStyle = COLOR.white;
            context.fillText(this.message ? this.message : '', NODE_SIZE.width * (BATTLE_TEXT_FIELD.margin.left + BATTLE_TEXT_FIELD.padding.left), NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.messageField.height - BATTLE_TEXT_FIELD.margin.bottom + BATTLE_TEXT_FIELD.padding.top + 1));
        };
        this.dispBattleCommandField = (context) => {
            context.strokeStyle = COLOR.white;
            roundedRect(context, NODE_SIZE.width * BATTLE_TEXT_FIELD.margin.left, NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.commandField.height - BATTLE_TEXT_FIELD.margin.bottom), NODE_SIZE.width * BATTLE_TEXT_FIELD.commandField.width, NODE_SIZE.height * BATTLE_TEXT_FIELD.commandField.height, NODE_SIZE.height / 2);
            roundedRect(context, NODE_SIZE.width * (BATTLE_TEXT_FIELD.margin.left * 2 + BATTLE_TEXT_FIELD.commandField.width), NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.skillField.height - BATTLE_TEXT_FIELD.margin.bottom), NODE_SIZE.width * BATTLE_TEXT_FIELD.skillField.width, NODE_SIZE.height * BATTLE_TEXT_FIELD.skillField.height, NODE_SIZE.height / 2);
        };
        this.dispBattleCommand = (context) => {
            context.fillStyle = COLOR.white;
            gUsableBattleCommand.map((value, index) => {
                let message = index === this.battleCommandCursorPos ? '→' : '　';
                message += value;
                context.fillText(message, NODE_SIZE.width * (BATTLE_TEXT_FIELD.margin.left + BATTLE_TEXT_FIELD.padding.left), NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.commandField.height - BATTLE_TEXT_FIELD.margin.bottom + BATTLE_TEXT_FIELD.padding.top + index * BATTLE_TEXT_FIELD.textNode.height + 1));
            });
        };
        this.getBattlePos = () => {
            return this.battlePos;
        };
        this.getBattleEnemyId = () => {
            return this.enemy.getId();
        };
        this.removeEnemy = () => {
            this.enemy.resetPlayerField();
            const index = gEnemys.findIndex((value) => {
                return value.getId() === this.enemy.getId();
            });
            if (index === -1) {
                return;
            }
            gEnemys.splice(index, 1);
        };
        this.battlePos = pos;
        this.battleCommand = battleCommand;
        this.player = player;
        this.playerMoveTo = playerMoveTo;
        this.enemy = enemy;
        this.setMessage(BATTLE_START_MESSAGE);
        this.getExp = this.enemy.getExp();
    }
}
const main = () => {
    const canvas = document.getElementById("main");
    if (!canvas.getContext) {
        alert("canvas is not found");
        throw new Error("canvas is not found");
    }
    canvas.height = CANVAS_SIZE.height;
    canvas.width = CANVAS_SIZE.width;
    const context = getCanvasRenderingContext2D(canvas);
    context.font = FONT.message.toString() + "px sans-serif";
    const player = new Player({ x: 0, y: 0 }, PLAYER_ID);
    gEnemys.push(new Enemy({ x: FIELD_SIZE.x - 2, y: FIELD_SIZE.y - 1 }, gEnemyId++, 'c'));
    gEnemys.push(new Enemy({ x: FIELD_SIZE.x - 1, y: FIELD_SIZE.y - 2 }, gEnemyId++, 'c'));
    gEnemys.push(new Enemy(ENEMY_A_POSITION, gEnemyId++, 'a'));
    window.addEventListener('keydown', (event) => {
        switch (gScene) {
            case SCENE.moveMap:
                player.playerMoveEvent(event);
                break;
            case SCENE.battle:
                battleEvent(event);
                break;
        }
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
const battleEvent = (event) => {
    if (!gBattle) {
        return;
    }
    gBattle.inputEvent(event);
};
const updateView = (player) => {
    gFrameCounter++;
    const canvas = document.getElementById("main");
    const context = getCanvasRenderingContext2D(canvas);
    dispBackground(context);
    player.dispPlayerStatus(context);
    switch (gScene) {
        case SCENE.moveMap:
            moveEnemys();
            if (gEnemys.length < 2) {
                popEnemy();
            }
            dispMoveMapScene(context, player);
            break;
        case SCENE.battle:
            if (!gBattle) {
                break;
            }
            gBattle.dispBattleScene(context);
            break;
        case SCENE.gameClear:
            dispGameClearScene(context);
            break;
        case SCENE.gameOver:
            dispGameOverScene(context);
            break;
    }
    context.fillStyle = COLOR.black;
    context.fillText(`frame: ${gFrameCounter}`, 0, (FIELD_SIZE.y + 1) * NODE_SIZE.height);
    context.fillText(gPressString, 0, (FIELD_SIZE.y + 2) * NODE_SIZE.height);
};
const moveEnemys = () => {
    if (gFrameCounter % 15 !== 0) {
        return;
    }
    gEnemys.map((value) => {
        value.randomMove();
    });
};
const popEnemy = () => {
    if (gFrameCounter % 30 !== 0) {
        return;
    }
    if (processPercentage(50)) {
        return;
    }
    let popPos;
    do {
        popPos = {
            x: getRandomInt(0, FIELD_SIZE.x),
            y: getRandomInt(0, FIELD_SIZE.y)
        };
        if (isMapOver(popPos, { width: 1, height: 1 })) {
            continue;
        }
        if (!canWalkInto(popPos, { width: 1, height: 1 })) {
            continue;
        }
        if (checkCollision(popPos, { width: 1, height: 1 }, gEnemyId)) {
            continue;
        }
        break;
    } while (1);
    let enemyType;
    if (processPercentage(60)) {
        enemyType = 'c';
    }
    else {
        enemyType = 'b';
    }
    gEnemys.push(new Enemy(popPos, gEnemyId++, enemyType));
};
const dispBackground = (context) => {
    context.fillStyle = COLOR.white;
    context.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
};
const dispMoveMapScene = (context, player) => {
    dispField(context);
    dispPlayer(context, player);
    gEnemys.map((value) => {
        dispEnemy(context, value, COLOR.red);
    });
};
const dispField = (context) => {
    gMap.map((value, index) => {
        const pos = getPosFromIndex(index);
        context.fillStyle = FIELDS[value].color;
        context.fillRect(NODE_SIZE.width * pos.x, NODE_SIZE.height * pos.y, NODE_SIZE.width, NODE_SIZE.height);
        if (DEBUG_MODE) {
            context.fillStyle = COLOR.white;
            context.fillText(gPlayerField[index].toString(), NODE_SIZE.width * pos.x, NODE_SIZE.height * (pos.y + 1));
        }
    });
};
const dispPlayer = (context, player) => {
    let img = new Image();
    const pos = player.getPos();
    const playerSize = player.getSize();
    switch (player.getAngle()) {
        case 'down':
            img.src = PLAYER_IMAGE_PATH.down;
            break;
        case 'right':
            img.src = PLAYER_IMAGE_PATH.right;
            break;
        case 'up':
            img.src = PLAYER_IMAGE_PATH.up;
            break;
        case 'left':
            img.src = PLAYER_IMAGE_PATH.left;
            break;
        default:
            img.src = PLAYER_IMAGE_PATH.down;
            break;
    }
    context.drawImage(img, NODE_SIZE.width * pos.x, NODE_SIZE.height * pos.y, NODE_SIZE.width * playerSize.width, NODE_SIZE.height * playerSize.height);
};
const dispEnemy = (context, enemy, color) => {
    context.fillStyle = color;
    const defaultPath = {
        x: enemy.getPos().x * NODE_SIZE.width,
        y: enemy.getPos().y * NODE_SIZE.height
    };
    let img = new Image();
    const enemySize = enemy.getSize();
    switch (enemy.getAngle()) {
        case 'down':
            if (enemy.getImgPath().mini.down !== '') {
                img.src = enemy.getImgPath().mini.down;
                context.drawImage(img, defaultPath.x, defaultPath.y, NODE_SIZE.width * enemySize.width, NODE_SIZE.height * enemySize.height);
                break;
            }
            context.beginPath();
            context.moveTo(defaultPath.x + (NODE_SIZE.width * enemySize.width * 0.2), defaultPath.y + (NODE_SIZE.height * enemySize.height * 0.1));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * enemySize.width * 0.8), defaultPath.y + (NODE_SIZE.height * enemySize.height * 0.1));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * enemySize.width * 0.5), defaultPath.y + (NODE_SIZE.height * enemySize.height * 0.9));
            context.fill();
            break;
        case 'right':
            if (enemy.getImgPath().mini.right !== '') {
                img.src = enemy.getImgPath().mini.right;
                context.drawImage(img, defaultPath.x, defaultPath.y, NODE_SIZE.width * enemySize.width, NODE_SIZE.height * enemySize.height);
                break;
            }
            context.beginPath();
            context.moveTo(defaultPath.x + (NODE_SIZE.width * enemySize.width * 0.1), defaultPath.y + (NODE_SIZE.height * enemySize.height * 0.2));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * enemySize.width * 0.9), defaultPath.y + (NODE_SIZE.height * enemySize.height * 0.5));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * enemySize.width * 0.1), defaultPath.y + (NODE_SIZE.height * enemySize.height * 0.8));
            context.fill();
            break;
        case 'up':
            if (enemy.getImgPath().mini.up !== '') {
                img.src = enemy.getImgPath().mini.up;
                context.drawImage(img, defaultPath.x, defaultPath.y, NODE_SIZE.width * enemySize.width, NODE_SIZE.height * enemySize.height);
                break;
            }
            context.beginPath();
            context.moveTo(defaultPath.x + (NODE_SIZE.width * enemySize.width * 0.2), defaultPath.y + (NODE_SIZE.height * enemySize.height * 0.9));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * enemySize.width * 0.5), defaultPath.y + (NODE_SIZE.height * enemySize.height * 0.1));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * enemySize.width * 0.8), defaultPath.y + (NODE_SIZE.height * enemySize.height * 0.9));
            context.fill();
            break;
        case 'left':
            if (enemy.getImgPath().mini.left !== '') {
                img.src = enemy.getImgPath().mini.left;
                context.drawImage(img, defaultPath.x, defaultPath.y, NODE_SIZE.width * enemySize.width, NODE_SIZE.height * enemySize.height);
                break;
            }
            context.beginPath();
            context.moveTo(defaultPath.x + (NODE_SIZE.width * enemySize.width * 0.9), defaultPath.y + (NODE_SIZE.height * enemySize.height * 0.2));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * enemySize.width * 0.1), defaultPath.y + (NODE_SIZE.height * enemySize.height * 0.5));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * enemySize.width * 0.9), defaultPath.y + (NODE_SIZE.height * enemySize.height * 0.8));
            context.fill();
            break;
        default:
            break;
    }
};
const dispGameClearScene = (context) => {
    context.fillStyle = COLOR.black;
    context.fillRect(0, 0, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * FIELD_SIZE.y);
    context.fillStyle = COLOR.white;
    context.font = FONT.gameOver.toString() + "px sans-serif";
    context.fillText('GAME CLEAR', NODE_SIZE.width * (FIELD_SIZE.x / 2 - 13), NODE_SIZE.height * (FIELD_SIZE.y / 2 + 1));
    context.font = FONT.message.toString() + "px sans-serif";
    context.fillText(`Clear Frame: ${gClearFrame}`, NODE_SIZE.width * (FIELD_SIZE.x / 2 - 13), NODE_SIZE.height * (FIELD_SIZE.y / 2 + 3));
};
const dispGameOverScene = (context) => {
    context.fillStyle = COLOR.black;
    context.fillRect(0, 0, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * FIELD_SIZE.y);
    context.fillStyle = COLOR.red;
    context.font = FONT.gameOver.toString() + "px sans-serif";
    context.fillText('GAME OVER', NODE_SIZE.width * (FIELD_SIZE.x / 2 - 12), NODE_SIZE.height * (FIELD_SIZE.y / 2 + 1));
    context.font = FONT.message.toString() + "px sans-serif";
};
const getRandomInt = (min, amount) => {
    return Math.floor(Math.random() * amount + min);
};
const getNextPos = (pos, angle) => {
    switch (angle) {
        case 'up':
            return { x: pos.x, y: pos.y - 1 };
        case 'down':
            return { x: pos.x, y: pos.y + 1 };
        case 'right':
            return { x: pos.x + 1, y: pos.y };
        case 'left':
            return { x: pos.x - 1, y: pos.y };
    }
};
const getPosFromIndex = (index) => {
    const pos = {
        y: Math.floor(index / FIELD_SIZE.x),
        x: index % FIELD_SIZE.x
    };
    return pos;
};
const roundedRect = (context, x, y, width, height, radius) => {
    context.beginPath();
    context.moveTo(x, y + radius);
    context.lineTo(x, y + height - radius);
    context.arcTo(x, y + height, x + radius, y + height, radius);
    context.lineTo(x + width - radius, y + height);
    context.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    context.lineTo(x + width, y + radius);
    context.arcTo(x + width, y, x + width - radius, y, radius);
    context.lineTo(x + radius, y);
    context.arcTo(x, y, x, y + radius, radius);
    context.stroke();
};
const test = () => {
    const canvas = document.getElementById("main");
    if (!canvas.getContext) {
        alert("canvas is not found");
        throw new Error("canvas is not found");
    }
    canvas.height = CANVAS_SIZE.height;
    canvas.width = CANVAS_SIZE.width;
    const context = getCanvasRenderingContext2D(canvas);
    context.font = FONT.message.toString() + "px sans-serif";
    context.fillStyle = COLOR.black;
    context.fillRect(0, 0, 1000, 1000);
    const img = new Image();
    img.src = "../image/enemyA.png";
    img.onload = () => {
        context.drawImage(img, 0, 0);
    };
};
const processPercentage = (parcentage) => {
    const rand = getRandomInt(0, 100);
    return rand < parcentage;
};
window.onload = main;
