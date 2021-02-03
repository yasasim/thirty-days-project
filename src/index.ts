interface Position {
  row: number,
  column: number
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
  height: 640,
  width: 960
}

const NODE_SIZE = {
  width: 20,
  height: 20
}

const FIELD_SIZE = {
  row: CANVAS_SIZE.height / NODE_SIZE.height,
  column: CANVAS_SIZE.width / NODE_SIZE.width
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

  const context = canvas.getContext("2d");
  if(!context){
    alert("cannot get context");
    throw new Error("cannot get context");
  }

  context.font = font.message.toString() + "px sans-serif";

  const field = makeField();
  dispField(context, field);
}

const makeField = (): number[] => {
  const field: number[] = [];

  for(let row = 0; row < FIELD_SIZE.row; row++){
    for(let column = 0; column < FIELD_SIZE.column; column++){
      field.push(((row % 2) + column) % 2);
    }
  }

  return field;
}

const dispField = (context: CanvasRenderingContext2D, field: number[]) => {
  field.map((value, index) => {
    const pos = getPosFromIndex(index);
    context.fillStyle = value === 0 ? color.green : color.black;
    context.fillRect(NODE_SIZE.width * pos.column, NODE_SIZE.height * pos.row, NODE_SIZE.width, NODE_SIZE.height);
  })
}

const getPosFromIndex = (index: number): Position => {
  const pos = {
    row: Math.floor(index / FIELD_SIZE.column),
    column: index % FIELD_SIZE.column
  }

  return pos
}

window.onload = main;