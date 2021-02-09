interface Position {
  x: number,
  y: number
}

interface FieldStatus {
  color: string,
  byWalk: boolean
}

type Angle = 'up' | 'right' | 'down' | 'left'

const font = {
  message: 20
}

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
}

const FIELD_GRASS: FieldStatus = {
  color: color.lightGreen,
  byWalk: true
}

const FIELD_TREE: FieldStatus = {
  color: color.green,
  byWalk: true
}

const FIELD_MOUNTAIN: FieldStatus = {
  color: color.gray,
  byWalk: false
}

const FIELD_SEA: FieldStatus = {
  color: color.azur,
  byWalk: false
}

const FIELD_SAND: FieldStatus = {
  color: color.sand,
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

let pressString: string = '';

let frameCounter: number = 0;

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

const playerField = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
  return FIELDS[field[getIndexFromPos(pos)]].byWalk;
}

const checkCollision = (pos: Position): boolean => {
  return playerField[getIndexFromPos(pos)] === 1;
}

class Player {
  pos: Position;
  angle: Angle;

  constructor (startPos: Position) {
    this.pos = startPos;
    this.angle = 'down';
    playerField[getIndexFromPos(startPos)] = 1;
  }

  moveRight = () => {
    this.angle = 'right';
    const nextPos = {
      x: this.pos.x + 1,
      y: this.pos.y
    };
    if (isMapOver(nextPos)){
      return;
    }
    if (!canWalkInto(nextPos)){
      return;
    }
    if (checkCollision(nextPos)){
      return;
    }
    playerField[getIndexFromPos(this.pos)] = 0;
    this.pos = nextPos;
    playerField[getIndexFromPos(this.pos)] = 1;
  }

  moveLeft = () => {
    this.angle = 'left';
    const nextPos = {
      x: this.pos.x - 1,
      y: this.pos.y
    };
    if (isMapOver(nextPos)){
      return;
    }
    if (!canWalkInto(nextPos)){
      return;
    }
    if (checkCollision(nextPos)){
      return;
    }
    playerField[getIndexFromPos(this.pos)] = 0;
    this.pos = nextPos;
    playerField[getIndexFromPos(this.pos)] = 1;
  }

  moveUp = () => {
    this.angle = 'up';
    const nextPos = {
      x: this.pos.x,
      y: this.pos.y - 1
    };
    if (isMapOver(nextPos)){
      return;
    }
    if (!canWalkInto(nextPos)){
      return;
    }
    if (checkCollision(nextPos)){
      return;
    }
    playerField[getIndexFromPos(this.pos)] = 0;
    this.pos = nextPos;
    playerField[getIndexFromPos(this.pos)] = 1;
  }

  moveDown = () => {
    this.angle = 'down';
    const nextPos = {
      x: this.pos.x,
      y: this.pos.y + 1
    };
    if (isMapOver(nextPos)){
      return;
    }
    if (!canWalkInto(nextPos)){
      return;
    }
    if (checkCollision(nextPos)){
      return;
    }
    playerField[getIndexFromPos(this.pos)] = 0;
    this.pos = nextPos;
    playerField[getIndexFromPos(this.pos)] = 1;
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

  context.font = font.message.toString() + "px sans-serif";

  const player = new Player({x: 0, y: 0});
  const npcs: Player[] = [];
  const npcA = new Player({x: FIELD_SIZE.x - 2, y: FIELD_SIZE.y - 1});
  const npcB = new Player({x: FIELD_SIZE.x - 1, y: FIELD_SIZE.y - 2});
  npcs.push(npcA);
  npcs.push(npcB);

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    switch(event.key) {
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
  })

  setInterval(updateView.bind(null, player, npcs), 33.333);

}

const getCanvasRenderingContext2D = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const context = canvas.getContext('2d');
  if(!context){
    alert("cannot get context");
    throw new Error("cannot get context");
  }
  return context;
}

const keyDownEvent = (event: KeyboardEvent, player: Player) => {
    switch(event.key) {
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
}

const moveNPC = (npc: Player) => {
  const rand = getRandomInt(0, 4);
  switch(rand) {
    case 0:
      npc.moveDown();
      break;
    case 1:
      npc.moveLeft();
      break;
    case 2:
      npc.moveRight();
      break;
    case 3:
      npc.moveUp();
      break;
  }
}

const updateView = (player: Player, npcs: Player[]): void => {
  frameCounter++;

  const canvas = <HTMLCanvasElement>document.getElementById("main");
  const context = getCanvasRenderingContext2D(canvas);

  if(frameCounter % 15 === 0){
    npcs.map((value) => {
      moveNPC(value);
    });
  }

  dispBackground(context);
  dispField(context);
  dispPlayer(context, player, color.blue);
  npcs.map((value) => {
    dispPlayer(context, value, color.red);
  });

  context.fillStyle = color.black;
  context.fillText(`frame: ${frameCounter}`, 0, (FIELD_SIZE.y + 1) * NODE_SIZE.height);
  context.fillText(pressString, 0, (FIELD_SIZE.y + 2) * NODE_SIZE.height);
}

const dispBackground = (context: CanvasRenderingContext2D) => {
  context.fillStyle = color.white;
  context.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
}

const dispField = (context: CanvasRenderingContext2D): void => {
  field.map((value, index) => {
    const pos = getPosFromIndex(index);
    context.fillStyle = FIELDS[value].color;
    context.fillRect(NODE_SIZE.width * pos.x, NODE_SIZE.height * pos.y, NODE_SIZE.width, NODE_SIZE.height);
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
