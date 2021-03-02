interface Position {
  x: number,
  y: number
}

interface FieldStatus {
  color: string,
  byWalk: boolean
}

interface PlayerStatus {
  level: number,
  maxHp: number,
  atack: number
}

interface NextExp {
  level: number,
  nextExp: number
}

interface Size {
  width: number,
  height: number
}

interface CharactorImage {
  battle: HTMLImageElement | undefined,
  mini: {
    up: HTMLImageElement | undefined,
    down: HTMLImageElement | undefined,
    right: HTMLImageElement | undefined,
    left: HTMLImageElement | undefined
  }
}

interface CharactorImagePath {
  battle: string,
  mini: {
    up: string,
    down: string,
    right: string,
    left: string
  }
}

type Angle = 'up' | 'right' | 'down' | 'left'

const DEBUG_MODE = false;

const FONT = {
  message: 20,
  gameOver: 80
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
  sand: 'rgb(246, 215, 176)',
  lightBlack: 'rgba(00,00,00,0.5)',
  clear: 'rgba(0, 0, 0, 0)'
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
  battle: 1,
  gameClear: 50,
  gameOver: 99
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

const BATTLE_START_MESSAGE = 'NAMEがあらわれた！！';

const BATTLE_COMMAND_EXECUTE_MESSAGE = {
  attack: 'NAMEの攻撃！！',
  escape: 'NAMEは逃げ出した！！',
  nothing: 'しかし何も起こらなかった！！'
}

const BATTLE_RECIEVE_DAMAGE_MESSAGE = 'NAMEにDAMAGEのダメージ！！';


const BATTLE_END_MESSAGE = {
  removeEnemy: 'NAMEをやっつけた！！',
  lose: 'NAMEは死んでしまった！！'
}

const FIELD_EVENT_MESSAGE = {
  cure: 'NAMEのHPが回復した！！'
}

const RV_CANNOT_MOVE = -2;
const RV_MOVE_EXECUTE = -1;

const PLAYER_STATUS_TABLE: PlayerStatus[] = [
  {level:  1, maxHp:  10, atack:  3},
  {level:  2, maxHp:  12, atack:  5},
  {level:  3, maxHp:  14, atack:  7},
  {level:  4, maxHp:  16, atack:  9},
  {level:  5, maxHp:  18, atack: 11},
  {level:  6, maxHp:  20, atack: 13},
  {level:  7, maxHp:  22, atack: 15},
  {level:  8, maxHp:  24, atack: 17},
  {level:  9, maxHp:  26, atack: 19},
  {level: 10, maxHp:  28, atack: 21},
]

const EXP_TABLE: NextExp[] = [
  {level:  1, nextExp:  10},
  {level:  2, nextExp:  10},
  {level:  3, nextExp:  10},
  {level:  4, nextExp:  10},
  {level:  5, nextExp:  10},
  {level:  6, nextExp:  10},
  {level:  7, nextExp:  10},
  {level:  8, nextExp:  10},
  {level:  9, nextExp:  10},
  {level: 10, nextExp:  10},
]

const MAX_LEVEL = 10;

const ENEMY_IMAGE_PATH = {
  a: {
    battle: './image/enemyA.png',
    mini: {
      up: '',
      down: './image/castle.png',
      right: '',
      left: '',
    }
  },
  b: {
    battle: './image/enemyB.png',
    mini: {
      up: '',
      down: '',
      right: '',
      left: '',
    }
  },
  c: {
    battle: './image/enemyC.png',
    mini: {
      up: '',
      down: '',
      right: '',
      left: '',
    }
  },
}

const PLAYER_IMAGE_PATH: CharactorImagePath = {
  battle: '',
  mini: {
    up: './image/playerUp.png',
    down: './image/playerDown.png',
    right: './image/playerRight.png',
    left: './image/playerLeft.png'
  }
}

const AUDIO_PATH = {
  field: './audio/field.mp3'
}

const ENEMY_A = {
  name: 'ラスボス',
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
}

const ENEMY_B = {
  name: 'ベチョマンテ',
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
}

const ENEMY_C = {
  name: 'ベチョマ',
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
}

const ENEMY_A_POSITION: Position = {
  x: FIELD_SIZE.x - 2,
  y: 15
}

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
]

