interface Position {
  x: number,
  y: number
}

interface FieldStatus {
  color: string,
  byWalk: boolean
}

type Angle = 'up' | 'right' | 'down' | 'left'

const DEBUG_MODE = false;

const FONT = {
  message: 20
}

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
}

const FIELD_GRASS: FieldStatus = {
  color: COLOR.lightGreen,
  byWalk: true
}

const FIELD_TREE: FieldStatus = {
  color: COLOR.green,
  byWalk: true
}

const FIELD_MOUNTAIN: FieldStatus = {
  color: COLOR.gray,
  byWalk: false
}

const FIELD_SEA: FieldStatus = {
  color: COLOR.azur,
  byWalk: false
}

const FIELD_SAND: FieldStatus = {
  color: COLOR.sand,
  byWalk: true
}

const FIELDS: FieldStatus[] = [
  FIELD_GRASS,
  FIELD_TREE,
  FIELD_MOUNTAIN,
  FIELD_SEA,
  FIELD_SAND
]

const CANVAS_SIZE = {
  height: 800,
  width: 960
}

const NODE_SIZE = {
  width: 20,
  height: 20
}

const FIELD_SIZE = {
  x: 32,
  y: 32
}

const CONSOLE_SPACE_SIZE = {
  width: 8,
  height: 8
}

const SCENE = {
  moveMap: 0,
  battle: 1
}

const BATTLE_PHASE = {
  start: 0,
  chooseCommand: 1,
  commandExecute: 2,
  end: 3
}

const BATTLE_END_TYPE = {
  false: 0,
  win: 1,
  escape: 2,
  lose: 3
}

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
}

const BATTLE_START_MESSAGE = '魔物があらわれた！！';

const BATTLE_COMMAND_EXECUTE_MESSAGE = {
  attack: 'プレイヤーの攻撃！！',
  escape: 'プレイヤーは逃げ出した！！',
  nothing: 'しかし何も起こらなかった！！'
}

const BATTLE_END_MESSAGE = {
  removeEnemy: '魔物をやっつけた！！'
}

const RV_BATTLE_START = 2;
const RV_CANNOT_MOVE = -1;
const RV_MOVE_EXECUTE = 1;

let gPressString: string = '';

let gFrameCounter: number = 0;

let gScene = SCENE.moveMap;

const gUsableBattleCommand = [
  'たたかう',
  'にげる',
  'ああああ'
]

const gEnemys: Enemy[] = [] ;

let gBattle: Battle | null = null;

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
]

const getIndexFromPos = (pos: Position): number => {
  return pos.y * FIELD_SIZE.x + pos.x;
}

const isMapOver = (pos: Position): boolean => {
  if(pos.x >= FIELD_SIZE.x) {
    return true;
  }
  if(pos.x < 0) {
    return true;
  }
  if(pos.y >= FIELD_SIZE.y) {
    return true;
  }
  if(pos.y < 0) {
    return true;
  }
  return false;
}

const canWalkInto = (pos: Position): boolean => {
  return FIELDS[gMap[getIndexFromPos(pos)]].byWalk;
}

const checkCollision = (pos: Position): boolean => {
  return gPlayerField[getIndexFromPos(pos)] !== EMPTY;
}

const startBattle = (player: Player, playerTo: Angle) => {
  gScene = SCENE.battle;
  const pos = getNextPos(player.pos, playerTo)
  gBattle = new Battle(pos, gPlayerField[getIndexFromPos(pos)], gUsableBattleCommand, player, playerTo);
}

class Charactor {
  pos: Position;
  angle: Angle;
  playerId: number;

  constructor (startPos: Position, playerId: number) {
    this.pos = startPos;
    this.angle = 'down';
    this.playerId = playerId;
    gPlayerField[getIndexFromPos(startPos)] = playerId;
  }

  moveExecute = (pos: Position) => {
    if (isMapOver(pos)){
      return RV_CANNOT_MOVE;
    }
    if (!canWalkInto(pos)){
      return RV_CANNOT_MOVE;
    }
    if (checkCollision(pos)){
      if ( this.playerId != PLAYER_ID ){
        return RV_CANNOT_MOVE;
      }
      return RV_BATTLE_START;
    }
    gPlayerField[getIndexFromPos(this.pos)] = EMPTY;
    this.pos = pos;
    gPlayerField[getIndexFromPos(this.pos)] = this.playerId;
    return RV_MOVE_EXECUTE;
  }

