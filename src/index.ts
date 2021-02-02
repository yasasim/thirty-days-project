const font = {
  message: 20
};

const main = () => {
  console.log("Hello, World!");
  const canvas = <HTMLCanvasElement>document.getElementById("main");
  if(!canvas.getContext){
    alert("canvas is not found");
    throw new Error("canvas is not found");
  }
  const context = canvas.getContext("2d");
  if(!context){
    alert("cannot get context");
    throw new Error("cannot get context");
  }
  context.font = font.message.toString() + "px sans-serif";
  console.log(context.font);
  context.fillText("Hello, World!", 0, 24);
}

window.onload = main;