const EVENT_ID = {
  cure: 1
}

const TIME = {
  battleIgnore: 90
}

let gPressString: string = '';

let gFrameCounter: number = 0;

let gScene = SCENE.moveMap;

let gClearFrame = 0;

const gUsableBattleCommand = [
  'たたかう',
  'にげる',
  'ああああ'
]

const gEnemys: Enemy[] = [];

let gBattle: Battle | null = null;

let gEnemyId: number = 2;

let gBgm = new Audio();

let gFieldMessage: string | undefined;

let gFieldMessageBuffer: string[] = [];

let gBattleIgnoreFrame: number = 0;

const gMap = [
  1, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
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

const gEventField = [
  EVENT_ID.cure, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
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

const getEnemyStatusFromType = (type: string) => {
  let index = ENEMY_STATUS_TABLE.findIndex((value) => {return value.type === type;})
  if(index === -1){
    index = 2
  }
  return ENEMY_STATUS_TABLE[index].status;
}

const isMapOver = (pos: Position, size: Size): boolean => {
  for(let xx = 0; xx < size.width; xx++){
    for(let yy = 0; yy < size.height; yy++){
      if(pos.x + xx >= FIELD_SIZE.x) {
        return true;
      }
      if(pos.x + xx < 0) {
        return true;
      }
      if(pos.y + yy >= FIELD_SIZE.y) {
        return true;
      }
      if(pos.y + yy < 0) {
        return true;
      }
    }
  }
  return false;
}

const canWalkInto = (pos: Position, size: Size): boolean => {
  for(let xx = 0; xx < size.width; xx++){
    for(let yy = 0; yy < size.height; yy++){
      const checkPos: Position = {
        x: pos.x + xx,
        y: pos.y + yy
      }
      if(!FIELDS[gMap[getIndexFromPos(checkPos)]].byWalk){
        return false;
      };
    }
  }
  return true;
}

const checkCollision = (pos: Position, size: Size, myId: number): Position | undefined => {
  for(let xx = 0; xx < size.width; xx++){
    for(let yy = 0; yy < size.height; yy++){
      const checkPos: Position = {
        x: pos.x + xx,
        y: pos.y + yy
      }
      if(gPlayerField[getIndexFromPos(checkPos)] !== EMPTY && gPlayerField[getIndexFromPos(checkPos)] !== myId){
        return checkPos;
      };
    }
  }
  return;
}

const checkEvent = (pos: Position, size: Size): number => {
  for(let xx = 0; xx < size.width; xx++){
    for(let yy = 0; yy < size.height; yy++){
      const checkPos: Position = {
        x: pos.x + xx,
        y: pos.y + yy
      }
      if(gEventField[getIndexFromPos(checkPos)] !== EMPTY){
        return gEventField[getIndexFromPos(checkPos)];
      }
    }
  }
  return EMPTY;
}

const executeEvent = (eventId: number, player: Player) => {
  switch(eventId){
    case EVENT_ID.cure:
      player.cureAll();
      setFieldMessage(FIELD_EVENT_MESSAGE.cure.replace('NAME', player.getName()));
      break;
  }
} 

const startBattle = (player: Player, playerTo: Angle, enemyId: number, startByPlayer: boolean) => {
  if(gBattleIgnoreFrame > gFrameCounter){
    return;
  }
  gScene = SCENE.battle;
  if(!gBgm.paused){
    gBgm.pause();
    gBgm.currentTime = 0;
  }
  const pos = getNextPos(player.getPos(), playerTo);
  const index = gEnemys.findIndex((value) => {
    return value.getId() === enemyId
  });
  if(index === -1){
    return;
  }
  const enemy = gEnemys[index];
  gBattle = new Battle(pos, gUsableBattleCommand, player, playerTo, enemy, startByPlayer);
}

class Charactor {
  private pos: Position;
  private angle: Angle;
  private charactorId: number;
  private size: Size;
  private name: string;
  private charactorImage: CharactorImage;

  constructor (startPos: Position, charactorId: number, name: string, imgPath: CharactorImagePath, size?: Size) {
    this.pos = startPos;
    this.angle = 'down';
    this.charactorId = charactorId;
    this.name = name
    if(size){
      this.size = size;
    }else{
      this.size = {
        width: 1,
        height: 1
      }
    }
    for(let xx = 0; xx < this.size.width; xx++){
      for(let yy = 0; yy < this.size.height; yy++){
        const setPos: Position = {
          x: this.pos.x + xx,
          y: this.pos.y + yy
        }
        gPlayerField[getIndexFromPos(setPos)] = this.charactorId;
      }
    }
    let images: CharactorImage = {
      battle: undefined,
      mini: {
        up: undefined,
        down: undefined,
        right: undefined,
        left: undefined
      }
    }
    if(imgPath.battle !== ''){
      images.battle = new Image();
      images.battle.src = imgPath.battle;
    }
    if(imgPath.mini.up !== ''){
      images.mini.up = new Image();
      images.mini.up.src = imgPath.mini.up;
    }
    if(imgPath.mini.down !== ''){
      images.mini.down = new Image();
      images.mini.down.src = imgPath.mini.down;
    }
    if(imgPath.mini.left !== ''){
      images.mini.left = new Image();
      images.mini.left.src = imgPath.mini.left;
    }
    if(imgPath.mini.right !== ''){
      images.mini.right = new Image();
      images.mini.right.src = imgPath.mini.right;
    }
    this.charactorImage = images;
  }

  moveExecute = (pos: Position) => {
    if (isMapOver(pos, this.size)){
      return RV_CANNOT_MOVE;
    }
    if (!canWalkInto(pos, this.size)){
      return RV_CANNOT_MOVE;
    }
    const collision = checkCollision(pos, this.size, this.charactorId);
    if (collision !== undefined){
      const collisionCharactorId = gPlayerField[getIndexFromPos(collision)]
      if ( this.charactorId !== PLAYER_ID &&  collisionCharactorId !== PLAYER_ID){
        return RV_CANNOT_MOVE;
      }
      return collisionCharactorId;
    }
    if ( this instanceof Player){
      executeEvent(checkEvent(pos, this.size), this);
    }

    for(let xx = 0; xx < this.size.width; xx++){
      for(let yy = 0; yy < this.size.height; yy++){
        const resetPos: Position = {
          x: this.pos.x + xx,
          y: this.pos.y + yy
        }
        gPlayerField[getIndexFromPos(resetPos)] = EMPTY;
      }
    }
    this.pos = pos;
    for(let xx = 0; xx < this.size.width; xx++){
      for(let yy = 0; yy < this.size.height; yy++){
        const setPos: Position = {
          x: this.pos.x + xx,
          y: this.pos.y + yy
        }
        gPlayerField[getIndexFromPos(setPos)] = this.charactorId;
      }
    }
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

  resetPlayerField = () => {
    for(let xx = 0; xx < this.size.width; xx++){
      for(let yy = 0; yy < this.size.height; yy++){
        const resetPos: Position = {
          x: this.pos.x + xx,
          y: this.pos.y + yy
        }
        if(gPlayerField[getIndexFromPos(resetPos)] === this.charactorId){
          gPlayerField[getIndexFromPos(resetPos)] = EMPTY
        }
      }
    }
  }

  getId = () => {
    return this.charactorId;
  }

  getPos = (): Position => {
    return this.pos;
  }

  getAngle = (): Angle => {
    return this.angle
  }

  getSize = (): Size => {
    return this.size
  }

  getName = (): string => {
    return this.name
  }

  getMiniImage = (angle?: Angle): HTMLImageElement | undefined => {
    const retAngle: Angle = angle ? angle : this.angle;
    switch(retAngle){
      case 'up':
        return this.charactorImage.mini.up;
      case 'down':
        return this.charactorImage.mini.down;
      case 'left':
        return this.charactorImage.mini.left;
      case 'right':
        return this.charactorImage.mini.right;
    }
  }

  getBattleImage = (): HTMLImageElement | undefined => {
    return this.charactorImage.battle
  }

}

class Player extends Charactor {
  private lv: number;
  private maxHp: number;
  private hp: number;
  private toLevelUp: number;
  private playerName: string = 'プレイヤー';
  private atack: number;

  constructor (startPos: Position, playerId: number, size?: Size) {
    super(startPos, playerId, 'プレイヤー', PLAYER_IMAGE_PATH, size);
    this.lv = 1;
    const startStatus = PLAYER_STATUS_TABLE[
      PLAYER_STATUS_TABLE.findIndex((value) =>{
        return value.level === this.lv
      })
    ];
    this.maxHp = startStatus.maxHp;
    this.atack = startStatus.atack;
    this.hp = this.maxHp;
    this.toLevelUp = EXP_TABLE[
      EXP_TABLE.findIndex((value) =>{
        return value.level === this.lv
      })
    ].nextExp;
  }

  dispPlayerStatus = (context: CanvasRenderingContext2D) => {
    context.fillStyle = COLOR.black;
    context.fillText(this.playerName, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * 1);
    context.fillText(`Lv.${this.lv}`, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * 2);
    context.fillText(`HP ${this.hp}`, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * 3);
  }

  getExp = (exp: number) => {
    if(this.lv >= MAX_LEVEL){
      return;
    }
    this.toLevelUp -= exp;
  }

  levelUp = () => {
    if(this.lv >= MAX_LEVEL){
      return;
    }
    this.lv++;
    const nextStatus = PLAYER_STATUS_TABLE[
      PLAYER_STATUS_TABLE.findIndex((value) =>{
        return value.level === this.lv
      })
    ];
    this.maxHp = nextStatus.maxHp;
    this.atack = nextStatus.atack;
    this.hp = this.maxHp;
    this.toLevelUp += EXP_TABLE[
      EXP_TABLE.findIndex((value) =>{
        return value.level === this.lv
      })
    ].nextExp;
    return `プレイヤーはLv.${this.lv}になった！`;
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
    if(retval >= 0) {
      startBattle(this, playerTo, retval, true);
    }
  }

  recieveDamage = (damage: number): boolean => {
    this.hp -= damage;
    return this.hp > 0;
  }

  getAtack = (): number => {
    return this.atack;
  }

  getToLevelUp = (): number => {
    return this.toLevelUp;
  }

  getHp = (): number => {
    return this.hp
  }

  getLv = (): number => {
    return this.lv
  }

  cureAll = () => {
    this.hp = this.maxHp;
  }
}

class Enemy extends Charactor {
  private maxHp: number;
  private hp: number;
  private atack: number;
  private enemyType: string;
  private exp: number;
  private imgPath;
  private isMove: boolean;
  private moveScene: boolean;

  constructor (startPos: Position, playerId: number, enemyType: string, size?: Size) {
    super(startPos, playerId, getEnemyStatusFromType(enemyType).name, getEnemyStatusFromType(enemyType).imgPath, size ? size : getEnemyStatusFromType(enemyType).size);
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

  randomMove(){
    if(!this.isMove){
      return RV_CANNOT_MOVE;
    }
    const rand = getRandomInt(0, 4);
    let retval;
    switch(rand) {
      case 0:
        retval = this.moveDown();
        break;
      case 1:
        retval = this.moveLeft();
        break;
      case 2:
        retval = this.moveRight();
        break;
      case 3:
        retval = this.moveUp();
        break;
      default:
        return RV_CANNOT_MOVE;
    }
    return retval;
  }

  recieveDamage = (damage: number): boolean => {
    this.hp -= damage;
    return this.hp > 0;
  }

  getAtack = (): number => {
    return this.atack;
  }

  getExp = (): number => {
    return this.exp;
  }

  getImgPath = () => {
    return this.imgPath;
  }

  getIsMove = (): boolean => {
    return this.isMove;
  }

  getMoveScene = (): boolean => {
    return this.moveScene;
  }

}

class Battle {
  private battlePos: Position;
  private battleCommand: string[];
  private battleCommandCursorPos: number = 0;
  private battlePhese: number = BATTLE_PHASE.start;
  private player: Player;
  private playerMoveTo: Angle;
  private message: string | undefined;
  private messageBuffer: string[] = [];
  private battleEndType: number = BATTLE_END_TYPE.false;
  private getExp: number;
  private enemy: Enemy;
  private startByPlayer: boolean;

  constructor (pos: Position, battleCommand: string[], player: Player, playerMoveTo: Angle, enemy: Enemy, startByPlayer: boolean) {
    this.battlePos = pos;
    this.battleCommand = battleCommand;
    this.player = player;
    this.playerMoveTo = playerMoveTo;
    this.enemy = enemy;
    this.setMessage(BATTLE_START_MESSAGE.replace('NAME', this.enemy.getName()));
    this.getExp = this.enemy.getExp();
    this.startByPlayer = startByPlayer;
  }

  inputEvent = (event: KeyboardEvent) => {
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
    const messageEnd = this.readMessage();
    if(!messageEnd){
      return;
    }
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
    let flgTmp
    switch(this.battleCommandCursorPos){
      case 0:
        this.setMessage(BATTLE_COMMAND_EXECUTE_MESSAGE.attack.replace('NAME', this.player.getName()));
        flgTmp = this.enemy.recieveDamage(this.player.getAtack());
        this.setMessage(BATTLE_RECIEVE_DAMAGE_MESSAGE.replace('NAME', this.enemy.getName()).replace('DAMAGE', this.player.getAtack().toString()));
        if(!flgTmp){
          this.battleEndType = BATTLE_END_TYPE.win;
          break;
        }
        this.setMessage(BATTLE_COMMAND_EXECUTE_MESSAGE.attack.replace('NAME', this.enemy.getName()));
        flgTmp = this.player.recieveDamage(this.enemy.getAtack());
        this.setMessage(BATTLE_RECIEVE_DAMAGE_MESSAGE.replace('NAME', this.player.getName()).replace('DAMAGE', this.enemy.getAtack().toString()));
        if(!flgTmp){
          this.battleEndType = BATTLE_END_TYPE.lose;
          break;
        }
        break;
      case 1:
        this.setMessage(BATTLE_COMMAND_EXECUTE_MESSAGE.escape.replace('NAME', this.player.getName()));
        this.battleEndType = BATTLE_END_TYPE.escape;
        break;
      case 2:
        this.setMessage(BATTLE_COMMAND_EXECUTE_MESSAGE.nothing);
        this.setMessage(BATTLE_COMMAND_EXECUTE_MESSAGE.attack.replace('NAME', this.enemy.getName()));
        flgTmp = this.player.recieveDamage(this.enemy.getAtack());
        this.setMessage(BATTLE_RECIEVE_DAMAGE_MESSAGE.replace('NAME', this.player.getName()).replace('DAMAGE', this.enemy.getAtack().toString()));
        if(!flgTmp){
          this.battleEndType = BATTLE_END_TYPE.lose;
          break;
        }
        break;
    }
  }

  private readBattleCommandExecuteMessage = () => {
    const messageEnd = this.readMessage();
    if(!messageEnd){
      return;
    }
    switch(this.battleEndType){
      case BATTLE_END_TYPE.win:
        this.setMessage(BATTLE_END_MESSAGE.removeEnemy.replace('NAME', this.enemy.getName()));
        this.battlePhese = BATTLE_PHASE.end;
        break;
      case BATTLE_END_TYPE.escape:
        this.battleEndEvent();
        break;
      case BATTLE_END_TYPE.lose:
        this.setMessage(BATTLE_END_MESSAGE.lose.replace('NAME', this.player.getName()));
        this.battlePhese = BATTLE_PHASE.end;
        break;
      case BATTLE_END_TYPE.false:
        this.battlePhese = BATTLE_PHASE.chooseCommand;
        break;
    }
  }

  private readBattleEndMessage = (event: KeyboardEvent) => {
    const messageEnd = this.readMessage();
    if(!messageEnd){
      return;
    }
    this.battleEndEvent();
  }

  battleEndEvent = () => {
    switch(this.battleEndType){
      case BATTLE_END_TYPE.win:
        this.player.getExp(this.getExp);
        this.getExp = 0;
        if(this.player.getLv() < MAX_LEVEL){
          if(this.player.getToLevelUp() <= 0){
            this.message = this.player.levelUp();
            break;
          }
        }
        if(this.enemy.getMoveScene()){
          gClearFrame = gFrameCounter;
          gScene = SCENE.gameClear;
        }else{
          gScene = SCENE.moveMap;
          if(gBgm.paused){
            gBgm.play();
          }
        }
        this.removeEnemy();
        if(this.startByPlayer){
          this.player.moveToPos(this.battlePos, this.playerMoveTo);
        }
        break;
      case BATTLE_END_TYPE.escape:
        gBattleIgnoreFrame = gFrameCounter + TIME.battleIgnore;
        if(gBgm.paused){
          gBgm.play();
        }
        gScene = SCENE.moveMap;
        break;
      case BATTLE_END_TYPE.lose:
        gScene = SCENE.gameOver;
        break;
      case BATTLE_END_TYPE.false:
        this.battlePhese = BATTLE_PHASE.chooseCommand;
        break;
    }
  }

  private setMessage = (message: string) => {
    if(this.message === undefined){
      this.message = message;
      return;
    }
    this.messageBuffer = this.messageBuffer.concat(message);
  }

  private readMessage = (): boolean => {
    this.message = this.messageBuffer.shift();
    return this.message === undefined;
  }

  dispBattleScene = (context: CanvasRenderingContext2D) => {
    context.fillStyle = COLOR.black;
    context.fillRect(0, 0, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * FIELD_SIZE.y);
    const img = this.enemy.getBattleImage();
    if(img !== undefined){
      context.drawImage(img, NODE_SIZE.width * (FIELD_SIZE.x / 2 - 5), NODE_SIZE.height * (FIELD_SIZE.y / 2 - 5), NODE_SIZE.width * 10, NODE_SIZE.height * 10);
    }
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
      this.message ? this.message : '',
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
    return this.enemy.getId();
  }

  getEnemy = () => {
    return this.enemy;
  }

  private removeEnemy = () => {
    this.enemy.resetPlayerField();
    const index = gEnemys.findIndex((value) => {
      return value.getId() === this.enemy.getId();
    });
    if(index === -1){
      return;
    }
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
  gEnemys.push(new Enemy({x: FIELD_SIZE.x - 2, y: FIELD_SIZE.y - 1}, gEnemyId++, 'c'));
  gEnemys.push(new Enemy({x: FIELD_SIZE.x - 1, y: FIELD_SIZE.y - 2}, gEnemyId++, 'c'));
  gEnemys.push(new Enemy(ENEMY_A_POSITION, gEnemyId++, 'a'));

  gBgm.src = AUDIO_PATH.field;

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    switch (gScene) {
      case SCENE.moveMap:
        if(gBgm.paused){
          gBgm.play();
        }
        if(gFieldMessage){
          readFieldMessageEvent(event);
          break;
        }
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
  player.dispPlayerStatus(context);

  switch(gScene) {
    case SCENE.moveMap:
      console.log(gBgm.currentTime);
      if(gBgm.currentTime > 54.05){
        gBgm.currentTime = 7.85;
        gBgm.play();
      }
      moveEnemys(player);
      if(gEnemys.length < 3){
        popEnemy();
      }
      dispMoveMapScene(context, player);
      if(gFieldMessage){
        dispFieldMessageField(context);
        dispFieldMessage(context);
      }
      break;
    case SCENE.battle:
      if(!gBattle){
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
}

const moveEnemys = (player: Player) => {
  if(gFrameCounter % 15 !== 0){
    return;
  }
  gEnemys.map((value) => {
    const retval = value.randomMove();
    if(retval > 0){
      startBattle(player, player.getAngle(), value.getId(), false);
    }
  });
}

const popEnemy = () => {
  if(gFrameCounter % 30 !== 0){
    return;
  }
  if(processPercentage(50)){
    return;
  }
  let popPos: Position;
  do{
    popPos = {
      x: getRandomInt(0, FIELD_SIZE.x),
      y: getRandomInt(0, FIELD_SIZE.y)
    };

    if (isMapOver(popPos, {width: 1, height: 1})){
      continue;
    }
    if (!canWalkInto(popPos, {width: 1, height: 1})){
      continue;
    }
    if (checkCollision(popPos, {width: 1, height: 1}, gEnemyId)){
      continue;
    }
    break;
  }while(1);

  let enemyType;
  if(processPercentage(60)){
    enemyType = 'c'
  }else{
    enemyType = 'b'
  }

  gEnemys.push(new Enemy(popPos, gEnemyId++, enemyType));
}

const dispBackground = (context: CanvasRenderingContext2D) => {
  context.fillStyle = COLOR.white;
  context.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
}

const dispMoveMapScene = (context: CanvasRenderingContext2D, player: Player) => {
  dispField(context);
  dispCharactor(context, player);
  gEnemys.map((value) => {
    dispCharactor(context, value);
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

const dispCharactor = (context: CanvasRenderingContext2D, charactor: Charactor) => {
  const img = charactor.getMiniImage();
  const pos = charactor.getPos();
  const size = charactor.getSize();

  if(img === undefined){
    const color: string = charactor instanceof Enemy ? COLOR.red : COLOR.blue;
    drawDefaultCharactor(context, pos, charactor.getAngle(), color, size)
  }else{
    context.globalAlpha = charactor instanceof Player && gBattleIgnoreFrame > gFrameCounter ? 0.5 : 1;
    context.drawImage(img, NODE_SIZE.width * pos.x, NODE_SIZE.height * pos.y, NODE_SIZE.width * size.width, NODE_SIZE.height * size.height);
//    context.globalAlpha = 1;
  }
}

const drawDefaultCharactor = (context: CanvasRenderingContext2D, pos: Position, angle: Angle, color: string, size: Size) => {
  context.fillStyle = color;

  const defaultPath = {
    x: pos.x * NODE_SIZE.width,
    y: pos.y * NODE_SIZE.height
  }

  switch (angle) {
    case 'down':
      context.beginPath();
      context.moveTo(defaultPath.x + (NODE_SIZE.width * size.width * 0.2), defaultPath.y + (NODE_SIZE.height * size.height * 0.1));
      context.lineTo(defaultPath.x + (NODE_SIZE.width * size.width * 0.8), defaultPath.y + (NODE_SIZE.height * size.height * 0.1));
      context.lineTo(defaultPath.x + (NODE_SIZE.width * size.width * 0.5), defaultPath.y + (NODE_SIZE.height * size.height * 0.9));
      context.fill();
      break;
    case 'right':
      context.beginPath();
      context.moveTo(defaultPath.x + (NODE_SIZE.width * size.width * 0.1), defaultPath.y + (NODE_SIZE.height * size.height * 0.2));
      context.lineTo(defaultPath.x + (NODE_SIZE.width * size.width * 0.9), defaultPath.y + (NODE_SIZE.height * size.height * 0.5));
      context.lineTo(defaultPath.x + (NODE_SIZE.width * size.width * 0.1), defaultPath.y + (NODE_SIZE.height * size.height * 0.8));
      context.fill();
      break;
    case 'up':
      context.beginPath();
      context.moveTo(defaultPath.x + (NODE_SIZE.width * size.width * 0.2), defaultPath.y + (NODE_SIZE.height * size.height * 0.9));
      context.lineTo(defaultPath.x + (NODE_SIZE.width * size.width * 0.5), defaultPath.y + (NODE_SIZE.height * size.height * 0.1));
      context.lineTo(defaultPath.x + (NODE_SIZE.width * size.width * 0.8), defaultPath.y + (NODE_SIZE.height * size.height * 0.9));
      context.fill();
      break;
    case 'left':
      context.beginPath();
      context.moveTo(defaultPath.x + (NODE_SIZE.width * size.width * 0.9), defaultPath.y + (NODE_SIZE.height * size.height * 0.2));
      context.lineTo(defaultPath.x + (NODE_SIZE.width * size.width * 0.1), defaultPath.y + (NODE_SIZE.height * size.height * 0.5));
      context.lineTo(defaultPath.x + (NODE_SIZE.width * size.width * 0.9), defaultPath.y + (NODE_SIZE.height * size.height * 0.8));
      context.fill();
      break;
    default:
      break;
  }
}

const dispFieldMessage = (context: CanvasRenderingContext2D) => {
  if(!gFieldMessage){
    return;
  }
  context.fillStyle = COLOR.white;
  context.fillText(
    gFieldMessage,
    NODE_SIZE.width * (BATTLE_TEXT_FIELD.margin.left + BATTLE_TEXT_FIELD.padding.left),
    NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.messageField.height - BATTLE_TEXT_FIELD.margin.bottom + BATTLE_TEXT_FIELD.padding.top + 1)
  );
}

const dispFieldMessageField = (context: CanvasRenderingContext2D) => {
  context.strokeStyle = COLOR.clear;
  context.lineWidth = 0;
  roundedRect(
    context,
    NODE_SIZE.width * (BATTLE_TEXT_FIELD.margin.left - 0.1),
    NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.commandField.height - BATTLE_TEXT_FIELD.margin.bottom - 0.1),
    NODE_SIZE.width * (BATTLE_TEXT_FIELD.messageField.width + 0.2),
    NODE_SIZE.height * (BATTLE_TEXT_FIELD.messageField.height + 0.2),
    NODE_SIZE.height / 2
  );
  context.fillStyle = COLOR.lightBlack;
  context.fill();
  context.strokeStyle = COLOR.white;
  context.lineWidth = 2;
  roundedRect(
    context,
    NODE_SIZE.width * BATTLE_TEXT_FIELD.margin.left,
    NODE_SIZE.height * (FIELD_SIZE.y - BATTLE_TEXT_FIELD.commandField.height - BATTLE_TEXT_FIELD.margin.bottom),
    NODE_SIZE.width * BATTLE_TEXT_FIELD.messageField.width,
    NODE_SIZE.height * BATTLE_TEXT_FIELD.messageField.height,
    NODE_SIZE.height / 2
  );
}

const setFieldMessage = (message: string) => {
  if(gFieldMessage === undefined){
    gFieldMessage = message;
    return;
  }
  gFieldMessageBuffer = gFieldMessageBuffer.concat(message);
}

const readFieldMessageEvent = (event: KeyboardEvent) => {
  switch(event.key){
    case 'Enter':
      readFieldMessage();
      break;
  }
}

const readFieldMessage = (): boolean => {
  gFieldMessage = gFieldMessageBuffer.shift();
  return gFieldMessage === undefined;
}

const dispGameClearScene = (context: CanvasRenderingContext2D) => {
  context.fillStyle = COLOR.black;
  context.fillRect(0, 0, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * FIELD_SIZE.y);
  context.fillStyle = COLOR.white;
  context.font = FONT.gameOver.toString() + "px sans-serif";
  context.fillText('GAME CLEAR', NODE_SIZE.width * (FIELD_SIZE.x / 2 - 13), NODE_SIZE.height * (FIELD_SIZE.y / 2 + 1));
  context.font = FONT.message.toString() + "px sans-serif";
  context.fillText(`Clear Frame: ${gClearFrame}`, NODE_SIZE.width * (FIELD_SIZE.x / 2 - 13), NODE_SIZE.height * (FIELD_SIZE.y / 2 + 3));
}

const dispGameOverScene = (context: CanvasRenderingContext2D) => {
  context.fillStyle = COLOR.black;
  context.fillRect(0, 0, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * FIELD_SIZE.y);
  context.fillStyle = COLOR.red;
  context.font = FONT.gameOver.toString() + "px sans-serif";
  context.fillText('GAME OVER', NODE_SIZE.width * (FIELD_SIZE.x / 2 - 12), NODE_SIZE.height * (FIELD_SIZE.y / 2 + 1));
  context.font = FONT.message.toString() + "px sans-serif";
}

const getRandomInt = (min: number, amount: number): number => {
  return Math.floor(Math.random() * amount + min);
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



const test = () => {
  const canvas = <HTMLCanvasElement>document.getElementById("main");

  if(!canvas.getContext){
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
  img.src = "./image/enemyA.png";
  img.onload = () => {
    context.drawImage(img, 0, 0);
  }
}

const processPercentage = (parcentage: number): boolean => {
  const rand = getRandomInt(0, 100);
  return rand < parcentage;
}

window.onload = main;