  moveRight = () => {
    this.angle = 'right';
    const nextPos = {
      x: this.pos.x + 1,
      y: this.pos.y
    };
    return this.moveExecute(nextPos);
  }

  moveLeft = () => {
    this.angle = 'left';
    const nextPos = {
      x: this.pos.x - 1,
      y: this.pos.y
    };
    return this.moveExecute(nextPos);
  }

  moveUp = () => {
    this.angle = 'up';
    const nextPos = {
      x: this.pos.x,
      y: this.pos.y - 1
    };
    return this.moveExecute(nextPos);
  }

  moveDown = () => {
    this.angle = 'down';
    const nextPos = {
      x: this.pos.x,
      y: this.pos.y + 1
    };
    return this.moveExecute(nextPos);
  }

  moveToPos = (pos: Position, angle: Angle) => {
    this.angle = angle;
    return this.moveExecute(pos);
  }

  getId = () => {
    return this.playerId;
  }
}

class Player extends Charactor {
  constructor (startPos: Position, playerId: number) {
    super(startPos, playerId);
  }

  playerMoveEvent = (event: KeyboardEvent) => {
    let retval;
    let playerTo: Angle;
    switch(event.key) {
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
        playerTo = 'left'
        retval = this.moveLeft();
        break;
      case 'ArrowRight':
        gPressString += 'R';
        playerTo = 'right'
        retval = this.moveRight();
        break;
      default:
        return;
    }
    if(retval === RV_BATTLE_START) {
      startBattle(this, playerTo);
    }
    console.log('player', this.pos);
  }
}

class Enemy extends Charactor {
  constructor (startPos: Position, playerId: number) {
    super(startPos, playerId);
  }

