"use strict";
const DEBUG_MODE = true;
const FONT = {
    message: 20
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
const SCENE = {
    moveMap: 0,
    battle: 1
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
        width: 18
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
const RV_BATTLE_START = 2;
const RV_CANNOT_MOVE = -1;
const RV_MOVE_EXECUTE = 1;
let gPressString = '';
let gFrameCounter = 0;
let gScene = SCENE.moveMap;
const gUsableBattleCommand = [
    'たたかう',
    'にげる'
];
const gPlayers = [];
let gBattle = null;
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
    return FIELDS[gMap[getIndexFromPos(pos)]].byWalk;
};
const checkCollision = (pos) => {
    return gPlayerField[getIndexFromPos(pos)] !== EMPTY;
};
const startBattle = (player, playerTo) => {
    gScene = SCENE.battle;
    const pos = getNextPos(player.pos, playerTo);
    gBattle = new Battle(pos, gPlayerField[getIndexFromPos(pos)], gUsableBattleCommand, player, playerTo);
};
class Player {
    constructor(startPos, playerId) {
        this.moveExecute = (pos) => {
            if (isMapOver(pos)) {
                return RV_CANNOT_MOVE;
            }
            if (!canWalkInto(pos)) {
                return RV_CANNOT_MOVE;
            }
            if (checkCollision(pos)) {
                if (this.playerId != PLAYER_ID) {
                    return RV_CANNOT_MOVE;
                }
                return RV_BATTLE_START;
            }
            gPlayerField[getIndexFromPos(this.pos)] = EMPTY;
            this.pos = pos;
            gPlayerField[getIndexFromPos(this.pos)] = this.playerId;
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
        this.getId = () => {
            return this.playerId;
        };
        this.pos = startPos;
        this.angle = 'down';
        this.playerId = playerId;
        gPlayerField[getIndexFromPos(startPos)] = playerId;
    }
}
class Battle {
    constructor(pos, enemyId, battleCommand, player, playerMoveTo) {
        this.battleCommandCursorPos = 0;
        this.battlePhese = 0;
        this.inputEvent = (event) => {
            switch (this.battlePhese) {
                case 0:
                    this.readBattleStartMessage(event);
                case 1:
                    this.chooseBattleCommand(event);
                case 2:
                    this.readBattleEndMessage(event);
            }
        };
        this.readBattleStartMessage = (event) => {
            this.battlePhese = 1;
        };
        this.chooseBattleCommand = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    gPressString += 'U';
                    if (this.battleCommandCursorPos > 0) {
                        this.battleCommandCursorPos--;
                    }
                    break;
                case 'ArrowDown':
                    gPressString += 'D';
                    if (this.battleCommandCursorPos < this.battleCommand.length) {
                        this.battleCommandCursorPos++;
                    }
                    break;
                case 'Enter':
                    this.battlePhese = 2;
                    break;
            }
        };
        this.readBattleEndMessage = (event) => {
            this.battlePhese = 0;
        };
        this.dispBattleScene = (context) => {
            context.fillStyle = COLOR.black;
            context.fillRect(0, 0, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * FIELD_SIZE.y);
            this.dispBattleTextField(context);
            this.dispBattleCommand(context);
        };
        this.dispBattleTextField = (context) => {
            context.strokeStyle = COLOR.white;
            roundedRect(context, NODE_SIZE.width * BATTLE_TEXT_FIELD.margin.left, NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.commandField.height - BATTLE_TEXT_FIELD.margin.bottom), NODE_SIZE.width * BATTLE_TEXT_FIELD.commandField.width, NODE_SIZE.height * BATTLE_TEXT_FIELD.commandField.height, NODE_SIZE.height / 2);
            roundedRect(context, NODE_SIZE.width * (BATTLE_TEXT_FIELD.margin.left * 2 + BATTLE_TEXT_FIELD.commandField.width), NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.skillField.height - BATTLE_TEXT_FIELD.margin.bottom), NODE_SIZE.width * BATTLE_TEXT_FIELD.skillField.width, NODE_SIZE.height * BATTLE_TEXT_FIELD.skillField.height, NODE_SIZE.height / 2);
        };
        this.dispBattleCommand = (context) => {
            context.fillStyle = COLOR.white;
            gUsableBattleCommand.map((value, index) => {
                context.fillText('→' + value, NODE_SIZE.width * (BATTLE_TEXT_FIELD.margin.left + BATTLE_TEXT_FIELD.padding.left), NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.commandField.height - BATTLE_TEXT_FIELD.margin.bottom + BATTLE_TEXT_FIELD.padding.top + index * BATTLE_TEXT_FIELD.textNode.height + 1));
            });
        };
        this.getBattlePos = () => {
            return this.battlePos;
        };
        this.getBattleEnemyId = () => {
            return this.battleEnemyId;
        };
        this.battleEndEvent = () => {
            gScene = SCENE.moveMap;
            this.removeEnemy();
            gPlayerField[getIndexFromPos(this.battlePos)] = 0;
            this.player.moveToPos(this.battlePos, this.playerMoveTo);
        };
        this.removeEnemy = () => {
            const index = gPlayers.findIndex((value) => {
                console.log(`${value.getId()}, ${this.battleEnemyId}`);
                console.log(value.getId() === this.battleEnemyId);
                return value.getId() === this.battleEnemyId;
            });
            if (index === -1) {
                return;
            }
            console.log(index);
            gPlayers.splice(index, 1);
        };
        this.battlePos = pos;
        this.battleEnemyId = enemyId;
        this.battleCommand = battleCommand;
        this.player = player;
        this.playerMoveTo = playerMoveTo;
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
    context.font = FONT.message.toString() + "px sans-serif";
    const player = new Player({ x: 0, y: 0 }, PLAYER_ID);
    gPlayers.push(new Player({ x: FIELD_SIZE.x - 2, y: FIELD_SIZE.y - 1 }, 2));
    gPlayers.push(new Player({ x: FIELD_SIZE.x - 1, y: FIELD_SIZE.y - 2 }, 3));
    window.addEventListener('keydown', (event) => {
        switch (gScene) {
            case SCENE.moveMap:
                playerMoveEvent(event, player);
                break;
            case SCENE.battle:
                battleEvent();
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
const playerMoveEvent = (event, player) => {
    let retval;
    let playerTo;
    switch (event.key) {
        case 'ArrowUp':
            gPressString += 'U';
            playerTo = 'up';
            retval = player.moveUp();
            break;
        case 'ArrowDown':
            gPressString += 'D';
            playerTo = 'down';
            retval = player.moveDown();
            break;
        case 'ArrowLeft':
            gPressString += 'L';
            playerTo = 'left';
            retval = player.moveLeft();
            break;
        case 'ArrowRight':
            gPressString += 'R';
            playerTo = 'right';
            retval = player.moveRight();
            break;
        default:
            return;
    }
    if (retval === RV_BATTLE_START) {
        startBattle(player, playerTo);
    }
    console.log('player', player.pos);
};
const battleEvent = () => {
    if (!gBattle) {
        return;
    }
    gBattle.battleEndEvent();
};
const updateView = (player) => {
    gFrameCounter++;
    const canvas = document.getElementById("main");
    const context = getCanvasRenderingContext2D(canvas);
    dispBackground(context);
    switch (gScene) {
        case SCENE.moveMap:
            moveNPCs();
            dispMoveMapScene(context, player);
            break;
        case SCENE.battle:
            if (!gBattle) {
                break;
            }
            gBattle.dispBattleScene(context);
            break;
    }
    context.fillStyle = COLOR.black;
    context.fillText(`frame: ${gFrameCounter}`, 0, (FIELD_SIZE.y + 1) * NODE_SIZE.height);
    context.fillText(gPressString, 0, (FIELD_SIZE.y + 2) * NODE_SIZE.height);
};
const moveNPCs = () => {
    if (gFrameCounter % 15 === 0) {
        gPlayers.map((value) => {
            const rand = getRandomInt(0, 4);
            switch (rand) {
                case 0:
                    value.moveDown();
                    break;
                case 1:
                    value.moveLeft();
                    break;
                case 2:
                    value.moveRight();
                    break;
                case 3:
                    value.moveUp();
                    break;
            }
        });
    }
};
const dispMoveMapScene = (context, player) => {
    dispField(context);
    dispPlayer(context, player, COLOR.blue);
    gPlayers.map((value) => {
        dispPlayer(context, value, COLOR.red);
    });
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
const dispBackground = (context) => {
    context.fillStyle = COLOR.white;
    context.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
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
const getPosFromIndex = (index) => {
    const pos = {
        y: Math.floor(index / FIELD_SIZE.x),
        x: index % FIELD_SIZE.x
    };
    return pos;
};
window.onload = main;
const dispPlayer = (context, player, color) => {
    context.fillStyle = color;
    const defaultPath = {
        x: player.pos.x * NODE_SIZE.width,
        y: player.pos.y * NODE_SIZE.height
    };
    context.beginPath();
    switch (player.angle) {
        case 'down':
            context.moveTo(defaultPath.x + (NODE_SIZE.width * 0.2), defaultPath.y + (NODE_SIZE.height * 0.1));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * 0.8), defaultPath.y + (NODE_SIZE.height * 0.1));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * 0.5), defaultPath.y + (NODE_SIZE.height * 0.9));
            break;
        case 'right':
            context.moveTo(defaultPath.x + (NODE_SIZE.width * 0.1), defaultPath.y + (NODE_SIZE.height * 0.2));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * 0.9), defaultPath.y + (NODE_SIZE.height * 0.5));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * 0.1), defaultPath.y + (NODE_SIZE.height * 0.8));
            break;
        case 'up':
            context.moveTo(defaultPath.x + (NODE_SIZE.width * 0.2), defaultPath.y + (NODE_SIZE.height * 0.9));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * 0.5), defaultPath.y + (NODE_SIZE.height * 0.1));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * 0.8), defaultPath.y + (NODE_SIZE.height * 0.9));
            break;
        case 'left':
            context.moveTo(defaultPath.x + (NODE_SIZE.width * 0.9), defaultPath.y + (NODE_SIZE.height * 0.2));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * 0.1), defaultPath.y + (NODE_SIZE.height * 0.5));
            context.lineTo(defaultPath.x + (NODE_SIZE.width * 0.9), defaultPath.y + (NODE_SIZE.height * 0.8));
            break;
        default:
            break;
    }
    context.fill();
};
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * max + min);
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
