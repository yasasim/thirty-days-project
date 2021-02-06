interface Position {
  x: number,
  y: number
}

const font = {
  message: 20
};

const color = {
  red: 'rgb(255,00,00)',
  green: 'rgb(00,255,00)',
  blue: 'rgb(00,00,255)',
  white: 'rgb(255,255,255)',
  black: 'rgb(00,00,00)'
}

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
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
]


class Player {
  pos: Position;

  constructor (startPos: Position) {
    this.pos = startPos;
  }

  moveRight = () => {
    this.pos.x++;
  }

  moveLeft = () => {
    this.pos.x--;
  }

  moveUp = () => {
    this.pos.y--;
  }

  moveDown = () => {
    this.pos.y++;
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

const keyDownEvent = (event: KeyboardEvent, player: Player) => {
    switch(event.key) {
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
}

const updateView = (player: Player): void => {
  frameCounter++;

  const canvas = <HTMLCanvasElement>document.getElementById("main");
  const context = getCanvasRenderingContext2D(canvas);
  dispBackground(context);
  dispField(context);
  dispPlayer(context, player);
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
    context.fillStyle = value === 0 ? color.green : color.black;
    context.fillRect(NODE_SIZE.width * pos.x, NODE_SIZE.height * pos.y, NODE_SIZE.width, NODE_SIZE.height);
  })
}

const dispPlayer = (context:CanvasRenderingContext2D, player: Player): void => {
  context.fillStyle = color.blue;
  context.fillRect(NODE_SIZE.width * player.pos.x, NODE_SIZE.height * player.pos.y, NODE_SIZE.width * 0.8, NODE_SIZE.height * 0.8);
}

const getPosFromIndex = (index: number): Position => {
  const pos = {
    y: Math.floor(index / FIELD_SIZE.x),
    x: index % FIELD_SIZE.x
  }

  return pos
}

const getIndexFromPos = (pos: Position): number => {
  return pos.y * FIELD_SIZE.x + pos.x;
}

window.onload = main;