  randomMove(){
    const rand = getRandomInt(0, 4);
      switch(rand) {
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
  private battlePos: Position;
  private battleEnemyId: number;
  private battleCommand: string[];
  private battleCommandCursorPos: number = 0;
  private battlePhese: number = BATTLE_PHASE.start;
  private player: Player;
  private playerMoveTo: Angle;
  private message: string = BATTLE_START_MESSAGE;
  private battleEndType: number = BATTLE_END_TYPE.false;

  constructor (pos: Position, enemyId: number, battleCommand: string[], player: Player, playerMoveTo: Angle) {
    this.battlePos = pos;
    this.battleEnemyId = enemyId;
    this.battleCommand = battleCommand;
    this.player = player;
    this.playerMoveTo = playerMoveTo;
  }

  inputEvent = (event: KeyboardEvent) => {
    console.log(this.battlePhese);
    switch(this.battlePhese){
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
  }

  private readBattleStartMessage = (event: KeyboardEvent) => {
    this.battlePhese = BATTLE_PHASE.chooseCommand;
  }

  private chooseBattleCommand = (event: KeyboardEvent) => {
    switch(event.key) {
      case 'ArrowUp':
        if(this.battleCommandCursorPos > 0) {
          this.battleCommandCursorPos--;
        }
        break;
      case 'ArrowDown':
        if(this.battleCommandCursorPos < (this.battleCommand.length - 1)){
          this.battleCommandCursorPos++;
        }
        break;
      case 'Enter':
        this.commandDecision();
        this.battlePhese = BATTLE_PHASE.commandExecute;
        break;
    }
  }

  private commandDecision = () => {
    switch(this.battleCommandCursorPos){
      case 0:
        this.message = BATTLE_COMMAND_EXECUTE_MESSAGE.attack;
        this.battleEndType = BATTLE_END_TYPE.win;
        break;
      case 1:
        this.message = BATTLE_COMMAND_EXECUTE_MESSAGE.escape;
        this.battleEndType = BATTLE_END_TYPE.escape;
        break;
      case 2:
        this.message = BATTLE_COMMAND_EXECUTE_MESSAGE.nothing;
        break;
    }
  }

  private readBattleCommandExecuteMessage = () => {
    switch(this.battleEndType){
      case BATTLE_END_TYPE.win:
        this.message = BATTLE_END_MESSAGE.removeEnemy;
        this.battlePhese = BATTLE_PHASE.end;
        break;
      case BATTLE_END_TYPE.escape:
        this.battleEndEvent();
        break;
      case BATTLE_END_TYPE.false:
        this.battlePhese = BATTLE_PHASE.chooseCommand;
        break;
    }
  }

  private readBattleEndMessage = (event: KeyboardEvent) => {
    this.battleEndEvent();
  }

  dispBattleScene = (context: CanvasRenderingContext2D) => {
    context.fillStyle = COLOR.black;
    context.fillRect(0, 0, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * FIELD_SIZE.y);
    switch(this.battlePhese){
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
  }

  private dispBattleStartMessagePhase = (context: CanvasRenderingContext2D) => {
    this.dispBattleMessageField(context);
    this.dispBattleMessage(context);
  }

  private dispChooseCommandPhase = (context: CanvasRenderingContext2D) => {
    this.dispBattleCommandField(context);
    this.dispBattleCommand(context);
  }

  private dispCommandExecutePhase = (context: CanvasRenderingContext2D) => {
    this.dispBattleMessageField(context);
    this.dispBattleMessage(context);
  }

  private dispBattleEndMessagePhase = (context: CanvasRenderingContext2D) => {
    this.dispBattleMessageField(context);
    this.dispBattleMessage(context);
  }

  private dispBattleMessageField = (context: CanvasRenderingContext2D) => {
    context.strokeStyle = COLOR.white;
    roundedRect(
      context,
      NODE_SIZE.width * BATTLE_TEXT_FIELD.margin.left,
      NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.commandField.height - BATTLE_TEXT_FIELD.margin.bottom),
      NODE_SIZE.width * BATTLE_TEXT_FIELD.messageField.width,
      NODE_SIZE.height * BATTLE_TEXT_FIELD.messageField.height,
      NODE_SIZE.height / 2
    );
  }

  private dispBattleMessage = (context: CanvasRenderingContext2D) => {
    context.fillStyle = COLOR.white;
    context.fillText(
      this.message,
      NODE_SIZE.width * (BATTLE_TEXT_FIELD.margin.left + BATTLE_TEXT_FIELD.padding.left),
      NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.messageField.height - BATTLE_TEXT_FIELD.margin.bottom + BATTLE_TEXT_FIELD.padding.top + 1)
    );
  }

  private dispBattleCommandField = (context: CanvasRenderingContext2D) => {
    context.strokeStyle = COLOR.white;
    roundedRect(
      context,
      NODE_SIZE.width * BATTLE_TEXT_FIELD.margin.left,
      NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.commandField.height - BATTLE_TEXT_FIELD.margin.bottom),
      NODE_SIZE.width * BATTLE_TEXT_FIELD.commandField.width,
      NODE_SIZE.height * BATTLE_TEXT_FIELD.commandField.height,
      NODE_SIZE.height / 2
    );
    roundedRect(
      context,
      NODE_SIZE.width * (BATTLE_TEXT_FIELD.margin.left * 2 + BATTLE_TEXT_FIELD.commandField.width),
      NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.skillField.height - BATTLE_TEXT_FIELD.margin.bottom),
      NODE_SIZE.width * BATTLE_TEXT_FIELD.skillField.width,
      NODE_SIZE.height * BATTLE_TEXT_FIELD.skillField.height,
      NODE_SIZE.height / 2
    );
  }

  private dispBattleCommand = (context: CanvasRenderingContext2D) => {
    context.fillStyle = COLOR.white;
    gUsableBattleCommand.map((value, index) => {
      let message = index === this.battleCommandCursorPos ? '→' : '　';
      message += value;
      context.fillText(
        message,
        NODE_SIZE.width * (BATTLE_TEXT_FIELD.margin.left + BATTLE_TEXT_FIELD.padding.left),
        NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.commandField.height - BATTLE_TEXT_FIELD.margin.bottom + BATTLE_TEXT_FIELD.padding.top + index * BATTLE_TEXT_FIELD.textNode.height + 1));
    })
  }
  
  getBattlePos = () => {
    return this.battlePos;
  }

  getBattleEnemyId = () => {
    return this.battleEnemyId;
  }

  battleEndEvent = () => {
    gScene = SCENE.moveMap;
    if(this.battleEndType === BATTLE_END_TYPE.win){
      this.removeEnemy();
      gPlayerField[getIndexFromPos(this.battlePos)] = EMPTY;
      this.player.moveToPos(this.battlePos, this.playerMoveTo);
    }
  }

  private removeEnemy = () => {
    const index = gEnemys.findIndex((value) => {
      console.log(`${value.getId()}, ${this.battleEnemyId}`)
      console.log(value.getId() === this.battleEnemyId)
      return value.getId() === this.battleEnemyId
    });
    if(index === -1){
      return;
    }
    console.log(index);
    gEnemys.splice(index, 1);
  }
}

