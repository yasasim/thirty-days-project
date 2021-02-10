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

const SCENE = {
  moveMap: 0,
  battle: 1
}

const PLAYER_ID = -1;

const EMPTY = 0;

let gPressString: string = '';

let gFrameCounter: number = 0;

let gScene = 0;

let gBattlePos: Position;

let gBattleEnemyId: number;

const gNPCs: Player[] = [] ;

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

const startBattle = (pos: Position) => {
  gScene = SCENE.battle;
  gBattlePos = pos;
  gBattleEnemyId = gPlayerField[getIndexFromPos(pos)];
}

class Player {
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
      return;
    }
    if (!canWalkInto(pos)){
      return;
    }
    if (checkCollision(pos)){
      if ( this.playerId != PLAYER_ID ){
        return;
      }
      startBattle(pos);
    }
    gPlayerField[getIndexFromPos(this.pos)] = EMPTY;
    this.pos = pos;
    gPlayerField[getIndexFromPos(this.pos)] = this.playerId;
  }

  moveRight = () => {
    this.angle = 'right';
    const nextPos = {
      x: this.pos.x + 1,
      y: this.pos.y
    };
    this.moveExecute(nextPos);
  }

  moveLeft = () => {
    this.angle = 'left';
    const nextPos = {
      x: this.pos.x - 1,
      y: this.pos.y
    };
    this.moveExecute(nextPos);
  }

  moveUp = () => {
    this.angle = 'up';
    const nextPos = {
      x: this.pos.x,
      y: this.pos.y - 1
    };
    this.moveExecute(nextPos);
  }

  moveDown = () => {
    this.angle = 'down';
    const nextPos = {
      x: this.pos.x,
      y: this.pos.y + 1
    };
    this.moveExecute(nextPos);
  }

  getId = () => {
    return this.playerId;
  }
}

const main = () => {
  console.log("Hello, World!");
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
  gNPCs.push(new Player({x: FIELD_SIZE.x - 2, y: FIELD_SIZE.y - 1}, 1));
  gNPCs.push(new Player({x: FIELD_SIZE.x - 1, y: FIELD_SIZE.y - 2}, 2));

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    switch (gScene) {
      case SCENE.moveMap:
        playerMoveEvent(event, player);
        break;
      case SCENE.battle:
        battleEvent();
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

const playerMoveEvent = (event: KeyboardEvent, player: Player) => {
    switch(event.key) {
      case 'ArrowUp':
        gPressString += 'U';
        player.moveUp();
        break;
      case 'ArrowDown':
        gPressString += 'D';
        player.moveDown();
        break;
      case 'ArrowLeft':
        gPressString += 'L';
        player.moveLeft();
        break;
      case 'ArrowRight':
        gPressString += 'R';
        player.moveRight();
        break;
    }
    console.log('player', player.pos);
}

const battleEvent = () => {
  gScene = SCENE.moveMap;
  gNPCs.splice(gNPCs.findIndex((value) => {return value.getId() === gBattleEnemyId}), 1);
  gPlayerField[getIndexFromPos(gBattlePos)] = PLAYER_ID;
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
      dispBattleScene(context);
      break;
  }

  context.fillStyle = COLOR.black;
  context.fillText(`frame: ${gFrameCounter}`, 0, (FIELD_SIZE.y + 1) * NODE_SIZE.height);
  context.fillText(gPressString, 0, (FIELD_SIZE.y + 2) * NODE_SIZE.height);
}

const moveNPCs = () => {
  if(gFrameCounter % 15 === 0){
    gNPCs.map((value) => {
      const rand = getRandomInt(0, 4);
      switch(rand) {
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
}

const dispMoveMapScene = (context: CanvasRenderingContext2D, player: Player) => {
  dispField(context);
  dispPlayer(context, player, COLOR.blue);
  gNPCs.map((value) => {
    dispPlayer(context, value, COLOR.red);
  });
}

const dispBattleScene = (context: CanvasRenderingContext2D) => {
  context.fillStyle = COLOR.black;
  context.fillRect(0, 0, NODE_SIZE.width * FIELD_SIZE.x, NODE_SIZE.height * FIELD_SIZE.y);
  context.fillStyle = COLOR.white;
  context.fillText('Press Enter' ,NODE_SIZE.width * 1, NODE_SIZE.height * (FIELD_SIZE.y - 4))
}

const dispBackground = (context: CanvasRenderingContext2D) => {
  context.fillStyle = COLOR.white;
  context.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
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

const getPosFromIndex = (index: number): Position => {
  const pos = {
    y: Math.floor(index / FIELD_SIZE.x),
    x: index % FIELD_SIZE.x
  }

  return pos
}

window.onload = main;

const dispPlayer = (context: CanvasRenderingContext2D, player: Player, color: string) => {

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

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * max + min);
}