const main = () => {
  const canvas = <HTMLCanvasElement>document.getElementById("main");

  if(!canvas.getContext){
    alert("canvas is not found");
    throw new Error("canvas is not found");
  }

  canvas.height = CANVAS_SIZE.height;
  canvas.width = CANVAS_SIZE.width;

  const context = getCanvasRenderingContext2D(canvas);

  context.font = FONT.message.toString() + "px sans-serif";

  const player = new Player({x: 0, y: 0}, PLAYER_ID);
  gEnemys.push(new Enemy({x: FIELD_SIZE.x - 2, y: FIELD_SIZE.y - 1}, 2));
  gEnemys.push(new Enemy({x: FIELD_SIZE.x - 1, y: FIELD_SIZE.y - 2}, 3));

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    switch (gScene) {
      case SCENE.moveMap:
        player.playerMoveEvent(event);
        break;
      case SCENE.battle:
        battleEvent(event);
        break;
    }
  })

  setInterval(updateView.bind(null, player), 33.333);

}

const getCanvasRenderingContext2D = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const context = canvas.getContext('2d');
  if(!context){
    alert("cannot get context");
    throw new Error("cannot get context");
  }
  return context;
}

const battleEvent = (event: KeyboardEvent) => {
  if(!gBattle){
    return;
  }
  gBattle.inputEvent(event);
}

const updateView = (player: Player): void => {
  gFrameCounter++;

  const canvas = <HTMLCanvasElement>document.getElementById("main");
  const context = getCanvasRenderingContext2D(canvas);

  dispBackground(context);

  switch(gScene) {
    case SCENE.moveMap:
      moveNPCs();
      dispMoveMapScene(context, player);
      break;
    case SCENE.battle:
      if(!gBattle){
        break;
      }
      gBattle.dispBattleScene(context);
      break;
  }

  context.fillStyle = COLOR.black;
  context.fillText(`frame: ${gFrameCounter}`, 0, (FIELD_SIZE.y + 1) * NODE_SIZE.height);
  context.fillText(gPressString, 0, (FIELD_SIZE.y + 2) * NODE_SIZE.height);
}

const moveNPCs = () => {
  if(gFrameCounter % 15 === 0){
    gEnemys.map((value) => {
      value.randomMove();
    });
  }
}

const dispBackground = (context: CanvasRenderingContext2D) => {
  context.fillStyle = COLOR.white;
  context.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
}

const dispMoveMapScene = (context: CanvasRenderingContext2D, player: Player) => {
  dispField(context);
  dispCharactor(context, player, COLOR.blue);
  gEnemys.map((value) => {
    dispCharactor(context, value, COLOR.red);
  });
}

const dispField = (context: CanvasRenderingContext2D): void => {
  gMap.map((value, index) => {
    const pos = getPosFromIndex(index);
    context.fillStyle = FIELDS[value].color;
    context.fillRect(NODE_SIZE.width * pos.x, NODE_SIZE.height * pos.y, NODE_SIZE.width, NODE_SIZE.height);
    if(DEBUG_MODE) {
      context.fillStyle = COLOR.white;
      context.fillText(gPlayerField[index].toString(), NODE_SIZE.width * pos.x, NODE_SIZE.height * (pos.y + 1))
    }
  })
}

const dispCharactor = (context: CanvasRenderingContext2D, player: Charactor, color: string) => {

  context.fillStyle = color;

  const defaultPath = {
    x: player.pos.x * NODE_SIZE.width,
    y: player.pos.y * NODE_SIZE.height
  }

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

}

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * max + min);
}

const getNextPos = (pos: Position, angle: Angle): Position => {
  switch(angle) {
    case 'up':
      return {x: pos.x, y: pos.y - 1};
    case 'down':
      return {x: pos.x, y: pos.y + 1};
    case 'right':
      return {x: pos.x + 1, y: pos.y};
    case 'left':
      return {x: pos.x - 1, y: pos.y};
  }
}

const getPosFromIndex = (index: number): Position => {
  const pos = {
    y: Math.floor(index / FIELD_SIZE.x),
    x: index % FIELD_SIZE.x
  }

  return pos
}

const roundedRect = (context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
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
}

window.onload = main;